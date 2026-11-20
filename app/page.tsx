import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bot, BriefcaseBusiness, Check,
  CircleHelp, ClipboardList, FileSearch, Layers3, MessageSquareText,
  ShieldCheck, Sparkles, Users, Workflow, Zap,
} from "lucide-react";

const benefits = [
  { n: "01", icon: BriefcaseBusiness, title: "Bring every role into focus.", copy: "Create and manage open positions in one place. Keep the role, requirements, and hiring activity connected." },
  { n: "02", icon: Users, title: "Build a talent pool that stays useful.", copy: "Keep candidate profiles, contact details, experience notes, and sources organized for your whole team." },
  { n: "03", icon: Workflow, title: "Know what happens next.", copy: "Move applicants through clear hiring stages, from first review to interview, offer, and hire." },
];

const workflow = [
  ["01", "Set up the role", "Define the position, what matters, and the kind of person your team needs."],
  ["02", "Bring people together", "Add applicants and prospects to a shared candidate workspace. Keep the context with the person."],
  ["03", "Move the process forward", "Track every application and next step without losing people in spreadsheets and inboxes."],
];

const faqs = [
  ["Who is HiredAF for?", "HiredAF is being built for small and growing businesses that need a more organized way to manage recruiting without a complicated enterprise system."],
  ["Is HiredAF an applicant tracking system?", "Yes. The core workspace brings together jobs, candidate profiles, applications, and hiring stages so teams can manage their recruiting process in one place."],
  ["Does HiredAF use AI?", "AI-assisted recruiting is part of the product direction. The goal is to reduce repetitive work and help teams organize information. People remain responsible for evaluating candidates and making hiring decisions."],
  ["Can my team work together?", "HiredAF supports company workspaces with role-based access so owners, admins, recruiters, and read-only teammates can work with the same hiring information."],
  ["Is HiredAF available now?", "The product is in its early build stage. You can explore the workspace as we prepare the first release."],
];

