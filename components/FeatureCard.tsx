interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-1">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C5CE7]/10 to-[#22D3EE]/10 flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-display text-[#0B0F19] font-bold text-lg mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-[#64748B] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
