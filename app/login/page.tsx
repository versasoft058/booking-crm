import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in — KineticCRM",
  description: "Sign in to your KineticCRM account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 bg-[#F2F4F6]">
        <div className="w-full max-w-md mx-auto">
          {/* Brand */}
          <Link href="/" className="inline-flex items-center gap-2 mb-10">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#22D3EE] flex items-center justify-center text-white font-bold text-sm shadow-[0_2px_8px_rgba(108,92,231,0.35)]">
              K
            </span>
            <span className="font-display font-extrabold text-[#0B0F19] tracking-tight text-lg">
              Kinetic<span className="text-[#6C5CE7]">CRM</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-extrabold text-[#191c1e] tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-[#474554] text-sm">
              Sign in to manage your deals and roster.
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-[#474554] mt-6">
            New to KineticCRM?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#6C5CE7] hover:text-[#5a4bd1] transition-colors"
            >
              Create an account
            </Link>
          </p>

          <p className="text-center text-xs text-[#787586] mt-10">
            © 2025 KineticCRM ·{" "}
            <a href="#" className="hover:text-[#474554] transition-colors">Privacy Policy</a>
            {" · "}
            <a href="#" className="hover:text-[#474554] transition-colors">Terms of Service</a>
            {" · "}
            <a href="#" className="hover:text-[#474554] transition-colors">Help Center</a>
          </p>
        </div>
      </div>

      {/* Right: Visual narrative — hidden on mobile */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-gradient-to-br from-[#5341cd] via-[#5847d2] to-[#007d8e]">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#2fd9f4]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#e4dfff]/20 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center p-12 w-full">
          {/* Bento grid */}
          <div className="grid grid-cols-6 grid-rows-6 gap-4 h-[520px]">
            {/* Deal card */}
            <div className="col-span-4 row-span-3 bg-white/15 backdrop-blur-sm rounded-2xl p-5 flex flex-col justify-between border border-white/20">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#6C5CE7] text-lg">✦</span>
                  <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Active Deal</span>
                </div>
                <h3 className="font-display font-extrabold text-white text-xl leading-tight mb-1">
                  Global Tour &apos;25
                </h3>
                <p className="text-[#a2eeff] text-xs font-medium">Negotiation Phase</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex -space-x-2">
                  {["MT", "SR", "KL"].map((init) => (
                    <div key={init} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#22D3EE] flex items-center justify-center text-white text-[10px] font-bold border-2 border-white/30">
                      {init}
                    </div>
                  ))}
                </div>
                <span className="bg-[#dae2fd] text-[#5341cd] text-xs font-bold px-3 py-1 rounded-full">
                  $120k Est.
                </span>
              </div>
            </div>

            {/* Stats card */}
            <div className="col-span-2 row-span-2 bg-white/15 backdrop-blur-sm rounded-2xl p-4 flex flex-col justify-center items-center text-center border border-white/20">
              <span className="text-[#2fd9f4] text-3xl mb-2">📅</span>
              <span className="font-display font-extrabold text-white text-3xl">24</span>
              <span className="text-[#a2eeff] text-xs font-medium mt-1">Active Bookings</span>
            </div>

            {/* Schedule card */}
            <div className="col-span-2 row-span-4 bg-white/15 backdrop-blur-sm rounded-2xl p-4 flex flex-col gap-3 border border-white/20">
              <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-1">Today</p>
              {[
                { time: "10:00 AM", title: "Artist Sync", color: "bg-[#2fd9f4]" },
                { time: "1:30 PM", title: "Contract Review", color: "bg-[#6C5CE7]" },
                { time: "4:00 PM", title: "Venue Scout", color: "bg-[#94A3B8]" },
              ].map((event) => (
                <div key={event.title} className="flex items-start gap-2.5">
                  <div className={`w-1 h-12 rounded-full ${event.color} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className="text-[10px] text-white/50 leading-none mb-1">{event.time}</p>
                    <p className="text-xs font-semibold text-white leading-snug">{event.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Image overlay card */}
            <div className="col-span-4 row-span-3 rounded-2xl overflow-hidden relative bg-gradient-to-br from-[#131b2e] to-[#1e2d4a] flex items-end p-5">
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/80 to-transparent" />
              <p className="relative z-10 font-display font-extrabold text-white text-base leading-snug">
                Empowering the next generation of kinetic talent.
              </p>
            </div>
          </div>

          <p className="text-right text-[10px] tracking-[0.4em] text-white/30 uppercase mt-6">
            Kinetic Curator Systems
          </p>
        </div>
      </div>
    </div>
  );
}
