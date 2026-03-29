import Container from "../Container";
import SectionWrapper from "../SectionWrapper";

const steps = [
  {
    number: "01",
    title: "Add a deal",
    description:
      "Create a deal card for any incoming booking inquiry. Add the artist, venue, dates, and fee in seconds.",
  },
  {
    number: "02",
    title: "Negotiate & track",
    description:
      "Move deals through your pipeline as negotiations progress. Log notes, attach files, and set reminders for follow-ups.",
  },
  {
    number: "03",
    title: "Close & celebrate",
    description:
      "Mark deals as won, archive cancelled shows, and let the pipeline dashboard tell you exactly where revenue is coming from.",
  },
];

export default function HowItWorks() {
  return (
    <SectionWrapper bg="surface">
      <Container>
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#6C5CE7] mb-3">
            How it works
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0B0F19] tracking-tight mb-4">
            Up and running in minutes
          </h2>
          <p className="text-[#64748B] leading-relaxed">
            No lengthy onboarding. No consultant required. Just sign up and
            start closing.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8 md:gap-6">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-[#6C5CE7]/30 via-[#22D3EE]/50 to-[#6C5CE7]/30" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center md:items-center">
              {/* Step number circle */}
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6C5CE7]/10 to-[#22D3EE]/10 flex items-center justify-center mb-6 shadow-[var(--shadow-card)]">
                <span className="font-display font-extrabold text-2xl bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] bg-clip-text text-transparent">
                  {step.number}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-[#0B0F19] mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
