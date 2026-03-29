import { AppProvider } from "@/lib/AppContext";
import AppShell from "@/components/app/AppShell";
import AuthGuard from "@/components/app/AuthGuard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AuthGuard>
        <AppShell>{children}</AppShell>
      </AuthGuard>
    </AppProvider>
  );
}
