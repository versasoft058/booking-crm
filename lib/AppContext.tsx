"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Deal, DealStatus, formatCurrency } from "./mockData";
import { supabase } from "./supabaseClient";

export interface Client {
  id: string;
  name: string;
  initials: string;
  color: string;
  email?: string;
  phone?: string;
  contact_person?: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  initials: string;
  color: string;
  email?: string;
  phone?: string;
}

interface AppContextValue {
  clients: Client[];
  deals: Deal[];
  artists: Artist[];
  loading: boolean;
  addClient: (name: string, color: string, email?: string, phone?: string, contact_person?: string) => Client;
  addArtist: (name: string, genre: string, color: string, email?: string, phone?: string) => Artist;
  addDeal: (data: { name: string; client: string; value: number; status: DealStatus; description: string; artistIds?: string[] }) => Promise<string | null>;
  updateDeal: (deal: Deal) => void;
  deleteDeal: (id: string) => void;
  reorderDeals: (updates: { id: string; position: number }[]) => Promise<void>;
  updateDealArtists: (dealId: string, newArtistIds: string[]) => Promise<void>;
  formatCurrency: (v: number) => string;
}

const AppContext = createContext<AppContextValue | null>(null);

function toInitials(name: string) {
  return name.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function toDbStatus(s: DealStatus): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function fromDbStatus(s: string): DealStatus {
  return s.toLowerCase() as DealStatus;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      setUserId(user.id);

      const [
        { data: dealsData, error: dealsErr },
        { data: clientsData, error: clientsErr },
        { data: artistsData, error: artistsErr },
      ] = await Promise.all([
        supabase.from("deals").select("*").eq("user_id", user.id)
          .order("position", { ascending: true })
          .order("created_at", { ascending: false }),
        supabase.from("clients").select("*").eq("user_id", user.id),
        supabase.from("artists").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);

      if (dealsErr) console.error("[AppContext] Fetch deals error:", dealsErr.message);
      if (clientsErr) console.error("[AppContext] Fetch clients error:", clientsErr.message);
      if (artistsErr) console.error("[AppContext] Fetch artists error:", artistsErr.message);

      if (dealsData) {
        setDeals(dealsData.map(d => ({
          id: d.id,
          name: d.name,
          client: d.client_name ?? "",
          value: Number(d.value) ?? 0,
          status: fromDbStatus(d.status),
          description: d.description ?? "",
          assignees: [],
          createdAt: d.created_at?.split("T")[0] ?? "",
          tags: [],
          position: d.position ?? 0,
        })));
      }

      if (clientsData) {
        setClients(clientsData.map(c => ({
          id: c.id,
          name: c.name,
          initials: toInitials(c.name),
          color: c.color ?? "#6C5CE7",
          email: c.email ?? undefined,
          phone: c.phone ?? undefined,
          contact_person: c.contact_person ?? undefined,
        })));
      }

      if (artistsData) {
        setArtists(artistsData.map(a => ({
          id: a.id,
          name: a.name,
          genre: a.genre ?? "—",
          initials: toInitials(a.name),
          color: a.color ?? "#6C5CE7",
          email: a.email ?? undefined,
          phone: a.phone ?? undefined,
        })));
      }

      setLoading(false);
    }
    load();
  }, []);

  const addClient = useCallback((name: string, color: string, email?: string, phone?: string, contact_person?: string): Client => {
    const tempId = `c${Date.now()}`;
    const newClient: Client = { id: tempId, name: name.trim(), initials: toInitials(name), color, email, phone, contact_person };
    setClients(prev => [...prev, newClient]);

    if (userId) {
      supabase.from("clients")
        .insert({ name: name.trim(), color, email: email || null, phone: phone || null, contact_person: contact_person || null, user_id: userId })
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) console.error("[addClient] insert error:", error.message);
          if (data) setClients(prev => prev.map(c => c.id === tempId ? { ...c, id: data.id } : c));
        });
    }

    return newClient;
  }, [userId]);

  const addArtist = useCallback((name: string, genre: string, color: string, email?: string, phone?: string): Artist => {
    const tempId = `a${Date.now()}`;
    const newArtist: Artist = { id: tempId, name: name.trim(), genre: genre.trim() || "—", initials: toInitials(name), color, email, phone };
    setArtists(prev => [newArtist, ...prev]);

    if (userId) {
      supabase.from("artists")
        .insert({ name: name.trim(), genre: genre.trim() || "", color, email: email || null, phone: phone || null, user_id: userId })
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) console.error("[addArtist] insert error:", error.message);
          if (data) setArtists(prev => prev.map(a => a.id === tempId ? { ...a, id: data.id } : a));
        });
    }

    return newArtist;
  }, [userId]);

  const addDeal = useCallback(async (data: {
    name: string;
    client: string;
    value: number;
    status: DealStatus;
    description: string;
    artistIds?: string[];
  }): Promise<string | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log("[addDeal] auth user:", user);

    if (!user) {
      const msg = "No authenticated user — aborting insert";
      console.error("[addDeal]", msg);
      return msg;
    }

    const payload = {
      name: data.name,
      client_name: data.client,
      value: data.value,
      status: toDbStatus(data.status),
      user_id: user.id,
      position: 0,
    };
    console.log("[addDeal] insert payload:", payload);

    const { data: inserted, error } = await supabase
      .from("deals")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("[addDeal] insert error:", error.message, error);
      return error.message;
    }

    console.log("[addDeal] insert success:", inserted);

    const artistIds = data.artistIds?.filter(Boolean) ?? [];
    if (artistIds.length > 0) {
      const { error: linkError } = await supabase.from("deal_artists").insert(
        artistIds.map(artistId => ({ deal_id: inserted.id, artist_id: artistId, user_id: user.id }))
      );
      if (linkError) console.error("[addDeal] deal_artists insert error:", linkError.message);
    }

    const today = new Date().toISOString().split("T")[0];
    setDeals(prev => [
      {
        id: inserted.id,
        name: inserted.name,
        client: inserted.client_name ?? "",
        value: Number(inserted.value) ?? 0,
        status: fromDbStatus(inserted.status),
        description: inserted.description ?? "",
        assignees: [],
        createdAt: inserted.created_at?.split("T")[0] ?? today,
        tags: [],
        position: inserted.position ?? 0,
      },
      ...prev,
    ]);

    return null;
  }, []);

  const updateDeal = useCallback((updated: Deal) => {
    setDeals(prev => prev.map(d => d.id === updated.id ? updated : d));
    supabase.from("deals")
      .update({
        status: toDbStatus(updated.status),
        name: updated.name,
        client_name: updated.client,
        value: updated.value,
        description: updated.description,
        position: updated.position,
      })
      .eq("id", updated.id)
      .then(({ error }) => {
        if (error) console.error("[updateDeal] error:", error.message);
      });
  }, []);

  const deleteDeal = useCallback((id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id));
    supabase.from("deals")
      .delete()
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("[deleteDeal] error:", error.message);
      });
  }, []);

  const reorderDeals = useCallback(async (updates: { id: string; position: number }[]) => {
    setDeals(prev => {
      const map = new Map(updates.map(u => [u.id, u.position]));
      return prev
        .map(d => map.has(d.id) ? { ...d, position: map.get(d.id)! } : d)
        .sort((a, b) => a.position - b.position);
    });
    await Promise.all(
      updates.map(u => supabase.from("deals").update({ position: u.position }).eq("id", u.id))
    );
  }, []);

  const updateDealArtists = useCallback(async (dealId: string, newArtistIds: string[]) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("deal_artists").delete().eq("deal_id", dealId);
    if (newArtistIds.length > 0) {
      await supabase.from("deal_artists").insert(
        newArtistIds.map(artistId => ({ deal_id: dealId, artist_id: artistId, user_id: user.id }))
      );
    }
  }, []);

  return (
    <AppContext.Provider value={{ clients, deals, artists, loading, addClient, addArtist, addDeal, updateDeal, deleteDeal, reorderDeals, updateDealArtists, formatCurrency }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
