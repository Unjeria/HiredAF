import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { ArrowUpRight, BriefcaseBusiness, LayoutDashboard, Users, Workflow } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, key: "dashboard" },
  { href: "/jobs", label: "Jobs", icon: BriefcaseBusiness, key: "jobs" },
  { href: "/candidates", label: "People", icon: Users, key: "candidates" },
  { href: "/pipeline", label: "Pipeline", icon: Workflow, key: "pipeline" },
  { href: "/billing", label: "Billing", icon: Workflow, key: "billing" },
];

export default function WorkspaceShell({ children, active, workspaceName, role }: {
  children: React.ReactNode;
  active: string;
  workspaceName?: string | null;
  role?: string | null;
}) {
  return <main className="min-h-screen bg-[#F4F2EC] text-[#171916]">
    <header className="sticky top-0 z-30 border-b border-black/10 bg-[#F9F8F4]/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-4 sm:px-7 lg:px-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[23px] font-black tracking-[-.08em]"><span className="grid h-8 w-8 place-items-center rounded-md bg-[#FF6848] text-sm text-white">H</span>hired<span className="text-[#FF6848]">AF</span></Link>
        <div className="hidden min-w-0 items-center gap-2 sm:flex"><span className="h-2 w-2 rounded-full bg-[#FF6848]"/><span className="max-w-[260px] truncate text-xs font-bold">{workspaceName || "Your workspace"}</span>{role && <span className="border border-black/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#777970]">{role}</span>}</div>
        <form action={signOut}><button className="border border-black/15 px-3 py-2 text-[10px] font-black transition hover:border-[#FF6848] hover:text-[#E85B3E]">SIGN OUT ↗</button></form>
      </div>
    </header>
    <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="border-b border-black/10 bg-[#EEECE4] px-4 py-3 lg:min-h-[calc(100vh-68px)] lg:border-b-0 lg:border-r lg:px-5 lg:py-8">
        <p className="hidden px-3 pb-4 text-[9px] font-black tracking-[.2em] text-[#96968B] lg:block">YOUR WORKSPACE</p>
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {items.map(item => { const Icon=item.icon; const selected=active===item.key; return <Link key={item.key} href={item.href} className={`flex shrink-0 items-center gap-3 px-3 py-3 text-[11px] font-extrabold transition ${selected ? "bg-[#171916] text-white" : "text-[#696B63] hover:bg-white hover:text-[#171916]"}`}><Icon size={15}/>{item.label}{selected && <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-[#FF6848] lg:block"/>}</Link>; })}
        </nav>
        <div className="mt-10 hidden border-t border-black/10 px-3 pt-5 lg:block"><p className="text-[9px] font-black tracking-[.16em] text-[#96968B]">HIRING, WITHOUT THE CHAOS.</p><p className="mt-2 text-[10px] leading-5 text-[#777970]">Keep roles, people, and next steps in one place.</p><Link href="/" className="mt-4 inline-flex items-center gap-1 text-[10px] font-black">Visit HiredAF <ArrowUpRight size={12}/></Link></div>
      </aside>
      <div className="min-w-0 px-4 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-10">{children}</div>
    </div>
  </main>;
}