function Logo({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/" className={`inline-flex items-center gap-2.5 text-[23px] font-black tracking-[-.075em] ${inverse ? "text-white" : "text-[#20221C]"}`}>
    <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#C6F36B] text-[17px] font-black tracking-[-.1em] text-[#20221C]">H.</span>
    hired<span className="text-[#9BCB42]">AF</span>
  </Link>;
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`mb-5 inline-flex items-center gap-2 text-[10px] font-extrabold tracking-[.2em] ${light ? "text-white/55" : "text-[#77796F]"}`}><span className="h-1.5 w-1.5 rounded-full bg-[#A7D64F]" />{children}</p>;
}

function ProductWindow() {
  return <div className="relative mx-auto w-full max-w-[620px]">
    <div className="absolute -right-10 top-12 h-48 w-48 rounded-full bg-[#C6F36B]/70 blur-[80px]" />
    <div className="absolute -bottom-10 -left-8 h-48 w-48 rounded-full bg-[#DDE5CB] blur-[70px]" />
    <div className="relative rounded-[26px] border border-black/10 bg-white p-3 shadow-[0_35px_100px_rgba(30,35,20,.15)] sm:p-5">
      <div className="flex items-center justify-between border-b border-black/[.07] px-2 pb-4">
        <div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#20221C] text-[#C6F36B]"><Layers3 size={14}/></span><span className="text-[12px] font-bold">hiredAF <span className="font-normal text-[#A0A197]">/ workspace</span></span></div>
        <div className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-[#E9E9E3]"/><i className="h-2 w-2 rounded-full bg-[#E9E9E3]"/><i className="h-2 w-2 rounded-full bg-[#E9E9E3]"/></div>
      </div>
      <div className="grid grid-cols-[104px_1fr] gap-3 pt-4">
        <aside className="space-y-2 rounded-xl bg-[#20221C] p-3 text-white">
          <p className="mb-4 text-[8px] font-bold tracking-[.16em] text-white/35">WORKSPACE</p>
          {["Overview","Jobs","Candidates","Pipeline"].map((x,i)=><div key={x} className={`rounded-lg px-2 py-2 text-[9px] font-semibold ${i===0?"bg-[#414638] text-[#C6F36B]":"text-white/60"}`}>{x}</div>)}
        </aside>
        <div className="min-w-0">
          <p className="text-[9px] font-bold tracking-[.15em] text-[#999B91]">YOUR HIRING HQ</p>
          <h3 className="mt-1 text-[22px] font-black tracking-[-.06em]">A clearer view of hiring<span className="text-[#9BCB42]">.</span></h3>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[["08","Open roles"],["24","Candidates"],["12","In review"]].map(([n,l])=><div key={l} className="rounded-xl bg-[#F6F7F2] p-2.5"><p className="text-[20px] font-black tracking-[-.06em]">{n}</p><p className="mt-1 text-[8px] font-semibold text-[#85877D]">{l}</p></div>)}
          </div>
          <div className="mt-3 rounded-xl border border-black/[.07] p-3">
            <div className="flex items-center justify-between"><p className="text-[10px] font-bold">Recent candidates</p><span className="text-[8px] text-[#999B91]">SAMPLE DATA</span></div>
            {[[ "JT","Jordan Taylor","Product Designer","Interview"],["MB","Morgan Brooks","Software Engineer","Reviewing"],["AR","Alex Rivera","Growth Marketing","New"]].map(([initials,name,role,stage],i)=><div key={name} className="mt-3 flex items-center gap-2"><span className={`grid h-7 w-7 place-items-center rounded-full text-[8px] font-black ${i===0?"bg-[#E6EDDA]":i===1?"bg-[#F1E9DF]":"bg-[#E9E5F0]"}`}>{initials}</span><div className="min-w-0 flex-1"><p className="truncate text-[9px] font-bold">{name}</p><p className="truncate text-[8px] text-[#999B91]">{role}</p></div><span className="rounded-full bg-[#F0F3E9] px-2 py-1 text-[7px] font-bold text-[#6E8D3B]">{stage}</span></div>)}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#20221C] p-3.5 text-white"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#C6F36B] text-[#20221C]"><Sparkles size={15}/></span><div className="flex-1"><p className="text-[10px] font-bold">A smarter recruiting workflow</p><p className="mt-0.5 text-[8px] text-white/50">Less admin. More room for people.</p></div><ArrowUpRight size={15} className="text-[#C6F36B]"/></div>
      <p className="px-1 pt-3 text-center text-[8px] text-[#A0A197]">Illustrative product preview · Sample data</p>
    </div>
  </div>;
}

export default function Home() {
  return <main className="overflow-hidden bg-[#F8F8F4] text-[#20221C]">
    <header className="relative z-20 mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 lg:px-12">
      <Logo/>
      <nav className="hidden items-center gap-8 text-[12px] font-semibold text-[#66685F] md:flex">
        <a href="#platform" className="hover:text-black">Platform</a><a href="#how-it-works" className="hover:text-black">How it works</a><a href="#why-hiredaf" className="hover:text-black">Why HiredAF</a><a href="#faq" className="hover:text-black">FAQs</a>
      </nav>
      <div className="flex items-center gap-3"><Link href="/login" className="hidden text-[12px] font-bold sm:block">Log in</Link><Link href="/login" className="group inline-flex items-center gap-2 rounded-full bg-[#20221C] px-5 py-3 text-[11px] font-bold text-white transition hover:bg-[#373A30]">Get started <ArrowUpRight size={14}/></Link></div>
    </header>

    <section className="relative">
      <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-[800px]"/>
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 px-6 pb-24 pt-12 lg:grid-cols-[1fr_1fr] lg:px-12 lg:pb-32 lg:pt-20">
        <div className="relative z-10">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-2 text-[9px] font-bold tracking-[.15em] text-[#65675E] shadow-sm"><span className="h-2 w-2 rounded-full bg-[#A7D64F]"/> RECRUITING, REIMAGINED FOR GROWING TEAMS</div>
          <h1 className="max-w-[700px] text-[clamp(3.6rem,7.3vw,6.7rem)] font-black leading-[.9] tracking-[-.09em]">Good people.<br/>Great teams.<br/><span className="relative inline-block">Less hiring chaos.<i className="absolute -bottom-1 left-0 -z-10 h-[18%] w-full -rotate-1 bg-[#C6F36B]"/></span></h1>
          <p className="mt-8 max-w-[500px] text-[16px] leading-8 text-[#686A61]">The recruiting workspace built to help growing businesses organize candidates, manage open roles, and move great people through the hiring process — without the spreadsheet circus.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/login" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#20221C] px-7 py-4 text-[12px] font-bold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#373A30]">Explore HiredAF <ArrowRight size={15} className="transition group-hover:translate-x-1"/></Link><a href="#how-it-works" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white/70 px-7 py-4 text-[12px] font-bold hover:bg-white">See how it works <ArrowDown size={14}/></a></div>
          <div className="mt-12 flex items-center gap-3 border-t border-black/10 pt-6"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#EAF1DD] text-[#6F9634]"><ShieldCheck size={17}/></span><p className="text-[10px] leading-5 text-[#77796F]"><strong className="text-[#20221C]">People-first by design.</strong><br/>AI can assist the process. Your team makes the decisions.</p></div>
        </div>
        <ProductWindow/>
      </div>
    </section>

    <section className="border-y border-black/10 bg-[#EFF0E8]"><div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-5 px-6 py-7 text-center md:flex-row md:px-12 md:text-left"><p className="text-[9px] font-extrabold tracking-[.18em] text-[#898B80]">HIRING SHOULD MOVE YOUR BUSINESS FORWARD</p><div className="flex flex-wrap justify-center gap-x-9 gap-y-3 text-[11px] font-black tracking-[-.03em] text-[#77796F]"><span>SMALL BUSINESSES</span><span>STARTUPS</span><span>GROWING TEAMS</span><span>RECRUITERS</span></div></div></section>

    <section id="platform" className="mx-auto max-w-[1320px] px-6 py-24 lg:px-12 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr]">
        <div><Eyebrow>THE HIREDAF WORKSPACE</Eyebrow><h2 className="max-w-[480px] text-5xl font-black leading-[.96] tracking-[-.08em] sm:text-6xl">Everything hiring needs. <span className="text-[#8DBA3E]">Nothing it doesn’t.</span></h2><p className="mt-7 max-w-[400px] text-[13px] leading-7 text-[#73756B]">Stop juggling job posts, scattered resumes, and status updates across five different places. Keep your recruiting work connected from day one.</p><Link href="/login" className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold underline decoration-[#A6CF5C] decoration-2 underline-offset-4">Take a look inside <ArrowUpRight size={14}/></Link></div>
        <div className="grid gap-3 sm:grid-cols-2">{benefits.map((item,i)=>{const Icon=item.icon;return <article key={item.n} className={`group rounded-[22px] border border-black/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(20,25,10,.07)] ${i===2?"sm:col-span-2 sm:flex sm:items-center sm:gap-10":""}`}><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#F0F2E9] transition group-hover:bg-[#C6F36B]"><Icon size={19}/></span><span className="text-[10px] font-bold tracking-[.15em] text-[#B0B1A9]">{item.n}</span></div><div className={i===2?"mt-6 sm:mt-0 sm:flex-1":"mt-7"}><h3 className="text-[22px] font-black tracking-[-.06em]">{item.title}</h3><p className="mt-3 max-w-[420px] text-[11px] leading-6 text-[#77796F]">{item.copy}</p></div></article>})}</div>
      </div>
    </section>

    <section id="how-it-works" className="bg-[#20221C] py-24 text-white lg:py-32"><div className="mx-auto max-w-[1320px] px-6 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><Eyebrow light>THE PROCESS</Eyebrow><h2 className="max-w-[450px] text-5xl font-black leading-[.96] tracking-[-.08em] sm:text-6xl">A better way to <span className="text-[#C6F36B]">get to yes.</span></h2><p className="mt-6 max-w-[360px] text-[12px] leading-7 text-white/55">From the first job requirement to the final decision, keep the whole process moving with less friction.</p></div><div className="grid gap-3 sm:grid-cols-3">{workflow.map(([n,title,copy])=><article key={n} className="rounded-[20px] border border-white/10 bg-white/[.04] p-6"><span className="text-[10px] font-bold text-[#C6F36B]">{n} / 03</span><h3 className="mt-12 text-[18px] font-black tracking-[-.05em]">{title}</h3><p className="mt-3 text-[10px] leading-6 text-white/50">{copy}</p><div className="mt-8 h-px w-full bg-white/10"><div className="h-px w-1/3 bg-[#C6F36B]"/></div></article>)}</div></div>
      <div className="mt-20 grid gap-8 rounded-[24px] bg-[#C6F36B] p-8 text-[#20221C] sm:grid-cols-[1fr_auto] sm:items-center sm:p-10"><div><p className="text-[9px] font-black tracking-[.2em]">YOUR NEXT GREAT HIRE STARTS HERE</p><h3 className="mt-3 max-w-[650px] text-3xl font-black tracking-[-.07em] sm:text-4xl">Make space for the people who move your business forward.</h3></div><Link href="/login" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#20221C] px-6 py-4 text-[11px] font-bold text-white transition hover:bg-[#373A30]">Get started <ArrowUpRight size={15}/></Link></div>
    </div></section>

    <section id="why-hiredaf" className="mx-auto max-w-[1320px] px-6 py-24 lg:px-12 lg:py-32"><div className="grid items-center gap-14 lg:grid-cols-2">
      <div className="relative overflow-hidden rounded-[26px] bg-[#E9EDE0] p-8 sm:p-12"><div className="dot-pattern absolute inset-0 opacity-40"/><div className="relative"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#20221C] text-[#C6F36B]"><Sparkles size={24}/></div><p className="mt-16 text-[9px] font-extrabold tracking-[.18em] text-[#7A806D]">A HUMAN-CENTERED APPROACH</p><p className="mt-3 max-w-[420px] text-4xl font-black leading-[1.02] tracking-[-.07em]">Technology should make room for <span className="underline decoration-[#A4CB59] decoration-[5px] underline-offset-4">people.</span></p><div className="mt-10 flex items-center gap-2 text-[10px] font-bold text-[#73786A]"><ShieldCheck size={14} className="text-[#86AD3F]"/> Human decisions stay human.</div></div></div>
      <div><Eyebrow>WHY WE’RE BUILDING THIS</Eyebrow><h2 className="text-5xl font-black leading-[.96] tracking-[-.08em] sm:text-6xl">Hiring is about people. Your tools should remember that.</h2><p className="mt-7 max-w-[480px] text-[13px] leading-7 text-[#73756B]">Small teams deserve recruiting tools that feel clear, useful, and manageable. HiredAF is being built to give growing businesses a place to organize the details, keep momentum, and spend more time having meaningful conversations.</p><div className="mt-8 space-y-4">{["A shared view of every open role","Candidate context that doesn’t get lost","Clear next steps for every application","AI assistance designed to support—not replace—human judgment"].map(x=><div key={x} className="flex items-center gap-3 text-[11px] font-bold"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#EAF2DA] text-[#779D39]"><Check size={13}/></span>{x}</div>)}</div></div>
    </div></section>

    <section id="faq" className="border-y border-black/10 bg-[#EFF0E8]"><div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-24 lg:grid-cols-[.7fr_1.3fr] lg:px-12"><div><Eyebrow>GOOD QUESTIONS</Eyebrow><h2 className="text-5xl font-black leading-[.96] tracking-[-.08em]">A few things you might be wondering.</h2><p className="mt-6 text-[12px] leading-6 text-[#77796F]">Still curious? We’re building HiredAF with growing teams in mind.</p></div><div className="divide-y divide-black/10">{faqs.map(([q,a])=><details key={q} className="group py-5 first:pt-0"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[14px] font-extrabold tracking-[-.03em]">{q}<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/10 transition group-open:rotate-45"><span className="text-lg font-normal">+</span></span></summary><p className="max-w-[620px] pt-4 text-[12px] leading-7 text-[#707269]">{a}</p></details>)}</div></div></section>

    <footer className="bg-[#20221C] text-white"><div className="mx-auto max-w-[1320px] px-6 py-12 lg:px-12"><div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row md:items-end"><div><Logo inverse/><p className="mt-5 max-w-[360px] text-[12px] leading-6 text-white/50">Recruiting tools for teams with places to go.</p></div><div className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-semibold text-white/65"><a href="#platform" className="hover:text-[#C6F36B]">Platform</a><a href="#how-it-works" className="hover:text-[#C6F36B]">How it works</a><a href="#faq" className="hover:text-[#C6F36B]">FAQs</a><Link href="/login" className="hover:text-[#C6F36B]">Log in</Link></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-[9px] text-white/35 sm:flex-row"><span>© {new Date().getFullYear()} HiredAF. All rights reserved.</span><span>Built for what’s next.</span></div></div></footer>
  </main>;
}
