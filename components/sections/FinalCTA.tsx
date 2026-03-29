import Link from "next/link";
import Container from "../Container";

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-b from-[#6C5CE7]/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gradient-to-tl from-[#22D3EE]/10 to-transparent blur-3xl" />
      </div>

      <Container className="relative z-10 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#6C5CE7] mb-4">
            Get started today
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[-0.02em] leading-tight mb-6">
            Your next deal won&apos;t book itself.
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Join hundreds of booking agents who closed more deals this year
            using KineticCRM. Your 14-day free trial is waiting.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg font-semibold text-base px-10 py-4 bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white shadow-[0_4px_16px_rgba(108,92,231,0.35)] hover:shadow-[0_6px_24px_rgba(108,92,231,0.45)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200"
            >
              Start your free trial
            </Link>
            <button className="text-sm font-semibold text-white/70 hover:text-white transition-colors duration-150 underline underline-offset-4">
              Talk to sales
            </button>
          </div>

          <p className="mt-6 text-xs text-[#475569]">
            No credit card · Setup in 5 minutes · Cancel anytime
          </p>
        </div>
      </Container>
    </section>
  );
}
