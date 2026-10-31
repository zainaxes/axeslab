"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sparkles, Terminal, Menu, X, ArrowUpRight } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (e.key === "/" &&
          !(
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement ||
            (e.target as HTMLElement)?.isContentEditable
          )) ||
        ((e.metaKey || e.ctrlKey) && e.key === "k")
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: "Prompts & UI", href: "/web-design" },
    { name: "Explore All", href: "/explore" },
    { name: "Agent Skills", href: "/skills" },
    { name: "MCP Servers", href: "/mcp" },
    { name: "Models", href: "/models" },
    { name: "Collections", href: "/collections" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#07070A]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 sm:h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Wordmark & Live Beacon */}
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-300 group-hover:scale-105 group-hover:border-sky-400/50 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                <Terminal className="h-4 w-4 text-sky-400" />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wider text-white">AXES LAB</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 group-hover:text-sky-300 transition-colors">
                  AI Resource Directory
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-1 sm:flex pl-4 border-l border-white/10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                      isActive
                        ? "bg-white/10 text-white font-semibold shadow-xs"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Suite */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-zinc-300 hover:border-white/30 hover:bg-white/10 transition-all shadow-xs"
              title="Search directory (Cmd+K)"
            >
              <Search className="h-3.5 w-3.5 text-zinc-400" />
              <span>Search</span>
              <kbd className="rounded border border-white/15 bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Platform Official Link CTA */}
            <a
              href="https://axeslab.zainaxes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-950/40 px-3.5 py-1.5 font-mono text-xs font-semibold text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.15)] backdrop-blur-md transition-all hover:bg-sky-900/40 hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]"
            >
              <span>axeslab.zainaxes.com</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white sm:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#07070A] p-4 sm:hidden space-y-2">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3 text-xs text-zinc-300"
            >
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Directory
              </span>
              <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Global Command Palette / Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
