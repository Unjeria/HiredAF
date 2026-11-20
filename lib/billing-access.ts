import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireActiveSubscription(organizationId: string, returnTo: string) {
  const supabase = await createClient();
  const { data: subscription } = await supabase
    .from("billing_subscriptions")
    .select("status")
    .eq("organization_id", organizationId)
    .maybeSingle();
  if (!subscription || !["active", "trialing"].includes(subscription.status)) {
    redirect(`/billing?message=${encodeURIComponent("Choose a plan to use your recruiting workspace.")}&returnTo=${encodeURIComponent(returnTo)}`);
  }
}
