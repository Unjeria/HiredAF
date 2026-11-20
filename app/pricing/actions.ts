"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStripe, isPlanKey, planPrices } from "@/lib/stripe";

export async function startCheckout(formData: FormData) {
  const plan = String(formData.get("plan") ?? "");
  if (!isPlanKey(plan)) redirect("/pricing?error=Choose%20a%20valid%20plan");
  const price = planPrices[plan];
  if (!price) redirect("/pricing?error=Billing%20is%20not%20configured%20yet");

  const supabase = await createClient();
  const [{ data: auth }, { data: membership }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("organization_members").select("organization_id,role").order("created_at", { ascending: true }).limit(1).maybeSingle(),
  ]);
  if (!auth.user) redirect("/login?message=Sign%20in%20before%20choosing%20a%20plan");
  if (!membership || !["owner", "admin"].includes(membership.role)) redirect("/dashboard?error=An%20workspace%20owner%20must%20manage%20billing");

  const { data: existing } = await supabase.from("billing_subscriptions").select("stripe_customer_id,status").eq("organization_id", membership.organization_id).maybeSingle();
  if (existing && ["active", "trialing", "past_due"].includes(existing.status)) redirect("/billing?message=Your%20workspace%20already%20has%20a%20subscription");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) redirect("/pricing?error=The%20site%20URL%20is%20not%20configured");
  const stripe = getStripe();
  const metadata = { organization_id: membership.organization_id, plan_key: plan };
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    ...(existing?.stripe_customer_id ? { customer: existing.stripe_customer_id } : { customer_email: auth.user.email ?? undefined }),
    client_reference_id: membership.organization_id,
    metadata,
    subscription_data: { metadata },
    success_url: `${siteUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pricing?cancelled=1`,
    integration_identifier: "hiredaf_web_abcdefgh",
  });
  if (!session.url) redirect("/pricing?error=Unable%20to%20start%20checkout");
  redirect(session.url);
}

export async function openBillingPortal() {
  const supabase = await createClient();
  const [{ data: auth }, { data: membership }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("organization_members").select("organization_id,role").order("created_at", { ascending: true }).limit(1).maybeSingle(),
  ]);
  if (!auth.user) redirect("/login");
  if (!membership || !["owner", "admin"].includes(membership.role)) redirect("/dashboard?error=Only%20workspace%20owners%20and%20admins%20can%20manage%20billing");
  const { data: billing } = await supabase.from("billing_subscriptions").select("stripe_customer_id").eq("organization_id", membership.organization_id).maybeSingle();
  if (!billing?.stripe_customer_id) redirect("/pricing?message=No%20billing%20account%20found");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) redirect("/billing?error=Site%20URL%20is%20not%20configured");
  const session = await getStripe().billingPortal.sessions.create({
    customer: billing.stripe_customer_id,
    return_url: `${siteUrl}/billing`,
  });
  redirect(session.url);
}
