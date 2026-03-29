"use client";
export const dynamic = 'force-dynamic'
import { useState, useEffect } from "react";
import Topbar from "@/components/app/Topbar";
import { supabase } from "@/lib/supabaseClient";

interface Artist { id: string; name: string; genre: string; initials: string; color: string; }

const COLORS = ["#6C5CE7","#22D3EE","#10B981","#F59E0B","#0F172A","#EF4444"];

const inputCls = "w-full bg-[#F2F4F6] rounded-lg px-4 py-2.5 text-sm text-[#191c1e] placeholder:text-[#787586] outline-none focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/25 transition-all";

function toInitials(name: string) {
  return name.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      setUserId(user.id);

      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error && process.env.NODE_ENV === "development") {
        console.error("[DEV] Fetch artists error:", error.message);
      }

      if (data) {
        setArtists(data.map(a => ({
          id: a.id,
          name: a.name,
          genre: a.genre ?? "—",
          initials: toInitials(a.name),
          color: a.color ?? "#6C5CE7",
        })));
      }

      setLoading(false);
    }
    load();
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const tempId = `a${Date.now()}`;
    const newArtist: Artist = {
      id: tempId,
      name: name.trim(),
      genre: genre.trim() || "—",
      initials: toInitials(name),
      color,
    };
    setArtists(prev => [newArtist, ...prev]);
    setName(""); setGenre(""); setColor(COLORS[0]); setModalOpen(false);

    if (userId) {
      supabase.from("artists")
        .insert({ name: name.trim(), genre: genre.trim() || "", color, user_id: userId })
        .select()
        .single()
        .then(({ data, error }) => {
          if (error && process.env.NODE_ENV === "development") {
            console.error("[DEV] addArtist error:", error.message);
          }
          if (data) {
            setArtists(prev => prev.map(a => a.id === tempId ? { ...a, id: data.id } : a));
          }
        });
    }
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

      <main className="flex-1 overflow-y-auto p-6 md:p-8">
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
              <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
                Add your first artist to start building your roster.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] shadow-[0_4px_16px_rgba(108,92,231,0.35)] hover:shadow-[0_6px_24px_rgba(108,92,231,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Add your first artist
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl">
            <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#F1F5F9]">
                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Artist</th>
                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8] hidden sm:table-cell">Genre</th>
                  </tr>
                </thead>
                <tbody>
                  {artists.map((a) => (
                    <tr key={a.id} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: a.color }}>
                            {a.initials}
                          </div>
                          <span className="font-semibold text-sm text-[#0B0F19]">{a.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#64748B] hidden sm:table-cell">{a.genre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

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
            <form onSubmit={handleAdd} className="px-6 py-5 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#474554] mb-1.5 tracking-wide">Artist Name *</label>
                <input autoFocus type="text" placeholder="e.g. Luna Rivers" value={name} onChange={e => setName(e.target.value)} required className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#474554] mb-1.5 tracking-wide">Genre</label>
                <input type="text" placeholder="e.g. Electronic / House" value={genre} onChange={e => setGenre(e.target.value)} className={inputCls} />
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
                <button type="submit" className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] shadow-[0_4px_12px_rgba(108,92,231,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">Add Artist</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
