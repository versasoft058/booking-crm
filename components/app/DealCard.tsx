"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Deal, COLUMNS, formatCurrency } from "@/lib/mockData";

interface DealCardProps {
  deal: Deal;
  isDragging: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onEdit: (deal: Deal) => void;
  onDelete: (id: string) => void;
}

export default function DealCard({ deal, isDragging, onDragStart, onDragEnd, onEdit, onDelete }: DealCardProps) {
  const col = COLUMNS.find((c) => c.id === deal.status)!;
  const router = useRouter();
  const didDragRef = useRef(false);

  const handleClick = () => {
    if (didDragRef.current) { didDragRef.current = false; return; }
    router.push(`/app/deals/${deal.id}`);
  };

  return (
    <div
      draggable
      onClick={handleClick}
      onDragStart={(e) => {
        didDragRef.current = true;
        e.dataTransfer.effectAllowed = "move";
        onDragStart(deal.id);
      }}
      onDragEnd={onDragEnd}
      className={`group relative bg-white rounded-xl p-4 cursor-pointer select-none transition-all duration-200
        ${isDragging
          ? "opacity-40 scale-95 shadow-none cursor-grabbing"
          : "shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_24px_rgba(108,92,231,0.12)] hover:-translate-y-0.5"
        }`}
    >
      {/* Hover action buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(deal); }}
          title="Edit deal"
          className="w-7 h-7 rounded-lg flex items-center justify-center bg-white shadow-[0_2px_8px_rgba(15,23,42,0.10)] text-[#64748B] hover:text-[#6C5CE7] hover:bg-[#F1F5F9] transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M9 2.5l1.5 1.5L3 11.5H1.5V10L9 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 3.5l1.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(deal.id); }}
          title="Delete deal"
          className="w-7 h-7 rounded-lg flex items-center justify-center bg-white shadow-[0_2px_8px_rgba(15,23,42,0.10)] text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 3.5h9M5 3.5V2.5h3v1M5.5 6v3.5M7.5 6v3.5M3 3.5l.5 7h6l.5-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Accent bar */}
      <div className="h-0.5 w-8 rounded-full mb-3" style={{ backgroundColor: col.color }} />

      {/* Deal name */}
      <div className="pr-8 mb-1.5">
        <p className="font-display font-bold text-sm text-[#0B0F19] leading-snug line-clamp-2 group-hover:text-[#6C5CE7] transition-colors">
          {deal.name}
        </p>
      </div>

      {/* Client */}
      <p className="text-xs text-[#64748B] mb-3 truncate">{deal.client}</p>

      {/* Tags */}
      {deal.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {deal.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B]">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Value + Status */}
      <div className="flex items-center justify-between">
        <span className="font-display font-extrabold text-sm text-[#0B0F19]">
          {formatCurrency(deal.value)}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${col.badgeBg} ${col.badgeText}`}>
          {col.label}
        </span>
      </div>

      {/* Assignees + date */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F1F5F9]">
        <div className="flex -space-x-1.5">
          {deal.assignees.slice(0, 3).map((a, i) => (
            <div
              key={i}
              title={a.initials}
              className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
              style={{ backgroundColor: a.color }}
            >
              {a.initials[0]}
            </div>
          ))}
          {deal.assignees.length > 3 && (
            <div className="w-6 h-6 rounded-full border-2 border-white bg-[#F1F5F9] flex items-center justify-center text-[9px] font-bold text-[#64748B]">
              +{deal.assignees.length - 3}
            </div>
          )}
        </div>
        <span className="ml-auto text-[10px] text-[#94A3B8]">
          {new Date(deal.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
        </span>
      </div>
    </div>
  );
}
