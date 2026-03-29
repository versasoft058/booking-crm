'use client'
export const dynamic = 'force-dynamic'
import { useState } from "react";
import Link from "next/link";
import { useApp, Client } from "@/lib/AppContext";
import { COLUMNS } from "@/lib/mockData";
import Topbar from "@/components/app/Topbar";

const COLORS = ["#6C5CE7","#22D3EE","#10B981","#F59E0B","#0F172A","#EF4444"];

const inputCls = "w-full bg-[#F2F4F6] rounded-lg px-4 py-2.5 text-sm text-[#191c1e] placeholder:text-[#787586] outline-none focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/25 transition-all";

function statusBadge(status: string) {
  const col = COLUMNS.find(c => c.id === status);
  if (!col) return null;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${col.badgeBg} ${col.badgeText}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${col.dotClass}`} />
      {col.label}
    </span>
  );
}

export default function ClientsPage() {
  const { clients, deals, addClient, formatCurrency, loading } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  const selectedClient = selectedId ? clients.find(c => c.id === selectedId) ?? null : null;
  const clientDeals = selectedClient ? deals.filter(d => d.client === selectedClient.name) : [];
  const clientRevenue = clientDeals.reduce((sum, d) => sum + d.value, 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addClient(name.trim(), color);
    setName(""); setColor(COLORS[0]); setModalOpen(false);
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Topbar title="Clients" ctaLabel="Add Client" onAddDeal={() => setModalOpen(true)} />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#6C5CE7] border-t-transparent animate-spin" />
        </main>
      </>
    );
  }

  return (
    <>
      <Topbar title="Clients" ctaLabel="Add Client" onAddDeal={() => setModalOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Client grid */}
        <main className={`flex-1 overflow-y-auto p-6 md:p-8 transition-all duration-300 ${selectedClient ? "md:mr-[400px]" : ""}`}>

          {/* Empty state */}
          {clients.length === 0 ? (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-[#6C5CE7]/10 flex items-center justify-center mx-auto mb-5">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="11" r="5" fill="#6C5CE7" opacity="0.4" />
                    <path d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    <circle cx="25" cy="26" r="5" fill="#6C5CE7" />
                    <path d="M23 26h4M25 24v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="font-display font-extrabold text-[#0B0F19] text-xl mb-2">No clients yet</h3>
                <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
                  Add your first client to start managing your agency relationships.
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] shadow-[0_4px_16px_rgba(108,92,231,0.35)] hover:shadow-[0_6px_24px_rgba(108,92,231,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Add your first client
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {clients.map((client) => {
                  const cDeals = deals.filter(d => d.client === client.name);
                  const cRevenue = cDeals.reduce((s, d) => s + d.value, 0);
                  const isSelected = selectedId === client.id;
                  return (
                    <button
                      key={client.id}
                      onClick={() => setSelectedId(isSelected ? null : client.id)}
                      className={`text-left bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_24px_rgba(108,92,231,0.10)] transition-all duration-200 hover:-translate-y-0.5 p-6 ${isSelected ? "ring-2 ring-[#6C5CE7]" : ""}`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: client.color }}>
                          {client.initials}
                        </div>
                        <div>
                          <p className="font-display font-bold text-[#0B0F19]">{client.name}</p>
                          <p className="text-xs text-[#64748B] mt-0.5">{cDeals.length} active deal{cDeals.length !== 1 ? "s" : ""}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-[#F1F5F9]">
                        <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wide">Total Value</p>
                        <p className="font-display font-extrabold text-xl text-[#6C5CE7] mt-0.5">{formatCurrency(cRevenue)}</p>
                      </div>
                    </button>
                  );
                })}

                {/* Add client tile */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E2E8F0] hover:border-[#6C5CE7]/40 hover:shadow-[0_8px_24px_rgba(108,92,231,0.08)] transition-all duration-200 group min-h-[148px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#6C5CE7]/10 flex items-center justify-center group-hover:bg-[#6C5CE7]/15 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4v12M4 10h12" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[#64748B] group-hover:text-[#6C5CE7] transition-colors">Add Client</p>
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Detail panel */}
        <aside
          className={`fixed right-0 top-0 h-full w-[400px] bg-white z-30 flex flex-col transition-transform duration-300 ${selectedClient ? "translate-x-0" : "translate-x-full"}`}
          style={{ boxShadow: "-16px 0 48px rgba(15,23,42,0.08)" }}
        >
          {selectedClient && (
            <>
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: selectedClient.color }}>
                    {selectedClient.initials}
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-[#0B0F19] leading-tight">{selectedClient.name}</h2>
                    <p className="text-xs text-[#64748B]">{clientDeals.length} deal{clientDeals.length !== 1 ? "s" : ""} · {formatCurrency(clientRevenue)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#F1F5F9] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {clientDeals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center mb-3">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </div>
                    <p className="text-sm font-semibold text-[#64748B]">No deals yet</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">Assign a deal to this client to see it here</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1">Deals</p>
                    {clientDeals.map(deal => (
                      <Link
                        key={deal.id}
                        href={`/app/deals/${deal.id}`}
                        className="block bg-[#F8FAFC] hover:bg-white rounded-xl p-4 hover:shadow-[0_4px_16px_rgba(108,92,231,0.08)] transition-all duration-200 group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="font-semibold text-sm text-[#0B0F19] group-hover:text-[#6C5CE7] transition-colors leading-tight">{deal.name}</p>
                          {statusBadge(deal.status)}
                        </div>
                        <p className="font-display font-bold text-[#6C5CE7]">{formatCurrency(deal.value)}</p>
                        {deal.tags.length > 0 && (
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {deal.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-medium bg-[#6C5CE7]/8 text-[#6C5CE7] px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </aside>
      </div>

      {/* Add Client Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-[#0B0F19]/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-[0_24px_64px_rgba(15,23,42,0.18)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F1F5F9]">
              <div>
                <h2 className="font-display font-extrabold text-[#0B0F19] tracking-tight">Add Client</h2>
                <p className="text-xs text-[#64748B] mt-0.5">Enter the agency or client name</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#F1F5F9] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
            </div>
            <form onSubmit={handleAdd} className="px-6 py-5 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#474554] mb-1.5 tracking-wide">Client / Agency Name *</label>
                <input autoFocus type="text" placeholder="e.g. Pulse Agency" value={name} onChange={e => setName(e.target.value)} required className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#474554] mb-2 tracking-wide">Colour</label>
                <div className="flex gap-2">
                  {COLORS.map(c => (
                    <button key={c} type="button" onClick={() => setColor(c)}
                      className={`w-7 h-7 rounded-full transition-all ${color === c ? "ring-2 ring-offset-2 ring-[#6C5CE7] scale-110" : "hover:scale-105"}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-1">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] shadow-[0_4px_12px_rgba(108,92,231,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">Add Client</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
