"use client";

import { useState } from "react";

interface TopbarProps {
  title: string;
  ctaLabel?: string;
  onAddDeal?: () => void;
  totalDeals?: number;
  pipelineValue?: number;
}

export default function Topbar({ title, ctaLabel = "Add New Deal", onAddDeal, totalDeals, pipelineValue }: TopbarProps) {
  const [search, setSearch] = useState("");

  const fmt = (v: number) =>
    v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`;

  return (
    <header className="flex-shrink-0 bg-white shadow-[0_1px_0_rgba(15,23,42,0.06)] z-10">
      <div className="flex items-center gap-4 px-5 md:px-8 h-16">
        {/* Title */}
        <div className="flex items-center gap-4 min-w-0">
          <h1 className="font-display font-extrabold text-lg text-[#0B0F19] tracking-tight hidden md:block">{title}</h1>
          {totalDeals !== undefined && (
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-[#94A3B8] text-sm">/</span>
              <span className="text-sm text-[#64748B]"><span className="font-semibold text-[#0B0F19]">{totalDeals}</span> deals</span>
              {pipelineValue !== undefined && (
                <>
                  <span className="text-[#94A3B8] text-sm">·</span>
                  <span className="text-sm text-[#64748B]"><span className="font-semibold text-[#6C5CE7]">{fmt(pipelineValue)}</span> pipeline</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="flex-1 max-w-sm relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 bg-[#F2F4F6] rounded-lg text-sm text-[#0B0F19] placeholder:text-[#94A3B8] outline-none focus:ring-2 focus:ring-[#6C5CE7]/20 focus:bg-white transition-all"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Bell */}
          <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0B0F19] transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2a5 5 0 0 0-5 5v2l-1.5 2.5h13L14 9V7a5 5 0 0 0-5-5ZM7 14.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#6C5CE7] border-2 border-white" />
          </button>

          {/* CTA — desktop */}
          {onAddDeal && (
            <button
              onClick={onAddDeal}
              className="hidden sm:flex items-center gap-2 h-9 px-4 rounded-lg bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white text-sm font-bold shadow-[0_4px_12px_rgba(108,92,231,0.3)] hover:shadow-[0_6px_20px_rgba(108,92,231,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5v11M1.5 7h11" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {ctaLabel}
            </button>
          )}

          {/* CTA — mobile icon only */}
          {onAddDeal && (
            <button
              onClick={onAddDeal}
              className="sm:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white shadow-[0_4px_12px_rgba(108,92,231,0.3)]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5v11M1.5 7h11" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#22D3EE] flex items-center justify-center text-white text-xs font-bold ml-1">
            AK
          </div>
        </div>
      </div>
    </header>
  );
}
