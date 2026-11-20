import Link from "next/link";
import { signIn, signUp } from "@/app/auth/actions";

type Props = { searchParams: Promise<{ error?: string; message?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <main className="min-h-screen bg-[#F7F7F2] px-5 py-12 text-[#20221C]">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black tracking-[-.07em]"> <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#C6F36B] text-lg">H.</span> hired<span className="text-[#86B52F]">AF</span></Link>
        <div className="mt-14 grid gap-12 md:grid-cols-[.9fr_1.1fr] md:items-start">
          <section className="pt-4">
            <p className="text-xs font-bold tracking-[.2em] text-[#7A7C71]">YOUR NEXT CHAPTER STARTS HERE</p>
            <h1 className="mt-5 text-5xl font-black leading-[.98] tracking-[-.07em] sm:text-6xl">Build your team.<br/><span className="text-[#86B52F]">Not your workload.</span></h1>
            <p className="mt-6 max-w-md leading-7 text-[#686A61]">Create your HiredAF account to organize roles, candidates, and hiring activity in one workspace.</p>
            <Link href="/" className="mt-8 inline-block text-sm font-semibold underline underline-offset-4">Back to HiredAF home</Link>
          </section>
          <section className="grid gap-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            {params.error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{params.error}</p>}
            {params.message && <p role="status" className="rounded-xl bg-[#F0F8E2] p-3 text-sm text-[#46651E]">{params.message}</p>}
            <form action={signIn} className="grid gap-3">
              <h2 className="text-2xl font-extrabold tracking-tight">Welcome back</h2>
              <p className="mb-2 text-sm text-[#77796F]">Sign in to your recruiting workspace.</p>
              <label className="text-sm font-semibold" htmlFor="signin-email">Work email</label>
              <input id="signin-email" name="email" type="email" autoComplete="email" required className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-[#86B52F]" placeholder="you@company.com"/>
              <label className="mt-2 text-sm font-semibold" htmlFor="signin-password">Password</label>
              <input id="signin-password" name="password" type="password" autoComplete="current-password" required className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-[#86B52F]" placeholder="Your password"/>
              <button className="mt-3 rounded-full bg-[#20221C] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#383B30]">Sign in</button>
            </form>
            <div className="h-px bg-black/10"/>
            <form action={signUp} className="grid gap-3">
              <h2 className="text-2xl font-extrabold tracking-tight">Create your account</h2>
              <p className="mb-2 text-sm text-[#77796F]">Start with a free HiredAF workspace.</p>
              <label className="text-sm font-semibold" htmlFor="signup-name">Full name</label>
              <input id="signup-name" name="fullName" autoComplete="name" className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-[#86B52F]" placeholder="Your name"/>
              <label className="mt-2 text-sm font-semibold" htmlFor="signup-email">Work email</label>
              <input id="signup-email" name="email" type="email" autoComplete="email" required className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-[#86B52F]" placeholder="you@company.com"/>
              <label className="mt-2 text-sm font-semibold" htmlFor="signup-password">Password</label>
              <input id="signup-password" name="password" type="password" minLength={8} autoComplete="new-password" required className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-[#86B52F]" placeholder="At least 8 characters"/>
              <button className="rounded-full bg-[#C6F36B] px-5 py-3.5 text-sm font-bold text-[#20221C] transition hover:bg-[#b6e65c]">Create account</button>
              <p className="text-xs leading-5 text-[#85877D]">You may receive an email confirmation before signing in.</p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
