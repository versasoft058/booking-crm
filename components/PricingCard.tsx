import Button from "./Button";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  ctaLabel: string;
  highlighted?: boolean;
}

export default function PricingCard({
  name,
  price,
  period = "/mo",
  description,
  features,
  ctaLabel,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
        highlighted
          ? "bg-[#0F172A] text-white shadow-[var(--shadow-float)] scale-[1.02]"
          : "bg-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={`font-display font-bold text-xl mb-1 tracking-tight ${
            highlighted ? "text-white" : "text-[#0B0F19]"
          }`}
        >
          {name}
        </h3>
        <p className={`text-sm ${highlighted ? "text-[#94A3B8]" : "text-[#64748B]"}`}>
          {description}
        </p>
      </div>

      <div className="mb-8">
        <span
          className={`font-display text-5xl font-extrabold tracking-tight ${
            highlighted ? "text-white" : "text-[#0B0F19]"
          }`}
        >
          {price}
        </span>
        <span className={`text-sm ml-1 ${highlighted ? "text-[#94A3B8]" : "text-[#64748B]"}`}>
          {period}
        </span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                feature.included
                  ? highlighted
                    ? "bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white"
                    : "bg-[#6C5CE7]/10 text-[#6C5CE7]"
                  : highlighted
                  ? "bg-white/10 text-white/30"
                  : "bg-[#F1F5F9] text-[#94A3B8]"
              }`}
            >
              {feature.included ? "✓" : "–"}
            </span>
            <span
              className={`text-sm ${
                feature.included
                  ? highlighted
                    ? "text-white"
                    : "text-[#0B0F19]"
                  : highlighted
                  ? "text-white/40"
                  : "text-[#94A3B8]"
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {highlighted ? (
        <button className="w-full py-3 rounded-lg font-semibold text-sm bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white shadow-[0_4px_16px_rgba(108,92,231,0.4)] hover:shadow-[0_6px_24px_rgba(108,92,231,0.5)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer">
          {ctaLabel}
        </button>
      ) : (
        <Button variant="secondary" className="w-full justify-center">
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}
