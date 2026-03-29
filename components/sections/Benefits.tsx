import Container from "../Container";
import SectionWrapper from "../SectionWrapper";

const benefits = [
  {
    icon: "⚡",
    title: "Save 8+ hours a week",
    description:
      "Stop copy-pasting between email, spreadsheets, and calendars. KineticCRM keeps everything in one workflow.",
  },
  {
    icon: "🔒",
    title: "Never lose a deal again",
    description:
      "Automated follow-up reminders and deal stage tracking mean nothing slips through the cracks.",
  },
  {
    icon: "📊",
    title: "See your pipeline clearly",
    description:
      "Know exactly what's closing this month, what's stalled, and where your revenue is coming from at all times.",
  },
  {
    icon: "🤝",
    title: "Better promoter relationships",
    description:
      "A full history of every deal with every promoter means you walk into every negotiation prepared.",
  },
  {
    icon: "🚀",
    title: "Scale your roster",
    description:
      "Whether you represent 5 artists or 50, KineticCRM scales with you without adding overhead.",
  },
  {
    icon: "🌍",
    title: "Work from anywhere",
    description:
      "Cloud-based and mobile-optimised. Manage deals from backstage, the airport, or the office.",
  },
];

export default function Benefits() {
  return (
    <SectionWrapper bg="surface-low">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#6C5CE7] mb-3">
              Why KineticCRM
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0B0F19] tracking-tight mb-4">
              Built for the chaos of
              <br />
              the music industry
            </h2>
            <p className="text-[#64748B] leading-relaxed mb-10 max-w-md">
              Generic CRMs weren&apos;t built for booking. Last-minute
              cancellations, multi-show tours, artist riders — we handle the
              nuance so you don&apos;t have to.
            </p>

            <ul className="space-y-4">
              {benefits.slice(0, 3).map((b) => (
                <li key={b.title} className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C5CE7]/10 to-[#22D3EE]/10 flex items-center justify-center text-lg flex-shrink-0">
                    {b.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-[#0B0F19] mb-1">
                      {b.title}
                    </p>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: more benefits */}
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.slice(3).map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="text-2xl block mb-3">{b.icon}</span>
                <p className="font-semibold text-sm text-[#0B0F19] mb-1.5">
                  {b.title}
                </p>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
