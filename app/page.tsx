import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Check, Clock3, FileText, Search,
  Users, Workflow, Zap, ShieldCheck, ChevronDown,
} from "lucide-react";

function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`inline-flex items-center gap-2 text-[22px] font-black tracking-[-.08em] ${light ? "text-white" : "text-[#171916]"}`}>
    <span className="grid h-8 w-8 place-items-center rounded-md bg-[#FF6848] text-[15px] text-white">H</span>
    hired<span className="text-[#FF6848]">AF</span>
  </Link>;
}

const steps = [
  { n: "01", title: "Get the role clear.", body: "Put the job, requirements, and hiring priorities in one place before the first application lands.", icon: FileText },
  { n: "02", title: "Keep good people in view.", body: "Bring candidate profiles and notes together so promising people don't disappear in inboxes.", icon: Users },
  { n: "03", title: "Know the next move.", body: "See where every application stands and keep the process moving with your team.", icon: Workflow },
];

const questions = [
  ["Who is HiredAF built for?", "Small and growing businesses that need a practical way to organize recruiting without taking on an enterprise-sized system."],
  ["What can I do in HiredAF today?", "The early workspace is being built around jobs, candidate profiles, applications, and a hiring pipeline. You can create a workspace and explore the core recruiting flow."],
  ["Does HiredAF make hiring decisions?", "No. The goal is to help teams organize information and reduce repetitive work. People remain responsible for assessing candidates and making employment decisions."],
  ["Is the product fully launched?", "HiredAF is in its early build stage. The current experience is evolving, and we're opening the door for early users to explore it."],
];

