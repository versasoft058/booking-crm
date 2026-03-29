"use client";

import { useState, useEffect, useRef } from "react";
import { Deal, DealStatus, COLUMNS } from "@/lib/mockData";
import { useApp, Client } from "@/lib/AppContext";

const CLIENT_COLORS = ["#6C5CE7","#22D3EE","#10B981","#F59E0B","#0F172A","#EF4444"];

interface DealModalProps {
  open: boolean;
  editDeal?: Deal;
  defaultStatus?: DealStatus;
  onClose: () => void;
}

export default function AddDealModal({ open, editDeal, defaultStatus = "lead", onClose }: DealModalProps) {
  const { clients, artists, addClient, addDeal, updateDeal } = useApp();
  const isEdit = !!editDeal;

  const [name, setName] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<DealStatus>(defaultStatus);
  const [description, setDescription] = useState("");

  const [showNewClient, setShowNewClient] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientColor, setNewClientColor] = useState(CLIENT_COLORS[0]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);

  const clientByName = (n: string) => clients.find(c => c.name === n);

  useEffect(() => {
    if (!open) return;
    if (editDeal) {
      setName(editDeal.name);
      setSelectedClientId(clientByName(editDeal.client)?.id ?? "");
      setValue(editDeal.value > 0 ? String(editDeal.value) : "");
      setStatus(editDeal.status);
      setDescription(editDeal.description ?? "");
    } else {
      setName(""); setSelectedClientId(""); setValue(""); setStatus(defaultStatus); setDescription("");
    }
    setSelectedArtistIds([]);
    setShowNewClient(false); setNewClientName(""); setNewClientColor(CLIENT_COLORS[0]);
    setSubmitError(null); setSubmitting(false);
    setTimeout(() => nameRef.current?.focus(), 50);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editDeal?.id, defaultStatus]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const selectedClient: Client | undefined = clients.find(c => c.id === selectedClientId);

  const toggleArtist = (id: string) => {
    setSelectedArtistIds(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleCreateNewClient = () => {
    if (!newClientName.trim()) return;
    const created = addClient(newClientName.trim(), newClientColor);
    setSelectedClientId(created.id);
    setShowNewClient(false);
    setNewClientName(""); setNewClientColor(CLIENT_COLORS[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const clientName = selectedClient?.name ?? "";
    if (!clientName) return;

    const payload = { name: name.trim(), client: clientName, value: parseFloat(value) || 0, status, description: description.trim() };
    console.log("[AddDealModal] submit payload:", payload, "artistIds:", selectedArtistIds);

    if (isEdit && editDeal) {
      updateDeal({ ...editDeal, ...payload });
      onClose();
    } else {
      setSubmitting(true);
      setSubmitError(null);
      const error = await addDeal({ ...payload, artistIds: selectedArtistIds });
      setSubmitting(false);
      if (error) {
        console.error("[AddDealModal] addDeal failed:", error);
        setSubmitError(error);
        return;
      }
      onClose();
    }
  };

  const inputCls = "w-full bg-[#F2F4F6] rounded-lg px-4 py-2.5 text-sm text-[#191c1e] placeholder:text-[#787586] outline-none focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/25 transition-all duration-150";
  const labelCls = "block text-xs font-semibold text-[#474554] mb-1.5 tracking-wide";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-[#0B0F19]/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_24px_64px_rgba(15,23,42,0.18)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F1F5F9]">
          <div>
            <h2 className="font-display font-extrabold text-[#0B0F19] tracking-tight">
              {isEdit ? "Edit Deal" : "Add New Deal"}
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              {isEdit ? "Update the deal details below" : "Fill in the details to create a new deal"}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#0B0F19] transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          {/* Deal name */}
          <div>
            <label className={labelCls}>Deal Name *</label>
            <input ref={nameRef} type="text" placeholder="e.g. Coachella Headline Slot" value={name} onChange={e => setName(e.target.value)} required className={inputCls} />
          </div>

          {/* Client selector */}
          <div>
            <label className={labelCls}>Client / Agency *</label>
            {selectedClient ? (
              <div className="flex items-center gap-2 bg-[#F2F4F6] rounded-lg px-3 py-2.5">
                <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ backgroundColor: selectedClient.color }}>
                  {selectedClient.initials}
                </div>
                <span className="text-sm font-semibold text-[#0B0F19] flex-1">{selectedClient.name}</span>
                <button type="button" onClick={() => setSelectedClientId("")} className="text-xs text-[#64748B] hover:text-[#0B0F19] transition-colors">
                  Change
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <div className="bg-[#F2F4F6] rounded-lg overflow-hidden max-h-40 overflow-y-auto">
                  {clients.map(c => (
                    <button key={c.id} type="button" onClick={() => { setSelectedClientId(c.id); setShowNewClient(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white transition-colors text-left group">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ backgroundColor: c.color }}>
                        {c.initials}
                      </div>
                      <span className="text-sm text-[#0B0F19] group-hover:text-[#6C5CE7] transition-colors">{c.name}</span>
                    </button>
                  ))}
                </div>
                {!showNewClient ? (
                  <button type="button" onClick={() => setShowNewClient(true)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#6C5CE7] hover:bg-[#6C5CE7]/5 rounded-lg transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Create new client
                  </button>
                ) : (
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 flex flex-col gap-3">
                    <p className="text-xs font-bold text-[#0B0F19]">New client</p>
                    <input autoFocus type="text" placeholder="Agency or client name" value={newClientName}
                      onChange={e => setNewClientName(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleCreateNewClient(); }}}
                      className={inputCls} />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#64748B]">Colour:</span>
                      <div className="flex gap-1.5">
                        {CLIENT_COLORS.map(c => (
                          <button key={c} type="button" onClick={() => setNewClientColor(c)}
                            className={`w-5 h-5 rounded-full transition-all ${newClientColor === c ? "ring-2 ring-offset-1 ring-[#6C5CE7] scale-110" : "hover:scale-105"}`}
                            style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => { setShowNewClient(false); setNewClientName(""); }}
                        className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-[#64748B] bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors">Cancel</button>
                      <button type="button" onClick={handleCreateNewClient} disabled={!newClientName.trim()}
                        className="flex-1 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] disabled:opacity-40 transition-opacity">Add & Select</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Artists selector (multi-select, add only) */}
          {!isEdit && (
            <div>
              <label className={labelCls}>Artists</label>
              {artists.length === 0 ? (
                <p className="text-xs text-[#94A3B8] px-1">No artists yet — add some from the Artists tab</p>
              ) : (
                <div className="bg-[#F2F4F6] rounded-lg overflow-hidden max-h-40 overflow-y-auto">
                  {artists.map(a => {
                    const selected = selectedArtistIds.includes(a.id);
                    return (
                      <button key={a.id} type="button" onClick={() => toggleArtist(a.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left group ${selected ? "bg-[#6C5CE7]/8" : "hover:bg-white"}`}>
                        <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ backgroundColor: a.color }}>
                          {a.initials}
                        </div>
                        <span className={`text-sm flex-1 transition-colors ${selected ? "font-semibold text-[#6C5CE7]" : "text-[#0B0F19] group-hover:text-[#6C5CE7]"}`}>{a.name}</span>
                        {a.genre && a.genre !== "—" && <span className="text-[10px] text-[#94A3B8] hidden sm:block">{a.genre}</span>}
                        {selected && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#6C5CE7] flex-shrink-0">
                            <path d="M2.5 7l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Value */}
          <div>
            <label className={labelCls}>Deal Value</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#94A3B8]">$</span>
              <input type="number" min="0" placeholder="0" value={value} onChange={e => setValue(e.target.value)} className={`${inputCls} pl-8`} />
            </div>
          </div>

          {/* Stage */}
          <div>
            <label className={labelCls}>Stage</label>
            <select value={status} onChange={e => setStatus(e.target.value as DealStatus)} className={`${inputCls} cursor-pointer`}>
              {COLUMNS.map(col => <option key={col.id} value={col.id}>{col.label}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea rows={2} placeholder="Optional notes…" value={description} onChange={e => setDescription(e.target.value)} className={`${inputCls} resize-none`} />
          </div>

          {submitError && (
            <p className="text-sm text-[#ba1a1a] bg-[#ba1a1a]/8 rounded-lg px-3 py-2">{submitError}</p>
          )}

          <div className="flex gap-3 mt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-[#64748B] bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors">Cancel</button>
            <button type="submit" disabled={!selectedClient || submitting}
              className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] shadow-[0_4px_12px_rgba(108,92,231,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:scale-100">
              {submitting ? "Saving…" : isEdit ? "Save Changes" : "Add Deal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
