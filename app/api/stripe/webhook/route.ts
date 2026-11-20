import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

async function recordRiskEvent(eventId: string, type: string, customerId: string | null) {
  const admin = createAdminClient();
  let organizationId: string | null = null;
  if (customerId) {
    const { data } = await admin.from("billing_subscriptions").select("organization_id").eq("stripe_customer_id", customerId).maybeSingle();
    organizationId = data?.organization_id ?? null;
  }
  await admin.from("billing_risk_events").upsert({
    stripe_event_id: eventId,
    organization_id: organizationId,
    event_type: type,
  }, { onConflict: "stripe_event_id" });
  if (organizationId) {
    await admin.from("billing_subscriptions").update({
      risk_status: "review",
      risk_note: type,
      updated_at: new Date().toISOString(),
    }).eq("organization_id", organizationId);
  }
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const admin = createAdminClient();
  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  const { data: existing } = await admin.from("billing_subscriptions").select("organization_id,plan_key").eq("stripe_customer_id", customerId).maybeSingle();
  const organizationId = subscription.metadata.organization_id || existing?.organization_id;
  const priceId = subscription.items.data[0]?.price.id;
  const priceToPlan: Record<string, string> = {
    [process.env.STRIPE_PRICE_LAUNCH ?? ""]: "launch",
    [process.env.STRIPE_PRICE_GROWTH ?? ""]: "growth",
    [process.env.STRIPE_PRICE_SCALE ?? ""]: "scale",
  };
  const planKey = priceToPlan[priceId ?? ""] || subscription.metadata.plan_key || existing?.plan_key;
  if (!organizationId || !["launch", "growth", "scale"].includes(planKey ?? "")) {
    console.error("Stripe subscription could not be mapped to a HiredAF workspace.", subscription.id);
    return;
  }
  const item = subscription.items.data[0];
  const periodEnd = item?.current_period_end ?? subscription.cancel_at ?? null;
  const { error } = await admin.from("billing_subscriptions").upsert({
    organization_id: organizationId,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscription.id,
    stripe_price_id: item?.price.id ?? null,
    plan_key: planKey,
    status: subscription.status,
    current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    cancel_at_period_end: subscription.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  }, { onConflict: "organization_id" });
  if (error) throw error;
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) return NextResponse.json({ error: "Webhook is not configured." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, secret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error: claimError } = await admin.from("billing_webhook_events").insert({
    event_id: event.id,
    event_type: event.type,
  });
  if (claimError) {
    if (claimError.code === "23505") return NextResponse.json({ received: true, duplicate: true });
    return NextResponse.json({ error: "Unable to record webhook event." }, { status: 500 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === "paid" || session.mode === "subscription") {
          if (typeof session.subscription === "string") {
            const subscription = await getStripe().subscriptions.retrieve(session.subscription);
            await syncSubscription(subscription);
          }
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
      case "customer.subscription.paused":
      case "customer.subscription.resumed":
        await syncSubscription(event.data.object as Stripe.Subscription);
        break;
      case "invoice.paid":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
        if (customerId) {
          const { data: current } = await admin.from("billing_subscriptions").select("stripe_subscription_id").eq("stripe_customer_id", customerId).maybeSingle();
          if (current?.stripe_subscription_id) {
            const subscription = await getStripe().subscriptions.retrieve(current.stripe_subscription_id);
            await syncSubscription(subscription);
          }
        }
        break;
      }
      case "charge.dispute.created":
      case "charge.refunded":
      case "radar.early_fraud_warning.created": {
        const object = event.data.object as Stripe.Charge | Stripe.Dispute | Stripe.Radar.EarlyFraudWarning;
        let customerId: string | null = null;
        if ("customer" in object) customerId = typeof object.customer === "string" ? object.customer : object.customer?.id ?? null;
        if (!customerId && "charge" in object && typeof object.charge === "string") {
          const charge = await getStripe().charges.retrieve(object.charge);
          customerId = typeof charge.customer === "string" ? charge.customer : charge.customer?.id ?? null;
        }
        await recordRiskEvent(event.id, event.type, customerId);
        break;
      }
      default:
        break;
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    await admin.from("billing_webhook_events").delete().eq("event_id", event.id);
    console.error("HiredAF Stripe webhook processing failed.", error);
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
