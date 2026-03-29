import Link from "next/link";
import SectionWrapper from "../SectionWrapper";
import Container from "../Container";

const plans = [
  {
    name: "Solo Agent",
    price: "$49",
    description: "Perfect for independent booking agents managing a small roster.",
    features: [
      { text: "Up to 3 artists", included: true },
      { text: "Unlimited deals", included: true },
      { text: "Deal pipeline & Kanban", included: true },
      { text: "Notes & file attachments", included: true },
      { text: "Team collaboration", included: false },
      { text: "Priority support", included: false },
      { text: "Advanced analytics", included: false },
    ],
    highlighted: false,
  },
  {
    name: "Agency Pro",
    price: "$129",
    description: "For growing agencies managing multiple artists and a full team.",
    features: [
      { text: "Unlimited artists", included: true },
      { text: "Unlimited deals", included: true },
      { text: "Deal pipeline & Kanban", included: true },
      { text: "Notes & file attachments", included: true },
      { text: "Team collaboration (up to 10)", included: true },
      { text: "Priority support", included: true },
      { text: "Advanced analytics", included: true },
    ],
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <SectionWrapper id="pricing" bg="surface">
      <Container>
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#6C5CE7] mb-3">Pricing</p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0B0F19] tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[#64748B] leading-relaxed">
            No hidden fees. No per-artist charges. Start free, upgrade when you&apos;re ready.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto items-start pt-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? "bg-[#0F172A] text-white shadow-[0_16px_48px_rgba(15,23,42,0.12)] scale-[1.02]"
                  : "bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_32px_rgba(108,92,231,0.12)]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-display font-bold text-xl mb-1 tracking-tight ${plan.highlighted ? "text-white" : "text-[#0B0F19]"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlighted ? "text-[#94A3B8]" : "text-[#64748B]"}`}>{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className={`font-display text-5xl font-extrabold tracking-tight ${plan.highlighted ? "text-white" : "text-[#0B0F19]"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ml-1 ${plan.highlighted ? "text-[#94A3B8]" : "text-[#64748B]"}`}>/mo</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                      f.included
                        ? plan.highlighted ? "bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white" : "bg-[#6C5CE7]/10 text-[#6C5CE7]"
                        : plan.highlighted ? "bg-white/10 text-white/30" : "bg-[#F1F5F9] text-[#94A3B8]"
                    }`}>
                      {f.included ? "✓" : "–"}
                    </span>
                    <span className={`text-sm ${
                      f.included
                        ? plan.highlighted ? "text-white" : "text-[#0B0F19]"
                        : plan.highlighted ? "text-white/40" : "text-[#94A3B8]"
                    }`}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`w-full py-3 rounded-lg font-semibold text-sm text-center transition-all duration-200 block ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white shadow-[0_4px_16px_rgba(108,92,231,0.4)] hover:shadow-[0_6px_24px_rgba(108,92,231,0.5)] hover:scale-[1.02] active:scale-[0.99]"
                    : "bg-white text-[#0B0F19] border border-[rgba(15,23,42,0.12)] shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:bg-[#F1F5F9] hover:shadow-[0_8px_32px_rgba(108,92,231,0.12)]"
                }`}
              >
                Choose plan
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#94A3B8] mt-10">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </Container>
    </SectionWrapper>
  );
}
