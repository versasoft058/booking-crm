"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-[#0B0F19]/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((c) => !c)}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main area */}
      <div
        className={`flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300 ${
          collapsed ? "md:ml-[72px]" : "md:ml-64"
        }`}
      >
        {/* Mobile topbar hamburger */}
        <div className="md:hidden flex items-center gap-3 px-4 h-14 bg-white shadow-[0_1px_0_rgba(15,23,42,0.06)] flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F1F5F9] transition-colors"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 5h15M2.5 10h15M2.5 15h15" stroke="#0B0F19" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <span className="font-display font-extrabold text-[#0B0F19] tracking-tight">
            Kinetic<span className="text-[#6C5CE7]">CRM</span>
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}
