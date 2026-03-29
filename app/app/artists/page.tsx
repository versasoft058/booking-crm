'use client'
export const dynamic = 'force-dynamic'

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/AppContext";
import { supabase } from "@/lib/supabaseClient";
import { COLUMNS } from "@/lib/mockData";
import Topbar from "@/components/app/Topbar";

const COLORS = ["#6C5CE7","#22D3EE","#10B981","#F59E0B","#0F172A","#EF4444"];

const inputCls = "w-full bg-[#F2F4F6] rounded-lg px-4 py-2.5 text-sm text-[#191c1e] placeholder:text-[#787586] outline-none focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/25 transition-all";
const labelCls = "block text-xs font-semibold text-[#474554] mb-1.5 tracking-wide";

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

export default function ArtistsPage() {
  const { artists, deals, addArtist, formatCurrency, loading } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panelDealIds, setPanelDealIds] = useState<string[]>([]);
  const [panelLoading, setPanelLoading] = useState(false);

  // Add Artist modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const selectedArtist = selectedId ? artists.find(a => a.id === selectedId) ?? null : null;
  // Linked deals: filter from context by IDs fetched via deal_artists
  const artistDeals = deals.filter(d => panelDealIds.includes(d.id));

  const handleSelectArtist = async (artistId: string) => {
    if (selectedId === artistId) {
      setSelectedId(null);
      setPanelDealIds([]);
      return;
    }
    setSelectedId(artistId);
    setPanelLoading(true);
    setPanelDealIds([]);

    try {
      const { data, error } = await supabase
        .from("deal_artists")
        .select("deal_id")
        .eq("artist_id", artistId);

      if (error) {
        console.warn("[ArtistsPage] deal_artists fetch:", error.message);
      } else {
        setPanelDealIds((data ?? []).map((r: { deal_id: string }) => r.deal_id));
      }
    } catch (e) {
      console.warn("[ArtistsPage] deal_artists exception:", e);
    }
    setPanelLoading(false);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addArtist(name.trim(), genre.trim(), color, email.trim() || undefined, phone.trim() || undefined);
    setName(""); setGenre(""); setColor(COLORS[0]); setEmail(""); setPhone(""); setModalOpen(false);
  };

  if (loading) {
    return (
      <>
        <Topbar title="Artists" ctaLabel="Add Artist" onAddDeal={() => setModalOpen(true)} />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#6C5CE7] border-t-transparent animate-spin" />
        </main>
      </>
    );
  }

  return (
    <>
      <Topbar title="Artists" ctaLabel="Add Artist" onAddDeal={() => setModalOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Artist grid */}
        <main className={`flex-1 overflow-y-auto p-6 md:p-8 transition-all duration-300 ${selectedArtist ? "md:mr-[400px]" : ""}`}>
          {artists.length === 0 ? (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-[#6C5CE7]/10 flex items-center justify-center mx-auto mb-5">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="10" r="5" fill="#6C5CE7" opacity="0.4" />
                    <path d="M8 26c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    <circle cx="25" cy="26" r="5" fill="#6C5CE7" />
                    <path d="M23 26h4M25 24v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="font-display font-extrabold text-[#0B0F19] text-xl mb-2">No artists yet</h3>
                <p className="text-sm text-[#64748B] mb-6 leading-relaxed">Add your first artist to start building your roster.</p>
                <button onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] shadow-[0_4px_16px_rgba(108,92,231,0.35)] hover:shadow-[0_6px_24px_rgba(108,92,231,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  Add your first artist
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {artists.map((artist) => {
                  const isSelected = selectedId === artist.id;
                  return (
                    <button key={artist.id} onClick={() => handleSelectArtist(artist.id)}
                      className={`text-left bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_24px_rgba(108,92,231,0.10)] transition-all duration-200 hover:-translate-y-0.5 p-6 ${isSelected ? "ring-2 ring-[#6C5CE7]" : ""}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: artist.color }}>
                          {artist.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-bold text-[#0B0F19] truncate">{artist.name}</p>
                          {artist.genre && artist.genre !== "—" && (
                            <p className="text-xs text-[#64748B] mt-0.5 truncate">{artist.genre}</p>
                          )}
                        </div>
                      </div>
                      {(artist.email || artist.phone) && (
                        <div className="flex flex-col gap-1 mb-4">
                          {artist.email && <p className="text-xs text-[#64748B] truncate">{artist.email}</p>}
                          {artist.phone && <p className="text-xs text-[#64748B]">{artist.phone}</p>}
                        </div>
                      )}
                      <div className="pt-4 border-t border-[#F1F5F9]">
                        <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wide">View deals</p>
                      </div>
                    </button>
                  );
                })}

                {/* Add artist tile */}
                <button onClick={() => setModalOpen(true)}
                  className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E2E8F0] hover:border-[#6C5CE7]/40 hover:shadow-[0_8px_24px_rgba(108,92,231,0.08)] transition-all duration-200 group min-h-[148px]">
                  <div className="w-10 h-10 rounded-xl bg-[#6C5CE7]/10 flex items-center justify-center group-hover:bg-[#6C5CE7]/15 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </div>
                  <p className="text-sm font-semibold text-[#64748B] group-hover:text-[#6C5CE7] transition-colors">Add Artist</p>
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Detail panel */}
        <aside
          className={`fixed right-0 top-0 h-full w-[400px] bg-white z-30 flex flex-col transition-transform duration-300 ${selectedArtist ? "translate-x-0" : "translate-x-full"}`}
          style={{ boxShadow: "-16px 0 48px rgba(15,23,42,0.08)" }}
        >
          {selectedArtist && (
            <>
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: selectedArtist.color }}>
                    {selectedArtist.initials}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display font-bold text-[#0B0F19] leading-tight truncate">{selectedArtist.name}</h2>
                    {selectedArtist.genre && selectedArtist.genre !== "—" && (
                      <p className="text-xs text-[#64748B]">{selectedArtist.genre}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Link href={`/app/artists/${selectedArtist.id}`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#6C5CE7] transition-colors"
                    title="View artist page">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 7.5h9M8.5 4l3.5 3.5L8.5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                  <button onClick={() => { setSelectedId(null); setPanelDealIds([]); }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#F1F5F9] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </button>
                </div>
              </div>

              {/* Contact info */}
              {(selectedArtist.email || selectedArtist.phone) && (
                <div className="px-6 py-4 border-b border-[#F1F5F9] flex flex-col gap-2">
                  {selectedArtist.email && (
                    <a href={`mailto:${selectedArtist.email}`} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#6C5CE7] transition-colors">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                      {selectedArtist.email}
                    </a>
                  )}
                  {selectedArtist.phone && (
                    <a href={`tel:${selectedArtist.phone}`} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#6C5CE7] transition-colors">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2h2.5l1 3-1.5 1a7 7 0 003 3l1-1.5 3 1V11a1 1 0 01-1 1A9 9 0 012 3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {selectedArtist.phone}
                    </a>
                  )}
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-5">
                {panelLoading ? (
                  <div className="flex items-center justify-center h-24">
                    <div className="w-6 h-6 rounded-full border-2 border-[#6C5CE7] border-t-transparent animate-spin" />
                  </div>
                ) : artistDeals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center mb-3">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </div>
                    <p className="text-sm font-semibold text-[#64748B]">No deals linked</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">Link an artist when adding a deal</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1">Deals</p>
                    {artistDeals.map(deal => (
                      <Link key={deal.id} href={`/app/deals/${deal.id}`}
                        className="block bg-[#F8FAFC] hover:bg-white rounded-xl p-4 hover:shadow-[0_4px_16px_rgba(108,92,231,0.08)] transition-all duration-200 group">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="font-semibold text-sm text-[#0B0F19] group-hover:text-[#6C5CE7] transition-colors leading-tight">{deal.name}</p>
                          {statusBadge(deal.status)}
                        </div>
                        <p className="text-xs text-[#64748B] mb-1">{deal.client}</p>
                        <p className="font-display font-bold text-[#6C5CE7]">{formatCurrency(deal.value)}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </aside>
      </div>

      {/* Add Artist Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-[#0B0F19]/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-[0_24px_64px_rgba(15,23,42,0.18)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F1F5F9]">
              <div>
                <h2 className="font-display font-extrabold text-[#0B0F19] tracking-tight">Add Artist</h2>
                <p className="text-xs text-[#64748B] mt-0.5">Add a new artist to your roster</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#F1F5F9] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
            </div>
            <form onSubmit={handleAdd} className="px-6 py-5 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className={labelCls}>Artist Name *</label>
                <input autoFocus type="text" placeholder="e.g. Luna Rivers" value={name} onChange={e => setName(e.target.value)} required className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Genre</label>
                <input type="text" placeholder="e.g. Electronic / House" value={genre} onChange={e => setGenre(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input type="email" placeholder="artist@example.com" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input type="tel" placeholder="+1 234 567 8900" value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Colour</label>
                <div className="flex gap-2">
                  {COLORS.map(c => (
                    <button key={c} type="button" onClick={() => setColor(c)}
                      className={`w-7 h-7 rounded-full transition-all ${color === c ? "ring-2 ring-offset-2 ring-[#6C5CE7] scale-110" : "hover:scale-105"}`}
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-1">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] shadow-[0_4px_12px_rgba(108,92,231,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">Add Artist</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
