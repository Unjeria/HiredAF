import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createWorkspace } from "./actions";
import { signOut } from "@/app/auth/actions";

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
    supabase.from("jobs").select("id, title, status, location, created_at").eq("organization_id", organization.id).order("created_at", { ascending: false }).limit(6),
    supabase.from("candidates").select("id", { count: "exact", head: true }).eq("organization_id", organization.id),
    supabase.from("applications").select("id", { count: "exact", head: true }).eq("organization_id", organization.id),
  ]) : [{ data: [] as {id:string;title:string;status:string;location:string|null;created_at:string}[] }, { count: 0 }, { count: 0 }];

  const firstName = profile?.full_name?.split(" ")[0] || (typeof claims.email === "string" ? claims.email.split("@")[0] : "there");

  return (
    <main className="min-h-screen bg-[#F7F7F2] text-[#20221C]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 bg-white px-5 py-4 sm:px-9">
        <Link href="/" className="text-2xl font-black tracking-[-.07em]">hired<span className="text-[#86B52F]">AF</span></Link>
        <nav className="flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/dashboard" className="text-[#719B2D]">Overview</Link>
          <Link href="/jobs">Jobs</Link>
          <Link href="/candidates">Candidates</Link>
          <Link href="/pipeline">Pipeline</Link>
        </nav>
        <form action={signOut}><button className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold hover:bg-black/5">Sign out</button></form>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-9">
        <p className="text-xs font-bold tracking-[.2em] text-[#85877D]">HIRING HQ</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div><h1 className="text-4xl font-black tracking-[-.06em] sm:text-5xl">Good to see you, {firstName}.</h1><p className="mt-2 text-[#77796F]">Your hiring workspace starts here.</p></div>
          {organization && <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold">{organization.name}</span>}
        </div>
        {params.error && <p role="alert" className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-700">{params.error}</p>}
        {!organization ? (
          <section className="mt-10 max-w-xl rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#C6F36B] text-xl font-black">+</div>
            <h2 className="mt-5 text-2xl font-extrabold">Create your first workspace</h2>
            <p className="mt-2 leading-6 text-[#77796F]">A workspace keeps your company’s roles, candidates, and hiring team together.</p>
            <form action={createWorkspace} className="mt-6 grid gap-3">
              <label htmlFor="workspace-name" className="text-sm font-semibold">Company or workspace name</label>
              <input id="workspace-name" name="name" required minLength={2} maxLength={120} placeholder="Acme, Inc." className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-[#86B52F]"/>
              <button className="mt-2 rounded-full bg-[#20221C] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#383B30]">Create workspace</button>
            </form>
          </section>
        ) : (
          <>
            <section className="mt-9 grid gap-4 sm:grid-cols-3">
              {[["Open roles",String(jobsResult.data?.filter((j) => j.status === "open").length ?? 0)],["Candidates",String(candidatesResult.count ?? 0)],["Applications",String(applicationsResult.count ?? 0)]].map(([label,value]) => <div key={label} className="rounded-2xl border border-black/10 bg-white p-6"><p className="text-sm font-semibold text-[#77796F]">{label}</p><p className="mt-3 text-4xl font-black tracking-tight">{value}</p></div>)}
            </section>
            <section className="mt-9 rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3"><div><h2 className="text-xl font-extrabold">Recent roles</h2><p className="mt-1 text-sm text-[#77796F]">The latest jobs in your workspace.</p></div><span className="rounded-full bg-[#F0F8E2] px-3 py-1.5 text-xs font-bold text-[#557A24]">{membership?.role ?? "member"}</span></div>
              {jobsResult.data?.length ? <div className="mt-5 divide-y divide-black/10">{jobsResult.data.map((job) => <div key={job.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="font-bold">{job.title}</p><p className="mt-1 text-sm text-[#77796F]">{job.location || "Location not set"}</p></div><span className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold capitalize">{job.status}</span></div>)}</div> : <div className="mt-6 rounded-2xl bg-[#F7F7F2] p-6"><p className="font-semibold">Your first role is waiting.</p><p className="mt-1 text-sm text-[#77796F]">Create your first opening from the Jobs page, then add candidates to your pipeline.</p></div>}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
