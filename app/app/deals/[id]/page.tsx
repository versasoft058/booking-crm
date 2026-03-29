"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { COLUMNS, formatCurrency, DealStatus } from "@/lib/mockData";
import { supabase } from "@/lib/supabaseClient";
import { useApp } from "@/lib/AppContext";

interface ArtistRow {
  id: string;
  name: string;
  color: string;
  genre: string;
}

function toInitials(name: string) {
  return name.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function DealDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { deals, loading: ctxLoading } = useApp();
  const [artists, setArtists] = useState<ArtistRow[]>([]);
  const [artistsLoading, setArtistsLoading] = useState(true);

  // Find deal in context (already fetched from Supabase on app mount)
  const deal = deals.find(d => d.id === id) ?? null;

  useEffect(() => {
    if (!id) return;
    async function loadArtists() {
      try {
        const { data, error } = await supabase
          .from("deal_artists")
          .select("artists(*)")
          .eq("deal_id", id);

        if (error) {
          // Table may not exist yet — that's fine, just show no artists
          console.warn("[DealDetail] deal_artists fetch:", error.message);
        } else {
          setArtists(
            (data ?? [])
              .map((row: { artists: ArtistRow | ArtistRow[] | null }) =>
                Array.isArray(row.artists) ? row.artists[0] : row.artists
              )
              .filter(Boolean) as ArtistRow[]
          );
        }
      } catch (e) {
        console.warn("[DealDetail] deal_artists exception:", e);
      }
      setArtistsLoading(false);
    }
    loadArtists();
  }, [id]);

  // Wait for context to finish loading
  if (ctxLoading || artistsLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#6C5CE7] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-[#64748B]">Deal not found.</p>
        <Link href="/app" className="text-sm font-semibold text-[#6C5CE7] hover:underline">
          ← Back to pipeline
        </Link>
      </div>
    );
  }

  const col = COLUMNS.find(c => c.id === deal.status) ?? COLUMNS[0];
  const createdDate = deal.createdAt
    ? new Date(deal.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "—";
  const createdShort = deal.createdAt
    ? new Date(deal.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "—";

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
        {/* Main */}
        <div className="md:col-span-2 flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-3">Description</h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              {deal.description || "No description yet."}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-4">Activity</h2>
            <div className="flex gap-3">
              <span className="text-[#6C5CE7] text-sm mt-0.5">✦</span>
              <div>
                <p className="text-sm text-[#0B0F19]">Deal created</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">{createdDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-4">Deal Details</h2>
            <dl className="flex flex-col gap-3">
              {([
                { label: "Value", value: formatCurrency(deal.value) },
                { label: "Client", value: deal.client || "—" },
                { label: "Stage", value: col.label },
                { label: "Created", value: createdShort },
              ] as { label: string; value: string }[]).map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start gap-2">
                  <dt className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">{label}</dt>
                  <dd className="text-sm font-semibold text-[#0B0F19] text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.06)] p-6">
            <h2 className="font-display font-bold text-[#0B0F19] mb-4">Artists</h2>
            {artists.length === 0 ? (
              <p className="text-sm text-[#94A3B8]">No artists linked</p>
            ) : (
              <div className="flex flex-col gap-3">
                {artists.map(a => (
                  <Link key={a.id} href={`/app/artists/${a.id}`} className="flex items-center gap-3 group">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: a.color ?? "#6C5CE7" }}
                    >
                      {toInitials(a.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0B0F19] group-hover:text-[#6C5CE7] transition-colors truncate">{a.name}</p>
                      {a.genre && a.genre !== "—" && <p className="text-xs text-[#94A3B8] truncate">{a.genre}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            )}
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
