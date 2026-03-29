import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up — KineticCRM",
  description: "Create your free KineticCRM account and start closing more deals.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Branding + social proof — hidden on mobile */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-gradient-to-br from-[#5341cd] via-[#6c5ce7] to-[#2fd9f4] flex-col justify-between p-12">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#a2eeff]/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#faf6ff]/20 blur-[120px]" />

        <div className="relative z-10">
          {/* Brand */}
          <Link href="/" className="inline-flex items-center gap-2 mb-16">
            <span className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm">
              K
            </span>
            <span className="font-display font-extrabold text-white tracking-tight text-lg">
              KineticCRM
            </span>
          </Link>

          <h2 className="font-display text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            The Kinetic Curator
          </h2>
          <p className="text-[#e4dfff] text-lg leading-relaxed max-w-sm">
            Elevating agency logistics into a curated digital masterpiece.
            Manage talent, bookings, and creative workflows with effortless
            precision.
          </p>
        </div>

        {/* Testimonial card */}
        <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-[0_8px_32px_rgba(15,23,42,0.12)]">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#007d8e] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              ER
            </div>
            <div>
              <p className="font-bold text-sm text-[#191c1e] leading-none">Elena Rodriguez</p>
              <p className="text-xs text-[#474554] mt-0.5">Director, Vanguard Talent</p>
              <div className="flex gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#006270]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-[#474554] italic leading-relaxed">
            &ldquo;Kinetic Curator transformed our booking process from a chaotic
            spreadsheet into a high-end editorial experience. It&apos;s the first
            CRM that actually understands the creative soul of our business.&rdquo;
          </p>
        </div>
      </div>

      {/* Right: Registration form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 bg-[#F2F4F6]">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile-only brand */}
          <Link href="/" className="inline-flex items-center gap-2 mb-8 lg:hidden">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#22D3EE] flex items-center justify-center text-white font-bold text-sm shadow-[0_2px_8px_rgba(108,92,231,0.35)]">
              K
            </span>
            <span className="font-display font-extrabold text-[#0B0F19] tracking-tight text-lg">
              Kinetic<span className="text-[#6C5CE7]">CRM</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-extrabold text-[#191c1e] tracking-tight mb-2">
              Get started for free
            </h1>
            <p className="text-[#474554] text-sm">
              Join 200+ agencies using Kinetic Curator.
            </p>
          </div>

          <RegisterForm />

          <p className="text-center text-sm text-[#474554] mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#6C5CE7] hover:text-[#5a4bd1] transition-colors"
            >
              Log in
            </Link>
          </p>

          <p className="text-center text-xs text-[#787586] mt-10">
            © 2025 KineticCRM ·{" "}
            <a href="#" className="hover:text-[#474554] transition-colors">Privacy Policy</a>
            {" · "}
            <a href="#" className="hover:text-[#474554] transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
}
