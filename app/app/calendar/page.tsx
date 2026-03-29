import Topbar from "@/components/app/Topbar";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Calendar — KineticCRM" };

export default function CalendarPage() {
  return (
    <>
      <Topbar title="Calendar" />
      <main className="flex-1 overflow-y-auto p-6 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C5CE7]/10 to-[#22D3EE]/10 flex items-center justify-center text-3xl mx-auto mb-4">📅</div>
          <h2 className="font-display font-extrabold text-xl text-[#0B0F19] mb-2">Calendar coming soon</h2>
          <p className="text-[#64748B] text-sm max-w-xs">Tour dates, venue bookings, and artist availability — all in one view.</p>
        </div>
      </main>
    </>
  );
}
