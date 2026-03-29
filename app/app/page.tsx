import KanbanBoard from "@/components/app/KanbanBoard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deals Dashboard — KineticCRM",
  description: "Manage your booking agency deal pipeline.",
};

export default function DealsPage() {
  return <KanbanBoard />;
}
