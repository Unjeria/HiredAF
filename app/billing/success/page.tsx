import Link from "next/link";
export default function BillingSuccessPage() {
  return <main className="grid min-h-screen place-items-center bg-[#F4F2EC] px-5 text-[#171916]"><section className="max-w-lg border border-black/10 bg-white p-8 sm:p-12"><p className="text-[9px] font-black tracking-[.2em] text-[#E85B3E]">HIREDAF / BILLING</p><h1 className="mt-4 text-4xl font-black tracking-[-.07em]">Checkout complete.</h1><p className="mt-4 text-sm leading-7 text-[#777970]">Stripe is confirming your subscription. Your workspace plan will update when the verified billing webhook is processed.</p><Link href="/billing" className="mt-7 inline-flex bg-[#171916] px-5 py-4 text-[10px] font-black text-white">VIEW BILLING STATUS ↗</Link></section></main>;
}
