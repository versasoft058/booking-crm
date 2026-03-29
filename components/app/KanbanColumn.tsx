"use client";

import { Deal, ColumnConfig, formatCurrency } from "@/lib/mockData";
import DealCard from "./DealCard";

interface KanbanColumnProps {
  config: ColumnConfig;
  deals: Deal[];
  draggedId: string | null;
  isDragOver: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onAddDeal?: () => void;
  onEdit: (deal: Deal) => void;
  onDelete: (id: string) => void;
}

export default function KanbanColumn({
  config, deals, draggedId, isDragOver,
  onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop,
  onAddDeal, onEdit, onDelete,
}: KanbanColumnProps) {
  const totalValue = deals.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex flex-col w-[300px] flex-shrink-0">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${config.dotClass}`} />
        <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#64748B]">{config.label}</span>
        <span className="bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{deals.length}</span>
        {deals.length > 0 && (
          <span className="ml-auto text-[10px] font-semibold text-[#94A3B8]">{formatCurrency(totalValue)}</span>
        )}
        <button
          onClick={onAddDeal}
          className="w-6 h-6 rounded-md flex items-center justify-center text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#6C5CE7] transition-colors"
          title="Add deal"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`flex flex-col gap-3 flex-1 min-h-[120px] rounded-xl p-2 transition-all duration-150 ${isDragOver ? config.dropBg : "bg-transparent"}`}
        style={isDragOver ? { boxShadow: `inset 0 0 0 2px ${config.color}30` } : undefined}
      >
        {deals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            isDragging={draggedId === deal.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

        {deals.length === 0 && !isDragOver && (
          <div className="flex flex-col items-center justify-center flex-1 py-8 opacity-50">
            <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center mb-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="4" width="14" height="11" rx="2" stroke="#94A3B8" strokeWidth="1.5" />
                <path d="M6 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="#94A3B8" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="text-xs text-[#94A3B8] font-medium">No deals</p>
            <p className="text-[10px] text-[#C8C4D7] mt-0.5">Drop cards here</p>
          </div>
        )}

        {isDragOver && (
          <div
            className="flex items-center justify-center rounded-xl border-2 border-dashed py-4 transition-all"
            style={{ borderColor: `${config.color}50`, backgroundColor: `${config.color}08` }}
          >
            <p className="text-xs font-semibold" style={{ color: config.color }}>Drop here</p>
          </div>
        )}
      </div>
    </div>
  );
}
