import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  CircleCheck,
  Command,
  FileSearch,
  Fingerprint,
  Layers3,
  Menu,
  MessageSquareText,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const capabilities = [
  {
    number: "01",
    icon: FileSearch,
    title: "Find the signal.",
    description: "Bring your candidate pipeline into one clear workspace. Spend less time digging through tabs and more time finding people worth talking to.",
    tag: "SMART SOURCING",
  },
  {
    number: "02",
    icon: Bot,
    title: "Let busywork go.",
    description: "AI-powered workflows help organize applicants, surface relevant experience, and take repetitive recruiting tasks off your plate.",
    tag: "AI WORKFLOWS",
  },
  {
    number: "03",
    icon: Users,
    title: "Make better matches.",
    description: "See the story behind every candidate with structured profiles, role fit signals, and a more consistent review process.",
    tag: "BETTER MATCHING",
  },
];

const steps = [
  ["01", "Tell us who you need", "Create a role with the skills, experience, and qualities that matter to your team."],
  ["02", "Build your shortlist", "Bring candidates together and let intelligent tools help you prioritize the strongest matches."],
  ["03", "Move great people forward", "Keep your process organized from first review through the next conversation."],
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#" className={`inline-flex items-center gap-2.5 font-black tracking-[-0.075em] text-[23px] ${light ? "text-white" : "text-ink"}`} aria-label="HiredAF home">
      <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-lime text-ink">
        <span className="text-[17px] font-black tracking-[-.1em]">H.</span>
      </span>
      hired<span className="text-[#9BCB42]">AF</span>
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold tracking-[.2em] text-[#6D7065]"><span className="h-1.5 w-1.5 rounded-full bg-[#9BCB42]" />{children}</div>;
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <header className="relative z-20 mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 lg:px-12">
        <Logo />
        <nav className="hidden items-center gap-9 text-[13px] font-semibold text-[#5F6159] md:flex">
          <a className="transition hover:text-black" href="#how-it-works">How it works</a>
          <a className="transition hover:text-black" href="#platform">Platform</a>
          <a className="transition hover:text-black" href="#why-hiredaf">Why HiredAF</a>
        </nav>
        <a href="/login" className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[12px] font-bold text-white transition hover:bg-[#303229]">
          Get early access <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </header>

      <section className="relative">
        <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-[760px]" />
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 px-6 pb-24 pt-14 lg:grid-cols-[1.02fr_.98fr] lg:px-12 lg:pb-32 lg:pt-24">
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3.5 py-2 text-[10px] font-bold tracking-[.14em] text-[#65675E] shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9BCB42] opacity-50" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#9BCB42]" /></span>
              A SMARTER WAY TO BUILD YOUR TEAM
            </div>
            <h1 className="max-w-[700px] text-[clamp(3.6rem,7.2vw,6.6rem)] font-black leading-[.91] tracking-[-.085em]">
              Hiring shouldn’t feel like a <span className="relative inline-block">full-time job.<span className="absolute -bottom-1 left-0 -z-10 h-[19%] w-full -rotate-1 bg-lime" /></span>
            </h1>
            <p className="mt-8 max-w-[510px] text-[17px] leading-8 text-[#66685F]">
              Meet the recruiting workspace that puts AI to work, cuts the busywork, and helps you find people who move your business forward.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/login" className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-[13px] font-bold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#303229]">
                Get early access <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
              <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white/60 px-7 py-4 text-[13px] font-bold transition hover:bg-white">
                See how it works <ArrowDownRight size={15} />
              </a>
            </div>
            <div className="mt-12 flex items-center gap-4 border-t border-black/10 pt-6">
              <div className="flex -space-x-2">
                {["#D9A68C", "#B7C7A0", "#C4B5D5", "#E0C47E"].map((color, i) => <span key={i} className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#F7F7F2] text-[9px] font-black text-ink" style={{ backgroundColor: color }}>{["J", "M", "A", "T"][i]}</span>)}
              </div>
              <p className="text-[11px] leading-5 text-[#77796F]"><span className="font-bold text-ink">Built for teams on the move.</span><br />A better hiring process starts here.</p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[590px] lg:mt-2">
            <div className="absolute -right-8 top-8 h-44 w-44 rounded-full bg-lime/60 blur-[70px]" />
            <div className="absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-[#DDE4C9] blur-[65px]" />
            <div className="relative rounded-[28px] border border-black/10 bg-white p-3 shadow-[0_35px_100px_rgba(30,35,20,.13)] sm:p-5">
              <div className="flex items-center justify-between border-b border-black/[.07] px-2 pb-4">
                <div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-lime"><Command size={14} /></span><span className="text-[12px] font-bold tracking-tight">hiredAF <span className="font-normal text-[#A0A197]">/ workspace</span></span></div>
                <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-[#E9E9E3]" /><span className="h-2 w-2 rounded-full bg-[#E9E9E3]" /><span className="h-2 w-2 rounded-full bg-[#E9E9E3]" /></div>
              </div>
              <div className="px-2 pt-5">
                <div className="flex items-start justify-between">
                  <div><p className="text-[10px] font-bold tracking-[.15em] text-[#999B91]">YOUR HIRING HQ</p><h3 className="mt-1 text-[25px] font-black tracking-[-.06em]">Good morning, Alex<span className="text-[#A3CE52]">.</span></h3><p className="mt-1 text-[11px] text-[#898B81]">Here’s what’s happening with your team.</p></div>
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-[#F0F1E9] text-[11px] font-black">AC</div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2.5">
                  {[["24", "Candidates"], ["08", "Shortlisted"], ["03", "Open roles"]].map(([n, label]) => <div key={label} className="rounded-xl bg-[#F6F7F2] p-3"><p className="text-[22px] font-black tracking-[-.06em]">{n}</p><p className="mt-1 text-[9px] font-semibold text-[#85877D]">{label}</p></div>)}
                </div>
                <div className="mt-5 rounded-2xl border border-black/[.07] p-4">
                  <div className="flex items-center justify-between"><div><p className="text-[11px] font-bold">AI match insights</p><p className="mt-0.5 text-[9px] text-[#96988E]">Top matches for Product Designer</p></div><span className="rounded-full bg-[#EFF6DF] px-2.5 py-1 text-[8px] font-bold text-[#638C27]">PRODUCT PREVIEW</span></div>
                  <div className="mt-4 space-y-3">
                    {[
                      ["JD", "Jordan Davis", "Product Designer · 5 yrs", "96%"],
                      ["SK", "Sam Kim", "UX / Product · 4 yrs", "91%"],
                      ["MR", "Morgan Reed", "Product Designer · 6 yrs", "88%"],
                    ].map(([initials, name, role, score], i) => <div key={name} className="flex items-center gap-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[9px] font-black ${i === 0 ? "bg-[#E6EDDA]" : i === 1 ? "bg-[#F1E9DF]" : "bg-[#E9E5F0]"}`}>{initials}</span><div className="min-w-0 flex-1"><p className="text-[10px] font-bold">{name}</p><p className="mt-0.5 truncate text-[9px] text-[#999B91]">{role}</p></div><div className="text-right"><p className="text-[11px] font-black">{score}</p><p className="text-[8px] text-[#999B91]">match</p></div></div>)}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-ink p-3.5 text-white"><span className="grid h-8 w-8 place-items-center rounded-lg bg-lime text-ink"><Sparkles size={15} /></span><div className="flex-1"><p className="text-[10px] font-bold">Your AI recruiting assistant</p><p className="mt-0.5 text-[9px] text-white/55">Ready when you are.</p></div><ArrowUpRight size={15} className="text-lime" /></div>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-black/[.07] px-2 pt-3 text-[8px] font-semibold tracking-wide text-[#A0A197]"><span>HIRING, IN ONE PLACE.</span><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#A3CE52]" /> ALL SYSTEMS READY</span></div>
            </div>
            <div className="absolute -left-7 top-[38%] hidden items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2.5 shadow-soft sm:flex"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#EFF6DF] text-[#719B34]"><Zap size={14} /></span><span className="text-[9px] font-bold">Less busywork.<br /><span className="font-normal text-[#8C8E84]">More momentum.</span></span></div>
            <div className="absolute -right-5 bottom-[14%] hidden items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2.5 shadow-soft sm:flex"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#F0EDF6] text-[#8272A5]"><Fingerprint size={14} /></span><span className="text-[9px] font-bold">People first.<br /><span className="font-normal text-[#8C8E84]">Always.</span></span></div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#EFF0E8]">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-5 px-6 py-7 text-center md:flex-row md:px-12 md:text-left">
          <p className="text-[10px] font-bold tracking-[.18em] text-[#898B80]">MADE FOR THE PEOPLE BUILDING WHAT’S NEXT</p>
          <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 text-[12px] font-black tracking-[-.04em] text-[#77796F]"><span>STARTUPS</span><span>SMALL BUSINESS</span><span>GROWING TEAMS</span><span>BIG IDEAS</span></div>
        </div>
      </section>

      <section id="platform" className="mx-auto max-w-[1320px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><SectionLabel>THE HIREDAF DIFFERENCE</SectionLabel><h2 className="max-w-[460px] text-5xl font-black leading-[.98] tracking-[-.075em] sm:text-6xl">Less admin.<br />More <span className="text-[#8DBA3E]">awesome</span><br />people.</h2><p className="mt-7 max-w-[390px] text-[14px] leading-7 text-[#73756B]">Recruiting has too many moving parts. HiredAF brings the important ones together, so your team can focus on the human side of hiring.</p><a href="#how-it-works" className="mt-8 inline-flex items-center gap-2 text-[12px] font-bold underline decoration-[#A6CF5C] decoration-2 underline-offset-4">Explore the process <ArrowUpRight size={14} /></a></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((item, i) => { const Icon = item.icon; return <div key={item.number} className={`group rounded-[22px] border border-black/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-soft ${i === 2 ? "sm:col-span-2 sm:flex sm:items-center sm:gap-10" : ""}`}><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#F0F2E9] text-ink transition group-hover:bg-lime"><Icon size={19} /></span><span className="text-[10px] font-bold tracking-[.15em] text-[#B0B1A9]">{item.number}</span></div><div className={i === 2 ? "mt-6 sm:mt-0 sm:flex-1" : "mt-7"}><p className="text-[9px] font-bold tracking-[.16em] text-[#91B94B]">{item.tag}</p><h3 className="mt-2 text-[24px] font-black tracking-[-.06em]">{item.title}</h3><p className="mt-3 max-w-[410px] text-[12px] leading-6 text-[#77796F]">{item.description}</p></div></div>; })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-ink py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><SectionLabel>STRAIGHTFORWARD BY DESIGN</SectionLabel><h2 className="max-w-[440px] text-5xl font-black leading-[.98] tracking-[-.075em] sm:text-6xl">From open role to <span className="text-lime">great hire.</span></h2><p className="mt-6 max-w-[360px] text-[13px] leading-7 text-white/55">A calmer, clearer way to move candidates through your hiring process.</p></div><div className="grid gap-3 sm:grid-cols-3">{steps.map(([num, title, desc]) => <div key={num} className="rounded-[20px] border border-white/10 bg-white/[.04] p-6"><span className="text-[11px] font-bold text-lime">{num} / 03</span><h3 className="mt-12 text-[19px] font-black tracking-[-.05em]">{title}</h3><p className="mt-3 text-[11px] leading-6 text-white/50">{desc}</p><div className="mt-8 h-px w-full bg-white/10"><div className="h-px w-1/3 bg-lime" /></div></div>)}</div></div>
          <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[24px] bg-lime p-8 text-ink sm:flex-row sm:items-center sm:p-10"><div><p className="text-[9px] font-black tracking-[.2em]">YOUR NEXT GREAT HIRE STARTS HERE</p><h3 className="mt-3 text-3xl font-black tracking-[-.07em] sm:text-4xl">Ready to make hiring feel different?</h3></div><a href="mailto:hello@hiredaf.com?subject=I%20want%20early%20access%20to%20HiredAF" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-ink px-6 py-4 text-[12px] font-bold text-white transition hover:bg-[#303229]">Let’s talk <ArrowUpRight size={15} /></a></div>
        </div>
      </section>

      <section id="why-hiredaf" className="mx-auto max-w-[1320px] px-6 py-24 lg:px-12 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[26px] bg-[#E9EDE0] p-8 sm:p-12"><div className="dot-pattern absolute inset-0 opacity-40" /><div className="relative"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-lime"><Layers3 size={24} /></div><p className="mt-16 text-[10px] font-bold tracking-[.18em] text-[#7A806D]">A DIFFERENT KIND OF RECRUITING TOOL</p><p className="mt-3 max-w-[400px] text-4xl font-black leading-[1.02] tracking-[-.07em]">Technology should make room for <span className="underline decoration-[#A4CB59] decoration-[5px] underline-offset-4">people.</span></p><div className="mt-10 flex items-center gap-2 text-[10px] font-bold text-[#73786A]"><CircleCheck size={14} className="text-[#86AD3F]" /> Human decisions stay human.</div></div></div>
          <div><SectionLabel>OUR POINT OF VIEW</SectionLabel><h2 className="text-5xl font-black leading-[.98] tracking-[-.075em] sm:text-6xl">Built for the work behind the work.</h2><p className="mt-7 max-w-[480px] text-[14px] leading-7 text-[#73756B]">Great teams don’t happen by accident. They happen when people have the time and tools to make thoughtful decisions. HiredAF is being built to give that time back.</p><div className="mt-8 space-y-4">{["Less repetitive work for hiring teams", "A more organized candidate experience", "Clearer, more consistent hiring decisions"].map(t => <div key={t} className="flex items-center gap-3 text-[12px] font-bold"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#EAF2DA] text-[#779D39]"><Check size={13} /></span>{t}</div>)}</div></div>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-[#EFF0E8]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-6 py-9 sm:flex-row sm:items-center sm:justify-between lg:px-12"><div><Logo /><p className="mt-3 text-[10px] text-[#85877D]">Hiring, without the headache.</p></div><div className="flex flex-wrap items-center gap-6 text-[10px] font-semibold text-[#73756B]"><a href="#platform" className="hover:text-black">Platform</a><a href="#how-it-works" className="hover:text-black">How it works</a><a href="mailto:hello@hiredaf.com" className="hover:text-black">Contact</a></div><p className="text-[10px] text-[#999B91]">© {new Date().getFullYear()} HiredAF. Built for what’s next.</p></div>
      </footer>
    </main>
  );
}