function HiringBoard() {
  return <div className="relative mx-auto w-full max-w-[590px]">
    <div className="absolute -right-8 -top-8 h-52 w-52 rounded-full bg-[#FF6848]/20 blur-[75px]" />
    <div className="relative rotate-[1deg] border-[5px] border-[#171916] bg-[#F8F7F2] p-3 shadow-[16px_18px_0_#FF6848] sm:p-5">
      <div className="flex items-center justify-between border-b border-[#DCDAD1] pb-3">
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#FF6848]"/><span className="text-[10px] font-black tracking-[.12em]">HIREDAF / YOUR TEAM</span></div>
        <span className="text-[9px] font-bold text-[#898A82]">WORKSPACE PREVIEW</span>
      </div>
      <div className="grid grid-cols-[82px_1fr] gap-3 pt-4 sm:grid-cols-[112px_1fr] sm:gap-5">
        <aside className="space-y-2 bg-[#171916] p-2.5 text-white sm:p-3">
          <p className="mb-4 text-[8px] font-bold tracking-[.15em] text-white/35">YOUR SPACE</p>
          {["Overview","Open roles","Candidates","Pipeline"].map((x,i)=><div key={x} className={`px-2 py-2 text-[8px] font-bold sm:text-[9px] ${i===2?"bg-[#FF6848] text-white":"text-white/55"}`}>{x}</div>)}
          <div className="mt-8 border-t border-white/15 pt-3 text-[8px] leading-4 text-white/40">Keep the whole hiring picture in one place.</div>
        </aside>
        <div className="min-w-0">
          <p className="text-[8px] font-extrabold tracking-[.16em] text-[#85867E]">CANDIDATE PIPELINE</p>
          <div className="mt-1 flex items-end justify-between gap-2"><h3 className="text-[22px] font-black leading-none tracking-[-.07em] sm:text-[29px]">People, not paperwork.</h3><span className="bg-[#E8E9E1] px-2 py-1 text-[7px] font-bold">SAMPLE</span></div>
          <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
            {[["06","Open roles"],["18","Candidates"],["04","Interviews"]].map(([n,l])=><div key={l} className="border border-[#DCDAD1] bg-white p-2"><p className="text-[18px] font-black tracking-[-.06em] sm:text-[22px]">{n}</p><p className="mt-1 text-[7px] font-bold text-[#85867E] sm:text-[8px]">{l}</p></div>)}
          </div>
          <div className="mt-3 border border-[#DCDAD1] bg-white p-2.5 sm:p-3">
            <div className="flex items-center justify-between"><span className="text-[9px] font-black">Recently updated</span><span className="text-[7px] text-[#85867E]">VIEW ALL ↗</span></div>
            {[[ "AM","Avery Morgan","Operations Lead","Interview"],["JC","Jamie Chen","Customer Success","Review"],["RP","Riley Parker","Sales Associate","New"]].map(([initials,name,role,status])=><div key={name} className="flex items-center gap-2 border-t border-[#EEEDE8] py-2.5 first:mt-2"><span className="grid h-7 w-7 shrink-0 place-items-center bg-[#FCE3DC] text-[8px] font-black">{initials}</span><div className="min-w-0 flex-1"><p className="truncate text-[8px] font-extrabold sm:text-[9px]">{name}</p><p className="truncate text-[7px] text-[#85867E] sm:text-[8px]">{role}</p></div><span className="bg-[#F1F0E9] px-1.5 py-1 text-[7px] font-bold">{status}</span></div>)}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 bg-[#E9E9E1] p-2.5"><Zap size={13} className="shrink-0 text-[#E85B3E]"/><p className="text-[8px] font-bold text-[#4F514A]">One clear view of what needs your attention next.</p></div>
    </div>
    <p className="mt-7 text-center text-[9px] font-medium text-[#777970]">Illustrative interface · Sample candidate data</p>
  </div>;
}

export default function Home() {
  return <main className="overflow-hidden bg-[#F7F5EF] text-[#171916]">
    <header className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-14">
      <Logo/>
      <nav className="hidden items-center gap-8 text-[11px] font-bold text-[#62645D] md:flex">
        <a href="#how" className="transition hover:text-[#FF6848]">How it works</a>
        <a href="#product" className="transition hover:text-[#FF6848]">The workspace</a>
        <a href="#faq" className="transition hover:text-[#FF6848]">FAQs</a>
        <Link href="/pricing" className="transition hover:text-[#FF6848]">Pricing</Link>
      </nav>
      <div className="flex items-center gap-4"><Link href="/login" className="hidden text-[11px] font-bold sm:block">Log in</Link><Link href="/pricing" className="hidden text-[11px] font-bold sm:block">Pricing</Link><Link href="/login" className="inline-flex items-center gap-2 bg-[#171916] px-4 py-3 text-[10px] font-extrabold text-white transition hover:bg-[#FF6848]">Explore HiredAF <ArrowUpRight size={13}/></Link></div>
    </header>

    <section className="relative border-y border-[#E4E1D8]">
      <div className="absolute inset-0 opacity-[.22]" style={{backgroundImage:"linear-gradient(#B9B5AA 1px, transparent 1px),linear-gradient(90deg,#B9B5AA 1px,transparent 1px)",backgroundSize:"44px 44px"}}/>
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-16 sm:py-20 lg:grid-cols-[1.02fr_.98fr] lg:px-14 lg:py-24">
        <div>
          <p className="mb-7 inline-flex items-center gap-2 border border-[#D7D3C8] bg-[#F7F5EF]/90 px-3 py-2 text-[9px] font-black tracking-[.17em]"><span className="h-2 w-2 bg-[#FF6848]"/> RECRUITING FOR THE REAL WORLD</p>
          <h1 className="max-w-[760px] text-[clamp(3.5rem,7.6vw,7.2rem)] font-black leading-[.86] tracking-[-.095em]">Your next hire <span className="font-serif font-medium italic tracking-[-.08em] text-[#FF6848]">shouldn’t</span> take over your week.</h1>
          <p className="mt-8 max-w-[490px] text-[15px] leading-7 text-[#65675F] sm:text-[16px]">Hiring is already a big job. HiredAF gives growing teams one place to manage roles, keep track of candidates, and move every application forward—without the spreadsheet scavenger hunt.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="inline-flex items-center justify-center gap-3 bg-[#FF6848] px-6 py-4 text-[11px] font-black text-white transition hover:-translate-y-0.5 hover:bg-[#E95739]">Get into the workspace <ArrowRight size={15}/></Link>
            <a href="#how" className="inline-flex items-center justify-center border border-[#BEBBB1] px-6 py-4 text-[11px] font-black transition hover:bg-white">See what changes <ArrowUpRight size={14}/></a>
          </div>
          <div className="mt-9 flex max-w-[470px] items-start gap-3 border-t border-[#D9D6CC] pt-5"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#E85B3E]"/><p className="text-[10px] leading-5 text-[#777970]"><strong className="text-[#171916]">Built to support better decisions.</strong> HiredAF helps organize the process. Your people make the hiring calls.</p></div>
        </div>
        <HiringBoard/>
      </div>
      <div className="relative border-t border-[#E4E1D8] bg-[#FF6848]"><div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-4 text-[9px] font-black tracking-[.12em] text-white lg:px-14"><span>LESS CHASING.</span><span>LESS GUESSWORK.</span><span>FEWER DROPPED BALLS.</span><span>MORE TIME FOR PEOPLE.</span></div></div>
    </section>

    <section id="how" className="mx-auto max-w-[1400px] px-6 py-24 lg:px-14 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
        <div><p className="mb-5 text-[9px] font-black tracking-[.2em] text-[#E85B3E]">THE PROBLEM ISN’T YOU</p><h2 className="max-w-[520px] text-5xl font-black leading-[.91] tracking-[-.085em] sm:text-6xl">Hiring gets messy when the work is everywhere.</h2><p className="mt-7 max-w-[420px] text-[13px] leading-7 text-[#6D6F67]">A resume in email. Interview notes in a document. A status update in somebody’s head. When the details are scattered, good candidates and good time get lost.</p><div className="mt-8 inline-flex items-center gap-2 text-[10px] font-black"><span className="h-2 w-2 bg-[#FF6848]"/> ONE SHARED PLACE TO KEEP IT MOVING</div></div>
        <div className="space-y-0 border-t border-[#D9D6CC]">{steps.map((s)=>{const Icon=s.icon;return <article key={s.n} className="grid grid-cols-[42px_1fr_auto] items-start gap-4 border-b border-[#D9D6CC] py-7 sm:grid-cols-[58px_1fr_auto] sm:gap-6"><span className="pt-1 text-[10px] font-black text-[#FF6848]">{s.n}</span><div><h3 className="text-[23px] font-black tracking-[-.06em] sm:text-[28px]">{s.title}</h3><p className="mt-2 max-w-[470px] text-[11px] leading-6 text-[#74766E]">{s.body}</p></div><Icon size={20} strokeWidth={1.7} className="mt-1 text-[#A1A196]"/></article>})}</div>
      </div>
    </section>

    <section id="product" className="bg-[#171916] text-white">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-20 lg:grid-cols-[.9fr_1.1fr] lg:px-14 lg:py-28">
        <div><p className="mb-5 text-[9px] font-black tracking-[.2em] text-[#FF8064]">MEET YOUR NEW HIRING HQ</p><h2 className="max-w-[540px] text-5xl font-black leading-[.92] tracking-[-.085em] sm:text-6xl">Know where every role—and every person—stands.</h2><p className="mt-7 max-w-[440px] text-[13px] leading-7 text-white/60">HiredAF brings the moving parts of recruiting into a shared workspace, so your team can spend less time tracking down information and more time moving forward.</p><ul className="mt-8 space-y-4">{["Manage open jobs and role details","Keep candidate profiles and notes together","Track applications through a clear pipeline","Give teammates access based on their role"].map(x=><li key={x} className="flex items-center gap-3 text-[11px] font-bold"><span className="grid h-5 w-5 place-items-center bg-[#FF6848]"><Check size={12}/></span>{x}</li>)}</ul><Link href="/login" className="mt-9 inline-flex items-center gap-3 bg-white px-6 py-4 text-[11px] font-black text-[#171916] transition hover:bg-[#FF6848] hover:text-white">Explore the workspace <ArrowRight size={15}/></Link></div>
        <div className="border border-white/15 bg-[#22251F] p-3 sm:p-5"><div className="flex items-center justify-between border-b border-white/10 pb-3"><span className="text-[9px] font-black tracking-[.15em]">THE RECRUITING WORKFLOW</span><span className="text-[8px] text-white/40">BUILT FOR LEAN TEAMS</span></div><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{[["01","Jobs"],["02","Candidates"],["03","Applications"],["04","Pipeline"]].map(([n,t])=><div key={n} className="min-h-[120px] border border-white/10 p-3 sm:min-h-[145px] sm:p-4"><span className="text-[9px] font-black text-[#FF8064]">{n}</span><p className="mt-10 text-[14px] font-black tracking-[-.04em] sm:mt-14 sm:text-[16px]">{t}</p><div className="mt-2 h-1 w-8 bg-[#FF6848]"/></div>)}</div><div className="mt-3 flex items-center gap-3 bg-[#FF6848] p-4 text-white"><Clock3 size={17}/><p className="text-[10px] font-bold leading-5">Keep the next step visible. Keep your team on the same page.</p></div></div>
      </div>
    </section>

    <section className="mx-auto grid max-w-[1400px] gap-10 px-6 py-24 lg:grid-cols-2 lg:px-14 lg:py-28">
      <div><p className="mb-5 text-[9px] font-black tracking-[.2em] text-[#E85B3E]">MADE FOR THE PEOPLE DOING THE WORK</p><h2 className="max-w-[540px] text-5xl font-black leading-[.92] tracking-[-.085em] sm:text-6xl">Big-company hiring structure. Without the big-company baggage.</h2></div>
      <div className="space-y-6 text-[13px] leading-7 text-[#686A62]"><p>If you’re a founder, owner, operations lead, or recruiter at a growing company, hiring is probably one of ten things you’re responsible for. You don’t need another complicated system to babysit.</p><p>HiredAF is being built to make the process easier to see, easier to share, and easier to keep moving. AI-assisted capabilities are part of the roadmap, with human judgment at the center of every hiring decision.</p><div className="border-l-[3px] border-[#FF6848] pl-5 text-[18px] font-black leading-snug tracking-[-.04em] text-[#171916]">You run the business. Let your hiring process get organized.</div></div>
    </section>

    <section className="bg-[#E9E6DC]">
      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-6 py-16 lg:grid-cols-[1fr_auto] lg:px-14 lg:py-20"><div><p className="mb-4 text-[9px] font-black tracking-[.2em] text-[#E85B3E]">READY TO GET OUT OF THE SPREADSHEET?</p><h2 className="max-w-[760px] text-4xl font-black leading-[.94] tracking-[-.08em] sm:text-6xl">Make hiring feel like part of the plan—not the whole plan.</h2><p className="mt-5 max-w-[520px] text-[12px] leading-6 text-[#6D6F67]">Explore the HiredAF workspace and see what a more organized hiring process can look like.</p></div><Link href="/login" className="inline-flex items-center justify-center gap-3 bg-[#FF6848] px-7 py-5 text-[11px] font-black text-white transition hover:bg-[#171916]">Get started with HiredAF <ArrowUpRight size={15}/></Link></div>
    </section>

    <section id="faq" className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 lg:grid-cols-[.7fr_1.3fr] lg:px-14"><div><p className="mb-5 text-[9px] font-black tracking-[.2em] text-[#E85B3E]">BEFORE YOU JUMP IN</p><h2 className="text-5xl font-black leading-[.92] tracking-[-.085em]">Fair questions.</h2></div><div className="border-t border-[#D9D6CC]">{questions.map(([q,a])=><details key={q} className="group border-b border-[#D9D6CC] py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[13px] font-black"><span>{q}</span><ChevronDown size={16} className="shrink-0 transition group-open:rotate-180"/></summary><p className="max-w-[650px] pt-4 text-[11px] leading-6 text-[#6D6F67]">{a}</p></details>)}</div></section>

    <footer className="bg-[#171916] text-white"><div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-14"><div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-8 sm:flex-row sm:items-center"><div><Logo light/><p className="mt-3 text-[10px] text-white/45">A clearer way to get great people on your team.</p></div><div className="flex flex-wrap gap-6 text-[10px] font-bold text-white/65"><a href="#how">How it works</a><a href="#product">The workspace</a><a href="#faq">FAQs</a><Link href="/login">Log in</Link><Link href="/pricing">Pricing</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div><div className="flex flex-col justify-between gap-2 pt-5 text-[9px] text-white/35 sm:flex-row"><span>© {new Date().getFullYear()} HiredAF. All rights reserved.</span><span>Hiring, without the chaos.</span></div></div></footer>
  </main>;
}
