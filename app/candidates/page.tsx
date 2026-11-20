import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createCandidate } from "./actions";
import CandidateDirectory from "./candidate-directory";
import { signOut } from "@/app/auth/actions";

type Props = { searchParams: Promise<{ error?: string; success?: string }> };
const field = "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#86B52F]";

export default async function CandidatesPage({ searchParams }: Props) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  if (!auth?.claims) redirect("/login");
  const { data: membership } = await supabase.from("organization_members").select("organization_id,role").order("created_at", { ascending: true }).limit(1).maybeSingle();
  if (!membership) redirect("/dashboard");
  const { data: candidates } = await supabase.from("candidates").select("id,full_name,email,phone,location,source,summary,created_at").eq("organization_id", membership.organization_id).order("created_at", { ascending: false });
  const canEdit = ["owner", "admin", "recruiter"].includes(membership.role);

  return (
    <main className="min-h-screen bg-[#F7F7F2] text-[#20221C]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 bg-white px-5 py-4 sm:px-9">
        <Link href="/dashboard" className="text-2xl font-black tracking-[-.07em]">hired<span className="text-[#86B52F]">AF</span></Link>
        <nav className="flex flex-wrap gap-4 text-sm font-semibold"><Link href="/dashboard">Overview</Link><Link href="/jobs">Jobs</Link><Link className="text-[#719B2D]" href="/candidates">Candidates</Link><Link href="/pipeline">Pipeline</Link></nav>
        <form action={signOut}><button className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold">Sign out</button></form>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-9">
        <p className="text-xs font-bold tracking-[.2em] text-[#85877D]">HIRING WORKSPACE / PEOPLE</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div><h1 className="text-4xl font-black tracking-[-.06em] sm:text-5xl">Candidate directory</h1><p className="mt-2 text-[#77796F]">A single place for every person in your talent pool.</p></div>
          <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold">{candidates?.length ?? 0} candidates</span>
        </div>
        {params.error && <p role="alert" className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-700">{params.error}</p>}
        {params.success && <p role="status" className="mt-6 rounded-xl bg-[#F0F8E2] p-3 text-sm text-[#46651E]">{params.success}</p>}
        <div className="mt-8 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <section className="h-fit rounded-3xl border border-black/10 bg-white p-6 sm:p-7">
            <h2 className="text-xl font-extrabold">Add a candidate</h2><p className="mt-1 text-sm text-[#77796F]">Save a new person to your talent pool.</p>
            {canEdit ? <form action={createCandidate} className="mt-6 grid gap-3">
              <label className="text-sm font-semibold" htmlFor="candidate-name">Full name *</label><input id="candidate-name" name="fullName" required className={field} placeholder="Jordan Taylor" />
              <label className="mt-2 text-sm font-semibold" htmlFor="candidate-email">Email</label><input id="candidate-email" name="email" type="email" className={field} placeholder="jordan@email.com" />
              <label className="mt-2 text-sm font-semibold" htmlFor="candidate-phone">Phone</label><input id="candidate-phone" name="phone" type="tel" className={field} placeholder="(555) 555-5555" />
              <label className="mt-2 text-sm font-semibold" htmlFor="candidate-location">Location</label><input id="candidate-location" name="location" className={field} placeholder="City, State or Remote" />
              <label className="mt-2 text-sm font-semibold" htmlFor="candidate-source">Source</label><select id="candidate-source" name="source" className={field}><option value="">Choose source</option><option>LinkedIn</option><option>Referral</option><option>Company website</option><option>Job board</option><option>Direct outreach</option><option>Other</option></select>
              <label className="mt-2 text-sm font-semibold" htmlFor="candidate-summary">Notes / profile summary</label><textarea id="candidate-summary" name="summary" rows={4} className={field} placeholder="Experience, skills, conversation notes..." />
              <button className="mt-3 rounded-full bg-[#20221C] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#383B30]">Add candidate</button>
            </form> : <p className="mt-5 text-sm text-[#77796F]">Your workspace role is read-only for candidate records.</p>}
          </section>
          <CandidateDirectory candidates={candidates ?? []} />
        </div>
      </div>
    </main>
  );
}
