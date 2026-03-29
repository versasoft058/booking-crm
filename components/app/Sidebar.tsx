"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/app",
    label: "Deals",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/app/clients",
    label: "Clients",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="15" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17.5 17c0-2.485-1.12-4.5-2.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/app/artists",
    label: "Artists",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M9 4v8a3 3 0 1 1-1.5-2.6V7l6-1.5v2.3A3 3 0 1 1 12 10.3V5.2L9 6V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/app/calendar",
    label: "Calendar",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="7" cy="12" r="1" fill="currentColor" />
        <circle cx="10" cy="12" r="1" fill="currentColor" />
        <circle cx="13" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "/app/settings",
    label: "Settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 2.5a1 1 0 0 1 1 1v.9a5.5 5.5 0 0 1 1.7.7l.64-.63a1 1 0 0 1 1.41 0l.72.72a1 1 0 0 1 0 1.41l-.63.64c.3.54.52 1.12.62 1.74l.9.01a1 1 0 0 1 1 1v1.02a1 1 0 0 1-1 1h-.9a5.5 5.5 0 0 1-.7 1.7l.63.64a1 1 0 0 1 0 1.41l-.72.72a1 1 0 0 1-1.41 0l-.64-.63a5.5 5.5 0 0 1-1.74.62v.9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-.9a5.5 5.5 0 0 1-1.7-.7l-.64.63a1 1 0 0 1-1.41 0l-.72-.72a1 1 0 0 1 0-1.41l.63-.64a5.5 5.5 0 0 1-.62-1.74H2.5a1 1 0 0 1-1-1V9.98a1 1 0 0 1 1-1h.9c.1-.62.3-1.2.62-1.74l-.63-.64a1 1 0 0 1 0-1.41l.72-.72a1 1 0 0 1 1.41 0l.64.63A5.5 5.5 0 0 1 7.9 4.4V3.5a1 1 0 0 1 1-1H10Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCollapse: () => void;
  onMobileClose: () => void;
}

export default function Sidebar({ collapsed, mobileOpen, onCollapse, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/app" ? pathname === "/app" : pathname.startsWith(href);

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-30 flex flex-col bg-white shadow-[2px_0_16px_rgba(15,23,42,0.06)] transition-all duration-300
        ${collapsed ? "w-[72px]" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Brand */}
      <div className={`flex items-center gap-3 px-4 h-16 flex-shrink-0 ${collapsed ? "justify-center px-0" : ""}`}>
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#22D3EE] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-[0_2px_8px_rgba(108,92,231,0.35)]">
            K
          </span>
          {!collapsed && (
            <span className="font-display font-extrabold text-[#0B0F19] tracking-tight text-base leading-none truncate">
              Kinetic<span className="text-[#6C5CE7]">CRM</span>
            </span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onMobileClose}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150 group relative
                    ${active
                      ? "bg-[#6C5CE7]/10 text-[#6C5CE7]"
                      : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0B0F19]"
                    }
                    ${collapsed ? "justify-center px-0" : ""}
                  `}
                >
                  <span className={`flex-shrink-0 ${active ? "text-[#6C5CE7]" : "text-[#94A3B8] group-hover:text-[#0B0F19]"} transition-colors`}>
                    {item.icon}
                  </span>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {active && !collapsed && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6C5CE7]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer: collapse button + new deal */}
      <div className={`flex flex-col gap-2 p-3 border-t border-[#F1F5F9] flex-shrink-0`}>
        {!collapsed && (
          <Link
            href="/app"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white text-sm font-bold shadow-[0_4px_12px_rgba(108,92,231,0.3)] hover:shadow-[0_6px_20px_rgba(108,92,231,0.4)] hover:scale-[1.02] transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            New Deal
          </Link>
        )}
        <button
          onClick={onCollapse}
          className="hidden md:flex items-center justify-center w-full h-9 rounded-xl text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#0B0F19] transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          >
            <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
