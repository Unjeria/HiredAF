import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createWorkspace } from "./actions";
import WorkspaceShell from "@/components/workspace-shell";
import { ArrowRight, BriefcaseBusiness, Users, Workflow, Plus, ArrowUpRight } from "lucide-react";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function DashboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const claims = claimsData?.claims;
  if (!claims) redirect("/login");

  const [{ data: profile }, { data: memberships }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", claims.sub).maybeSingle(),
    supabase.from("organization_members").select("organization_id, role, organizations(id, name)").order("created_at", { ascending: true }),
  ]);
  const membership = memberships?.[0];
  const organization = membership?.organizations as unknown as { id: string; name: string } | null;
  const [jobsResult, candidatesResult, applicationsResult] = organization ? await Promise.all([
    supabase.from("jobs").select("id,title,status,location,created_at").eq("organization_id", organization.id).order("created_at", { ascending: false }).limit(6),
    supabase.from("candidates").select("id", { count: "exact", head: true }).eq("organization_id", organization.id),
    supabase.from("applications").select("id,status", { count: "exact" }).eq("organization_id", organization.id),
  ]) : [{ data: [] as {id:string;title:string;status:string;location:string|null;created_at:string}[] }, { count: 0 }, { data: [] as {id:string;status:string}[], count: 0 }];
  const firstName = profile?.full_name?.split(" ")[0] || (typeof claims.email === "string" ? claims.email.split("@")[0] : "there");
  const jobs = jobsResult.data ?? [];
  const openJobs = jobs.filter(j => j.status === "open").length;
  const recentApplications = applicationsResult.data ?? [];
  const cards = [
    { label: "Open roles", value: String(openJobs), note: "Currently accepting applicants", icon: BriefcaseBusiness, href: "/jobs" },
    { label: "Candidates", value: String(candidatesResult.count ?? 0), note: "People in your talent pool", icon: Users, href: "/candidates" },
    { label: "Applications", value: String(applicationsResult.count ?? 0), note: "Across your hiring pipeline", icon: Workflow, href: "/pipeline" },
  ];
  return <WorkspaceShell active="dashboard" workspaceName={organization?.name} role={membership?.role}>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-[9px] font-black tracking-[.2em] text-[#E85B3E]">YOUR HIRING HQ / OVERVIEW</p><h1 className="mt-3 text-4xl font-black leading-none tracking-[-.075em] sm:text-5xl">Let's get to work, {firstName}.</h1><p className="mt-3 text-sm text-[#777970]">Here’s what’s happening across your hiring process.</p></div>
      {organization && <Link href="/jobs" className="inline-flex items-center gap-2 bg-[#FF6848] px-5 py-3.5 text-[10px] font-black text-white transition hover:bg-[#E95739]">CREATE A ROLE <Plus size={14}/></Link>}
    </div>
    {params.error && <p role="alert" className="mt-6 border border-red-200 bg-red-50 p-3 text-sm text-red-700">{params.error}</p>}
    {!organization ? <section className="mt-10 max-w-2xl border border-black/10 bg-white p-7 sm:p-10"><span className="text-[10px] font-black tracking-[.18em] text-[#E85B3E]">FIRST THINGS FIRST</span><h2 className="mt-4 text-3xl font-black tracking-[-.06em]">Give your hiring team a home.</h2><p className="mt-3 max-w-lg text-sm leading-6 text-[#777970]">Create a workspace for your company. This is where your open roles, candidates, and hiring activity will live.</p><form action={createWorkspace} className="mt-7 grid max-w-md gap-3"><label htmlFor="workspace-name" className="text-[11px] font-black">COMPANY OR WORKSPACE NAME</label><input id="workspace-name" name="name" required minLength={2} maxLength={120} placeholder="Your company name" className="border border-black/15 bg-[#F9F8F4] px-4 py-3 text-sm outline-none focus:border-[#FF6848]"/><button className="mt-2 inline-flex items-center justify-center gap-2 bg-[#171916] px-5 py-4 text-[10px] font-black text-white hover:bg-[#FF6848]">CREATE MY WORKSPACE <ArrowRight size={14}/></button></form></section> : <>
      <section className="mt-9 grid gap-3 sm:grid-cols-3">{cards.map(card=>{const Icon=card.icon;return <Link href={card.href} key={card.label} className="group border border-black/10 bg-white p-5 transition hover:-translate-y-1 hover:border-[#FF6848]"><div className="flex items-center justify-between"><span className="text-[10px] font-black tracking-[.12em] text-[#777970]">{card.label.toUpperCase()}</span><Icon size={17} className="text-[#E85B3E]"/></div><p className="mt-5 text-5xl font-black tracking-[-.08em]">{card.value}</p><div className="mt-3 flex items-center justify-between"><span className="text-[10px] text-[#85877D]">{card.note}</span><ArrowUpRight size={14} className="transition group-hover:-translate-y-1 group-hover:translate-x-1"/></div></Link>})}</section>
      <section className="mt-8 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <div className="border border-black/10 bg-white p-5 sm:p-7"><div className="flex items-end justify-between gap-3"><div><p className="text-[9px] font-black tracking-[.18em] text-[#E85B3E]">THE WORK IN MOTION</p><h2 className="mt-2 text-2xl font-black tracking-[-.06em]">Recent job openings</h2></div><Link href="/jobs" className="text-[10px] font-black underline underline-offset-4">ALL JOBS ↗</Link></div>
        {jobs.length ? <div className="mt-5 divide-y divide-black/10">{jobs.map(job=><div key={job.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="text-sm font-extrabold">{job.title}</p><p className="mt-1 text-[10px] text-[#85877D]">{job.location || "Location not set"} · Added {new Date(job.created_at).toLocaleDateString()}</p></div><span className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider ${job.status==="open"?"bg-[#E8F0E2] text-[#476D34]":"bg-[#F0EEE8] text-[#777970]"}`}>{job.status}</span></div>)}</div> : <div className="mt-6 border border-dashed border-black/15 bg-[#F9F8F4] p-7"><BriefcaseBusiness size={22} className="text-[#E85B3E]"/><h3 className="mt-3 font-black">Your first role starts here.</h3><p className="mt-1 max-w-md text-xs leading-5 text-[#777970]">Add an opening to give your hiring process a starting point. You can add candidates and track applications next.</p><Link href="/jobs" className="mt-4 inline-flex items-center gap-2 text-[10px] font-black text-[#E85B3E]">CREATE YOUR FIRST ROLE <ArrowRight size={13}/></Link></div>}</div>
        <div className="bg-[#171916] p-6 text-white"><p className="text-[9px] font-black tracking-[.18em] text-[#FF8064]">KEEP IT MOVING</p><h2 className="mt-3 text-2xl font-black leading-[1.02] tracking-[-.06em]">A clear next step beats a crowded inbox.</h2><p className="mt-3 text-xs leading-6 text-white/55">Build your workflow one step at a time. Start with a role, add people, then keep every application up to date.</p><div className="mt-7 space-y-2">{[{label:"Create a job",href:"/jobs",icon:BriefcaseBusiness},{label:"Add a candidate",href:"/candidates",icon:Users},{label:"Review pipeline",href:"/pipeline",icon:Workflow}].map(item=>{const Icon=item.icon;return <Link href={item.href} key={item.label} className="flex items-center justify-between border border-white/15 px-3 py-3 text-[10px] font-bold transition hover:border-[#FF6848] hover:bg-white/5"><span className="flex items-center gap-2"><Icon size={14} className="text-[#FF8064]"/>{item.label}</span><ArrowUpRight size={13}/></Link>})}</div></div>
      </section>
      <p className="mt-8 text-[9px] leading-5 text-[#99998F]">HiredAF helps organize recruiting information. Hiring decisions remain with your team.</p>
    </>}
  </WorkspaceShell>;
}
