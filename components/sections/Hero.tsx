import Link from "next/link";

const kanbanData = {
  New: [
    { artist: "Luna Rivers", venue: "Scala London", value: "$4,200" },
    { artist: "The Drift", venue: "Paradiso AMS", value: "$8,500" },
  ],
  Negotiating: [
    { artist: "Koto", venue: "Fabric London", value: "$12,000" },
    { artist: "Mara Fox", venue: "Rex Club Paris", value: "$6,800" },
  ],
  Closed: [
    { artist: "Binary Soul", venue: "Berghain Berlin", value: "$18,000" },
  ],
};

const colColors: Record<string, string> = {
  New: "from-[#6C5CE7]/20 to-[#6C5CE7]/5",
  Negotiating: "from-[#22D3EE]/20 to-[#22D3EE]/5",
  Closed: "from-emerald-400/20 to-emerald-400/5",
};

const dotColors: Record<string, string> = {
  New: "bg-[#6C5CE7]",
  Negotiating: "bg-[#22D3EE]",
  Closed: "bg-emerald-400",
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#F8FAFC]">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#6C5CE7]/10 to-[#22D3EE]/10 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#22D3EE]/8 to-[#6C5CE7]/8 blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-xs font-semibold text-[#6C5CE7] shadow-[0_2px_8px_rgba(15,23,42,0.06)] mb-6">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE]" />
              Built for booking agents
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B0F19] leading-[1.08] tracking-[-0.03em] mb-6">
              Close more booking deals.{" "}
              <span className="bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] bg-clip-text text-transparent">
                Without the chaos.
              </span>
            </h1>

            <p className="text-[#64748B] text-lg leading-relaxed mb-8 max-w-md">
              A deal pipeline, client CRM, and negotiation tracker built
              exclusively for booking agencies. Stop losing deals in scattered
              spreadsheets.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-base px-8 py-3.5 bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white shadow-[0_4px_16px_rgba(108,92,231,0.35)] hover:shadow-[0_6px_24px_rgba(108,92,231,0.45)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200"
              >
                Start free trial
              </Link>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-base px-8 py-3.5 bg-white text-[#0B0F19] shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:bg-[#F1F5F9] hover:shadow-[0_8px_32px_rgba(108,92,231,0.12)] transition-all duration-200">
                Watch demo
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
                </svg>
              </button>
            </div>

            <p className="mt-5 text-xs text-[#94A3B8]">
              No credit card required · 14-day free trial · Cancel anytime
            </p>
          </div>

          {/* Right: Kanban mock */}
          <div className="relative hidden md:flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_16px_48px_rgba(15,23,42,0.12)] p-5 border border-white">
              <div className="flex items-center justify-between mb-5">
                <span className="font-display font-bold text-sm text-[#0B0F19]">Deal Pipeline</span>
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#F1F5F9]" />
                  <span className="w-3 h-3 rounded-full bg-[#F1F5F9]" />
                  <span className="w-3 h-3 rounded-full bg-[#F1F5F9]" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {Object.entries(kanbanData).map(([col, cards]) => (
                  <div key={col}>
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <span className={`w-2 h-2 rounded-full ${dotColors[col]}`} />
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{col}</span>
                    </div>
                    <div className="space-y-2">
                      {cards.map((card, i) => (
                        <div key={i} className={`bg-gradient-to-br ${colColors[col]} rounded-lg p-3`}>
                          <p className="font-semibold text-[11px] text-[#0B0F19] leading-snug">{card.artist}</p>
                          <p className="text-[10px] text-[#64748B] mt-0.5 leading-snug">{card.venue}</p>
                          <p className="text-[11px] font-bold text-[#6C5CE7] mt-1.5">{card.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-[0_16px_48px_rgba(15,23,42,0.12)] px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7]/20 to-[#22D3EE]/20 flex items-center justify-center text-base">📈</div>
                <div>
                  <p className="font-display font-extrabold text-sm text-[#0B0F19] leading-none">+38%</p>
                  <p className="text-[10px] text-[#94A3B8] mt-0.5">deals closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
