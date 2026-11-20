import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type CapacityResource = "openJobs" | "candidates";
const limits: Record<string, Record<CapacityResource, number>> = {
  launch: { openJobs: 3, candidates: 100 },
  growth: { openJobs: 15, candidates: 1000 },
  scale: { openJobs: Number.POSITIVE_INFINITY, candidates: Number.POSITIVE_INFINITY },
};

export async function requireActiveSubscription(organizationId: string, returnTo: string) {
  const supabase = await createClient();
  const { data: subscription } = await supabase
    .from("billing_subscriptions")
    .select("status,plan_key")
    .eq("organization_id", organizationId)
    .maybeSingle();
  if (!subscription || !["active", "trialing"].includes(subscription.status)) {
    redirect(`/billing?message=${encodeURIComponent("Choose a plan to use your recruiting workspace.")}&returnTo=${encodeURIComponent(returnTo)}`);
  }
  return { supabase, planKey: subscription.plan_key };
}

export async function requirePlanCapacity(organizationId: string, resource: CapacityResource, returnTo: string, excludeId?: string) {
  const { supabase, planKey } = await requireActiveSubscription(organizationId, returnTo);
  const limit = limits[planKey]?.[resource];
  if (limit === undefined) redirect("/billing?message=Your%20plan%20could%20not%20be%20verified");
  if (!Number.isFinite(limit)) return;
  const query = resource === "openJobs"
    ? supabase.from("jobs").select("id", { count: "exact", head: true }).eq("organization_id", organizationId).eq("status", "open").neq("id", excludeId ?? "00000000-0000-0000-0000-000000000000")
    : supabase.from("candidates").select("id", { count: "exact", head: true }).eq("organization_id", organizationId);
  const { count, error } = await query;
  if (error) redirect("/billing?error=Unable%20to%20verify%20your%20plan%20usage");
  if ((count ?? 0) >= limit) {
    const label = resource === "openJobs" ? "open job limit" : "candidate limit";
    redirect(`/billing?message=${encodeURIComponent(`You have reached your plan's ${label}. Upgrade to add more.`)}`);
  }
}
