import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { startCheckout } from "./actions";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const plans = [
  { key: "launch", name: "Launch", price: "$499", note: "For a growing team getting its hiring process organized.", features: ["Recruiting workspace", "Up to 3 open roles", "Up to 100 candidate profiles", "Job, applicant, and pipeline tracking"] },
  { key: "growth", name: "Growth", price: "$999", note: "For teams coordinating hiring across more people.", features: ["Everything in Launch", "Up to 15 open roles", "Up to 1,000 candidate profiles", "Job, applicant, and pipeline tracking"] },
  { key: "scale", name: "Scale", price: "$1,999", note: "For multi-team organizations with more complex hiring.", features: ["Everything in Growth", "Unlimited open roles", "Unlimited candidate profiles", "Department and job tracking"] },
];

export default async function PricingPage({ searchParams }: { searchParams: Promise<{ error?: string; message?: string; cancelled?: string }> }) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login?message=Create%20an%20account%20to%20choose%20a%20plan");
  const { data: membership } = await supabase.from("organization_members").select("organization_id,role").order("created_at", { ascending: true }).limit(1).maybeSingle();
  return <main className="min-h-screen bg-[#F4F2EC] px-5 py-8 text-[#171916] sm:px-9">
    <header className="mx-auto flex max-w-6xl items-center justify-between"><Link href="/" className="text-xl font-black tracking-[-.08em]">hired<span className="text-[#FF6848]">AF</span></Link><Link href="/dashboard" className="text-[10px] font-black">BACK TO WORKSPACE ↗</Link></header>
    <section className="mx-auto max-w-6xl py-14 sm:py-20">
      <p className="text-[9px] font-black tracking-[.2em] text-[#E85B3E]">SIMPLE MONTHLY PRICING</p>
      <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[.92] tracking-[-.08em] sm:text-7xl">A hiring workspace that grows with your team.</h1>
      <p className="mt-6 max-w-xl text-sm leading-7 text-[#777970]">Choose a plan for your organization. Monthly subscriptions. Prices are in USD and exclude applicable taxes.</p>
      {(params.error || params.message || params.cancelled) && <p className="mt-6 border border-black/10 bg-white p-4 text-sm">{params.error || params.message || (params.cancelled ? "Checkout was cancelled. No subscription was created." : "")}</p>}
      {!membership && <p className="mt-6 border border-[#FF6848]/40 bg-white p-4 text-sm">Create a company workspace in your dashboard before starting a subscription.</p>}
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {plans.map((plan, index) => <article key={plan.key} className={`flex flex-col border p-6 sm:p-8 ${index === 1 ? "border-[#FF6848] bg-[#171916] text-white" : "border-black/10 bg-white"}`}>
          <p className={`text-[9px] font-black tracking-[.18em] ${index === 1 ? "text-[#FF8064]" : "text-[#E85B3E]"}`}>{plan.name.toUpperCase()}</p>
          <div className="mt-5 flex items-end gap-1"><span className="text-5xl font-black tracking-[-.08em]">{plan.price}</span><span className={`pb-1 text-xs ${index === 1 ? "text-white/50" : "text-[#85877D]"}`}>/ month</span></div>
          <p className={`mt-4 min-h-12 text-xs leading-6 ${index === 1 ? "text-white/60" : "text-[#777970]"}`}>{plan.note}</p>
          <div className={`my-6 h-px ${index === 1 ? "bg-white/15" : "bg-black/10"}`}/>
          <ul className="flex-1 space-y-3">{plan.features.map(feature=><li key={feature} className="flex gap-2 text-[11px] leading-5"><Check size={14} className="mt-0.5 shrink-0 text-[#FF6848]"/>{feature}</li>)}</ul>
          <form action={startCheckout} className="mt-8"><input type="hidden" name="plan" value={plan.key}/><button disabled={!membership || !["owner","admin"].includes(membership.role)} className={`flex w-full items-center justify-center gap-2 px-4 py-4 text-[10px] font-black disabled:cursor-not-allowed disabled:opacity-40 ${index === 1 ? "bg-[#FF6848] text-white" : "bg-[#171916] text-white"}`}>CHOOSE {plan.name.toUpperCase()} <ArrowRight size={14}/></button></form>
        </article>)}
      </div>
      <p className="mt-8 max-w-3xl text-[10px] leading-6 text-[#85877D]">The current release includes workspace management, job openings, candidate profiles, and application pipeline tracking. Open-role and candidate limits are enforced by plan. AI-assisted screening, matching, job-description generation, and automated follow-ups are not included yet. Hiring decisions remain with your team.</p>
      <p className="mt-3 text-[10px] text-[#85877D]">Enterprise agreements are handled separately. Contact details will be provided before the Enterprise plan opens.</p>
    </section>
    <footer className="mx-auto max-w-6xl border-t border-black/10 py-5 text-[9px] text-[#85877D]">© {new Date().getFullYear()} HiredAF</footer>
  </main>;
}
