"use client";

import { useState, useCallback } from "react";
import { COLUMNS, Deal, DealStatus } from "@/lib/mockData";
import { useApp } from "@/lib/AppContext";
import KanbanColumn from "./KanbanColumn";
import AddDealModal from "./AddDealModal";
import Topbar from "./Topbar";

export default function KanbanBoard() {
  const { deals, deleteDeal, updateDeal, loading } = useApp();

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<DealStatus | null>(null);
  const [modal, setModal] = useState<null | { mode: "add"; status: DealStatus } | { mode: "edit"; deal: Deal }>(null);

  const handleDragStart = useCallback((id: string) => setDraggedId(id), []);
  const handleDragEnd = useCallback(() => { setDraggedId(null); setDragOverCol(null); }, []);
  const handleDragOver = useCallback((e: React.DragEvent, col: DealStatus) => {
    e.preventDefault(); e.dataTransfer.dropEffect = "move"; setDragOverCol(col);
  }, []);
  const handleDragLeave = useCallback(() => setDragOverCol(null), []);
  const handleDrop = useCallback((e: React.DragEvent, col: DealStatus) => {
    e.preventDefault();
    if (draggedId) {
      const deal = deals.find(d => d.id === draggedId);
      if (deal && deal.status !== col) updateDeal({ ...deal, status: col });
    }
    setDraggedId(null); setDragOverCol(null);
  }, [draggedId, deals, updateDeal]);

  const totalValue = deals.filter(d => d.status !== "lost").reduce((s, d) => s + d.value, 0);

  // Loading skeleton
  if (loading) {
    return (
      <>
        <Topbar title="Deals Dashboard" onAddDeal={() => setModal({ mode: "add", status: "lead" })} />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#6C5CE7] border-t-transparent animate-spin" />
        </main>
      </>
    );
  }

  // Empty state
  if (deals.length === 0) {
    return (
      <>
        <Topbar
          title="Deals Dashboard"
          onAddDeal={() => setModal({ mode: "add", status: "lead" })}
          totalDeals={0}
          pipelineValue={0}
        />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-[#6C5CE7]/10 flex items-center justify-center mx-auto mb-5">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="6" width="7" height="20" rx="2" fill="#6C5CE7" opacity="0.3" />
                <rect x="12.5" y="6" width="7" height="14" rx="2" fill="#6C5CE7" opacity="0.5" />
                <rect x="21" y="6" width="7" height="17" rx="2" fill="#6C5CE7" opacity="0.7" />
                <circle cx="25" cy="26" r="5" fill="#6C5CE7" />
                <path d="M23 26h4M25 24v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="font-display font-extrabold text-[#0B0F19] text-xl mb-2">No deals yet</h3>
            <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
              Start tracking your pipeline by adding your first deal.
            </p>
            <button
              onClick={() => setModal({ mode: "add", status: "lead" })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] shadow-[0_4px_16px_rgba(108,92,231,0.35)] hover:shadow-[0_6px_24px_rgba(108,92,231,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Add your first deal
            </button>
          </div>
        </main>
        <AddDealModal
          open={modal !== null}
          editDeal={modal?.mode === "edit" ? modal.deal : undefined}
          defaultStatus={modal?.mode === "add" ? modal.status : "lead"}
          onClose={() => setModal(null)}
        />
      </>
    );
  }

  return (
    <>
      <Topbar
        title="Deals Dashboard"
        onAddDeal={() => setModal({ mode: "add", status: "lead" })}
        totalDeals={deals.length}
        pipelineValue={totalValue}
      />

      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <div className="flex gap-5 p-5 md:p-6 min-w-max min-h-full">
            {COLUMNS.map(col => (
              <KanbanColumn
                key={col.id}
                config={col}
                deals={deals.filter(d => d.status === col.id)}
                draggedId={draggedId}
                isDragOver={dragOverCol === col.id}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={e => handleDragOver(e, col.id)}
                onDragLeave={handleDragLeave}
                onDrop={e => handleDrop(e, col.id)}
                onAddDeal={() => setModal({ mode: "add", status: col.id })}
                onEdit={deal => setModal({ mode: "edit", deal })}
                onDelete={deleteDeal}
              />
            ))}
          </div>
        </div>
      </main>

      <AddDealModal
        open={modal !== null}
        editDeal={modal?.mode === "edit" ? modal.deal : undefined}
        defaultStatus={modal?.mode === "add" ? modal.status : "lead"}
        onClose={() => setModal(null)}
      />
    </>
  );
}
