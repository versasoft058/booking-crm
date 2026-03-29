"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { COLUMNS, formatCurrency, DealStatus } from "@/lib/mockData";
import { supabase } from "@/lib/supabaseClient";

interface ArtistRow {
  id: string;
  name: string;
  genre: string;
  color: string;
  created_at: string;
}

interface DealRow {
  id: string;
  name: string;
  client_name: string;
  value: number;
  status: string;
}

function toInitials(name: string) {
  return name.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function fromDbStatus(s: string): DealStatus {
  return s.toLowerCase() as DealStatus;
}

export default function ArtistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<ArtistRow | null>(null);
  const [deals, setDeals] = useState<DealRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function load() {
      const [{ data: artistData, error: artistErr }, { data: linkData }] = await Promise.all([
        supabase.from("artists").select("*").eq("id", id).single(),
        supabase.from("deal_artists").select("deals(*)").eq("artist_id", id),
      ]);

      if (artistErr || !artistData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setArtist(artistData);
      setDeals(
        (linkData ?? [])
          .map((row: { deals: DealRow | DealRow[] | null }) =>
            Array.isArray(row.deals) ? row.deals[0] : row.deals
          )
          .filter(Boolean) as DealRow[]
      );
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#6C5CE7] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (notFound || !artist) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-[#64748B]">Artist not found.</p>
        <Link href="/app/artists" className="text-sm font-semibold text-[#6C5CE7] hover:underline">
          ← Back to Artists
        </Link>
      </div>
    );
  }

  const createdDate = artist.created_at
    ? new Date(artist.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "—";

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="flex-shrink-0 bg-white shadow-[0_1px_0_rgba(15,23,42,0.06)] px-6 md:px-8 py-5">
        <Link
          href="/app/artists"
          className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#6C5CE7] transition-colors mb-3"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Artists
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: artist.color ?? "#6C5CE7" }}
          >
            {toInitials(artist.name)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl font-extrabold text-[#0B0F19] tracking-tight">{artist.name}</h1>
            {artist.genre && artist.genre !== "—" && (
              <span className="inline-block mt-1 text-xs font-semibold text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full">
                {artist.genre}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
        {/* Deals list — main column */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#F1F5F9]">
              <h2 className="font-display font-bold text-[#0B0F19]">Deals</h2>
            </div>
            {deals.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-sm text-[#94A3B8]">No deals linked yet</p>
              </div>
            ) : (
              <div className="divide-y divide-[#F1F5F9]">
                {deals.map(d => {
                  const status = fromDbStatus(d.status);
                  const col = COLUMNS.find(c => c.id === status) ?? COLUMNS[0];
                  return (
                    <Link
                      key={d.id}
                      href={`/app/deals/${d.id}`}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8FAFC] transition-colors group"
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${col.dotClass}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#0B0F19] group-hover:text-[#6C5CE7] transition-colors truncate">
                          {d.name}
                        </p>
                        <p className="text-xs text-[#64748B] truncate">{d.client_name}</p>
                      </div>
                      <span className="font-display font-extrabold text-sm text-[#0B0F19] flex-shrink-0">
                        {formatCurrency(Number(d.value))}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${col.badgeBg} ${col.badgeText}`}>
                        {col.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar — artist details */}
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-4">Artist Details</h2>
            <dl className="flex flex-col gap-3">
              {([
                { label: "Genre", value: artist.genre && artist.genre !== "—" ? artist.genre : "—" },
                { label: "Deals", value: String(deals.length) },
                { label: "Added", value: createdDate },
              ] as { label: string; value: string }[]).map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start gap-2">
                  <dt className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">{label}</dt>
                  <dd className="text-sm font-semibold text-[#0B0F19] text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: artist.color ?? "#6C5CE7" }}>
            <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2">Artist</p>
            <p className="font-display text-xl font-extrabold tracking-tight leading-snug">{artist.name}</p>
            {artist.genre && artist.genre !== "—" && (
              <p className="text-xs opacity-70 mt-1">{artist.genre}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
