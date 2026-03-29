"use client";

import { useRouter } from "next/navigation";
import Topbar from "@/components/app/Topbar";
import { supabase } from "@/lib/supabaseClient";

const sections = [
  { title: "Profile", description: "Update your name, email, and avatar.", icon: "👤" },
  { title: "Agency", description: "Manage agency name, logo, and team members.", icon: "🏢" },
  { title: "Notifications", description: "Choose what you get notified about.", icon: "🔔" },
  { title: "Integrations", description: "Connect your email, calendar, and other tools.", icon: "🔗" },
  { title: "Billing", description: "Manage your plan, invoices, and payment method.", icon: "💳" },
  { title: "Security", description: "Password, two-factor authentication, and sessions.", icon: "🔒" },
];

export default function SettingsPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    document.cookie = "sb-auth=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <>
      <Topbar title="Settings" />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-2xl flex flex-col gap-3">
          {sections.map((s) => (
            <button
              key={s.title}
              className="w-full text-left bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_24px_rgba(108,92,231,0.10)] transition-all duration-200 hover:-translate-y-0.5 p-5 flex items-center gap-4 group"
            >
              <span className="text-2xl">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-[#0B0F19] group-hover:text-[#6C5CE7] transition-colors">{s.title}</p>
                <p className="text-sm text-[#64748B] mt-0.5">{s.description}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#C8C4D7] group-hover:text-[#6C5CE7] transition-colors flex-shrink-0">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="w-full text-left bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_24px_rgba(239,68,68,0.10)] transition-all duration-200 hover:-translate-y-0.5 p-5 flex items-center gap-4 group mt-2"
          >
            <span className="text-2xl">🚪</span>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-[#EF4444] group-hover:text-[#dc2626] transition-colors">Sign out</p>
              <p className="text-sm text-[#64748B] mt-0.5">Log out of your KineticCRM account.</p>
            </div>
          </button>
        </div>
      </main>
    </>
  );
}
