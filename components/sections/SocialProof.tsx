import Container from "../Container";

const logos = [
  { name: "Vanguard Mgmt", abbr: "VM" },
  { name: "Pulse Music", abbr: "PM" },
  { name: "Orbit Talent", abbr: "OT" },
  { name: "Elite Gigs", abbr: "EG" },
  { name: "Nova Bookings", abbr: "NB" },
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-[#94A3B8] mb-10">
          Trusted by leading agencies worldwide
        </p>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-16">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2.5 opacity-50 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7]/20 to-[#22D3EE]/20 flex items-center justify-center text-[10px] font-black text-[#6C5CE7]">
                {logo.abbr}
              </div>
              <span className="font-display font-bold text-[#0B0F19] text-sm tracking-tight">
                {logo.name}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-[#6C5CE7]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="font-display text-xl md:text-2xl font-semibold text-[#0B0F19] leading-snug tracking-tight mb-6">
            &ldquo;KineticCRM transformed how we manage our entire roster. We
            closed 40% more deals in our first quarter using it.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#22D3EE] flex items-center justify-center text-white font-bold text-sm">
              MT
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm text-[#0B0F19] leading-none">
                Marcus Thorne
              </p>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Head of Talent, Orbit Talent Agency
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
