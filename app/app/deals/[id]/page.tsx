
export const dynamic = 'force-dynamic'
import Link from "next/link";
import { initialDeals, COLUMNS, formatCurrency } from "@/lib/mockData";
import type { Metadata } from "next";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const deal = initialDeals.find((d) => d.id === id);
  return { title: deal ? `${deal.name} — KineticCRM` : "Deal — KineticCRM" };
}

export default async function DealDetailPage({ params }: Props) {
  const { id } = await params;
  const deal = initialDeals.find((d) => d.id === id);
  const col = deal ? COLUMNS.find((c) => c.id === deal.status) : null;

  if (!deal || !col) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-[#64748B]">Deal not found.</p>
        <Link href="/app" className="text-sm font-semibold text-[#6C5CE7] hover:underline">
          ← Back to pipeline
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="flex-shrink-0 bg-white shadow-[0_1px_0_rgba(15,23,42,0.06)] px-6 md:px-8 py-5">
        <Link
          href="/app"
          className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#6C5CE7] transition-colors mb-3"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Pipeline
        </Link>
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl font-extrabold text-[#0B0F19] tracking-tight">{deal.name}</h1>
            <p className="text-[#64748B] text-sm mt-1">{deal.client}</p>
          </div>
          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${col.badgeBg} ${col.badgeText}`}>
            {col.label}
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="md:col-span-2 flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-3">Description</h2>
            <p className="text-sm text-[#64748B] leading-relaxed">{deal.description || "No description yet."}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {deal.tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F1F5F9] text-[#64748B]">{tag}</span>
              ))}
              {deal.tags.length === 0 && <span className="text-sm text-[#94A3B8]">No tags</span>}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-4">Activity</h2>
            <div className="flex flex-col gap-4">
              {[
                { text: "Deal created", date: deal.createdAt, icon: "✦" },
                { text: `Assigned to ${deal.assignees.map(a => a.initials).join(", ")}`, date: deal.createdAt, icon: "◎" },
              ].map((ev, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-[#6C5CE7] text-sm mt-0.5">{ev.icon}</span>
                  <div>
                    <p className="text-sm text-[#0B0F19]">{ev.text}</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{new Date(ev.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: deal stats */}
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-4">Deal Details</h2>
            <dl className="flex flex-col gap-3">
              {[
                { label: "Value", value: formatCurrency(deal.value) },
                { label: "Client", value: deal.client },
                { label: "Stage", value: col.label },
                { label: "Created", value: new Date(deal.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start gap-2">
                  <dt className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">{label}</dt>
                  <dd className="text-sm font-semibold text-[#0B0F19] text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-4">Assignees</h2>
            <div className="flex flex-col gap-3">
              {deal.assignees.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: a.color }}>
                    {a.initials[0]}
                  </div>
                  <span className="text-sm font-semibold text-[#0B0F19]">{a.initials}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#6C5CE7] to-[#22D3EE] rounded-2xl p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Deal Value</p>
            <p className="font-display text-3xl font-extrabold tracking-tight">{formatCurrency(deal.value)}</p>
            <p className="text-xs opacity-60 mt-1">{col.label} stage</p>
          </div>
        </div>
      </div>
    </div>
  );
}
