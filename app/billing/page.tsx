import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { openBillingPortal } from "@/app/pricing/actions";

export default async function BillingPage({ searchParams }: { searchParams: Promise<{ message?: string; error?: string }> }) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login");
  const { data: membership } = await supabase.from("organization_members").select("organization_id,role").order("created_at", { ascending: true }).limit(1).maybeSingle();
  if (!membership) redirect("/dashboard");
  const { data: subscription } = await supabase.from("billing_subscriptions").select("plan_key,status,current_period_end,cancel_at_period_end,risk_status").eq("organization_id", membership.organization_id).maybeSingle();
  return <main className="min-h-screen bg-[#F4F2EC] px-5 py-10 text-[#171916]"><div className="mx-auto max-w-3xl"><Link href="/dashboard" className="text-[10px] font-black">← WORKSPACE</Link><p className="mt-12 text-[9px] font-black tracking-[.2em] text-[#E85B3E]">ACCOUNT / BILLING</p><h1 className="mt-3 text-5xl font-black tracking-[-.08em]">Your subscription.</h1>
    {(params.message || params.error) && <p className="mt-6 bg-white p-4 text-sm">{params.message || params.error}</p>}
    <section className="mt-8 border border-black/10 bg-white p-7">{subscription ? <><p className="text-[10px] font-black tracking-wider text-[#777970]">CURRENT PLAN</p><h2 className="mt-2 text-3xl font-black capitalize">{subscription.plan_key}</h2><p className="mt-2 text-sm text-[#777970]">Status: <strong className="capitalize text-[#171916]">{subscription.status.replaceAll("_", " ")}</strong></p>{subscription.current_period_end && <p className="mt-2 text-xs text-[#777970]">Current period ends {new Date(subscription.current_period_end).toLocaleDateString()}.</p>}{subscription.cancel_at_period_end && <p className="mt-2 text-xs text-[#E85B3E]">Your subscription is scheduled to cancel at the end of this period.</p>}{subscription.risk_status === "review" && <p className="mt-3 text-xs text-[#A34A22]">A billing event needs review. Please contact support.</p>}</> : <><h2 className="text-2xl font-black">No active plan yet.</h2><p className="mt-2 text-sm text-[#777970]">Choose a plan to activate billing for this workspace.</p><Link href="/pricing" className="mt-5 inline-flex bg-[#FF6848] px-5 py-3 text-[10px] font-black text-white">VIEW PLANS ↗</Link></>}
    {subscription && ["owner","admin"].includes(membership.role) && <form action={openBillingPortal} className="mt-7"><button className="bg-[#171916] px-5 py-4 text-[10px] font-black text-white">MANAGE SUBSCRIPTION & PAYMENT METHOD ↗</button></form>}
    </section></div></main>;
}
