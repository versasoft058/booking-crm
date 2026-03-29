"use client";
export const dynamic = "force-dynamic";

import { useParams } from "next/navigation";
import Link from "next/link";
import { COLUMNS, formatCurrency } from "@/lib/mockData";
import { useApp } from "@/lib/AppContext";

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { clients, deals, loading } = useApp();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#6C5CE7] border-t-transparent animate-spin" />
      </div>
    );
  }

  const client = clients.find(c => c.id === id) ?? null;

  if (!client) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-[#64748B]">Client not found.</p>
        <Link href="/app/clients" className="text-sm font-semibold text-[#6C5CE7] hover:underline">
          ← Back to Clients
        </Link>
      </div>
    );
  }

  const clientDeals = deals.filter(d => d.client === client.name);
  const totalValue = clientDeals.reduce((s, d) => s + d.value, 0);
  const activeValue = clientDeals.filter(d => d.status !== "lost").reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="flex-shrink-0 bg-white shadow-[0_1px_0_rgba(15,23,42,0.06)] px-6 md:px-8 py-5">
        <Link
          href="/app/clients"
          className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#6C5CE7] transition-colors mb-3"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Clients
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: client.color }}
          >
            {client.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl font-extrabold text-[#0B0F19] tracking-tight">{client.name}</h1>
            {client.contact_person && (
              <p className="text-[#64748B] text-sm mt-0.5">{client.contact_person}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#94A3B8]">{clientDeals.length} deal{clientDeals.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
        {/* Main — Deals */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-4">Deals</h2>
            {clientDeals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 5h14M3 10h14M3 15h8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[#64748B]">No deals yet</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">Deals assigned to this client will appear here</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-[#F1F5F9]">
                {clientDeals.map(deal => {
                  const col = COLUMNS.find(c => c.id === deal.status);
                  return (
                    <Link
                      key={deal.id}
                      href={`/app/deals/${deal.id}`}
                      className="flex items-center gap-4 py-3.5 group hover:bg-[#F8FAFC] -mx-2 px-2 rounded-lg transition-colors"
                    >
                      {col && <span className={`w-2 h-2 rounded-full flex-shrink-0 ${col.dotClass}`} />}
                      <p className="flex-1 text-sm font-semibold text-[#0B0F19] group-hover:text-[#6C5CE7] transition-colors truncate">
                        {deal.name}
                      </p>
                      <span className="font-display font-bold text-sm text-[#0B0F19]">
                        {formatCurrency(deal.value)}
                      </span>
                      {col && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${col.badgeBg} ${col.badgeText}`}>
                          {col.label}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          {/* Client Details */}
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-4">Client Details</h2>
            <dl className="flex flex-col gap-3">
              {client.contact_person && (
                <div className="flex justify-between items-start gap-2">
                  <dt className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">Contact</dt>
                  <dd className="text-sm font-semibold text-[#0B0F19] text-right">{client.contact_person}</dd>
                </div>
              )}
              {client.email && (
                <div className="flex justify-between items-start gap-2">
                  <dt className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">Email</dt>
                  <dd className="text-sm font-semibold text-right">
                    <a href={`mailto:${client.email}`} className="text-[#6C5CE7] hover:underline">{client.email}</a>
                  </dd>
                </div>
              )}
              {client.phone && (
                <div className="flex justify-between items-start gap-2">
                  <dt className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">Phone</dt>
                  <dd className="text-sm font-semibold text-right">
                    <a href={`tel:${client.phone}`} className="text-[#6C5CE7] hover:underline">{client.phone}</a>
                  </dd>
                </div>
              )}
              <div className="flex justify-between items-start gap-2">
                <dt className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">Deals</dt>
                <dd className="text-sm font-semibold text-[#0B0F19] text-right">{clientDeals.length}</dd>
              </div>
              <div className="flex justify-between items-start gap-2">
                <dt className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">Active Value</dt>
                <dd className="text-sm font-semibold text-[#0B0F19] text-right">{formatCurrency(activeValue)}</dd>
              </div>
            </dl>
          </div>

          {/* Total Value */}
          <div className="bg-gradient-to-br from-[#6C5CE7] to-[#22D3EE] rounded-2xl p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Total Value</p>
            <p className="font-display text-3xl font-extrabold tracking-tight">{formatCurrency(totalValue)}</p>
            <p className="text-xs opacity-60 mt-1">{clientDeals.length} deal{clientDeals.length !== 1 ? "s" : ""} across all stages</p>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-3">Notes</h2>
            <textarea
              rows={4}
              placeholder="Add notes about this client…"
              className="w-full bg-[#F8FAFC] rounded-lg px-3 py-2.5 text-sm text-[#0B0F19] placeholder:text-[#94A3B8] outline-none focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/20 resize-none transition-all"
            />
            <p className="text-[10px] text-[#94A3B8] mt-2">Notes are not saved yet — persistence coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
