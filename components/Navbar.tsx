"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "./Container";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(15,23,42,0.06)]"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#22D3EE] flex items-center justify-center text-white font-bold text-sm shadow-[0_2px_8px_rgba(108,92,231,0.35)]">
              K
            </span>
            <span className="font-display font-extrabold text-[#0B0F19] tracking-tight text-lg leading-none">
              Kinetic<span className="text-[#6C5CE7]">CRM</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-[#64748B] hover:text-[#0B0F19] transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-[#64748B] hover:text-[#0B0F19] px-4 py-2 rounded-lg hover:bg-[#F1F5F9] transition-all duration-150"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg font-semibold text-sm px-5 py-2.5 bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white shadow-[0_4px_16px_rgba(108,92,231,0.35)] hover:shadow-[0_6px_24px_rgba(108,92,231,0.45)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200"
            >
              Start free trial
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F1F5F9] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="flex flex-col gap-1.5 w-5">
              <span className={`h-0.5 bg-[#0B0F19] rounded transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 bg-[#0B0F19] rounded transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-[#0B0F19] rounded transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </span>
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#F1F5F9] py-4">
          <Container>
            <ul className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block py-2 text-sm font-medium text-[#64748B] hover:text-[#0B0F19] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/login"
                  className="block py-2 text-sm font-medium text-[#64748B] hover:text-[#0B0F19] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Log in
                </Link>
              </li>
            </ul>
            <Link
              href="/register"
              className="flex items-center justify-center w-full rounded-lg font-semibold text-sm px-5 py-3 bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white shadow-[0_4px_16px_rgba(108,92,231,0.35)] transition-all duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Start free trial
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
