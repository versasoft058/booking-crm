import Container from "../Container";
import FeatureCard from "../FeatureCard";
import SectionWrapper from "../SectionWrapper";

const features = [
  {
    icon: "🎯",
    title: "Visual Deal Pipeline",
    description:
      "Drag-and-drop Kanban boards tailored for booking deals. Track every negotiation from first contact to signed contract in one glance.",
  },
  {
    icon: "🎤",
    title: "Artist & Client CRM",
    description:
      "Manage your entire roster and promoter network in one place. Rider requirements, history, and contact details always at hand.",
  },
  {
    icon: "📝",
    title: "Notes & Deal History",
    description:
      "Keep a full paper trail of every call, email, and negotiation. Never lose context when handing off a deal or revisiting an old lead.",
  },
  {
    icon: "📎",
    title: "Attachments & Riders",
    description:
      "Attach contracts, stage plots, and hospitality riders directly to deals. Everything your team and promoters need, in one link.",
  },
];

export default function Features() {
  return (
    <SectionWrapper id="features" bg="surface-low">
      <Container>
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#6C5CE7] mb-3">
            Features
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0B0F19] tracking-tight mb-4">
            Everything a booking agent needs
          </h2>
          <p className="text-[#64748B] leading-relaxed">
            Purpose-built tools that map to how booking agencies actually work
            — not a generic CRM bolted together.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
