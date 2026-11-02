'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Search, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { CommandPalette } from './CommandPalette';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const navLinks = [
    { label: "MCP", href: "/mcp", isMCP: true },
    { label: "Prompts", href: "/" },
    { label: "Apps", href: "/apps" },
    { label: "Skills", href: "/skills" },
    { label: "Backgrounds", href: "/backgrounds" },
    { label: "Sections", href: "/sections" },
    { label: "3D", href: "/3d-websites" },
    { label: "TOP", href: "/top" },
    { label: "Restyle", href: "/restyle" },
    { label: "Submit", href: "/submit" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 h-16 w-full border-b border-white/[0.07] bg-[#050507]/80 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Left — Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            {/* Official Axes Lab Brand Icon */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1px] shadow-glow flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-[#050507] rounded-[11px] flex items-center justify-center overflow-hidden p-1.5">
                <img
                  src="/logo-white.png"
                  alt="Axes Lab Logo"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white">Axes Lab</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-300 border border-white/[0.1]">
                AI
              </span>
            </div>
          </Link>

          {/* Center — Primary Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white/[0.09] text-white border border-white/[0.12]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.isMCP && (
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right — Search Trigger & Action (Zero Auth) */}
          <div className="flex items-center gap-3">
            {/* Cmd+K Search Trigger */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-full px-3.5 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-2.5 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Search library...</span>
              <kbd className="hidden sm:inline font-mono text-[10px] bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 rounded text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Connect MCP Primary Action Pill */}
            <Link
              href="/mcp"
              className="hidden sm:inline-flex items-center gap-1.5 bg-white text-black hover:bg-zinc-200 font-semibold text-xs px-4 py-2 rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <span>Connect MCP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#050507]/95 backdrop-blur-2xl p-6 lg:hidden flex flex-col justify-between overflow-y-auto">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.05] text-zinc-300 hover:text-white font-medium text-sm"
              >
                <div className="flex items-center gap-2">
                  {link.isMCP && <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />}
                  <span>{link.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600" />
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-white/[0.08]">
            <Link
              href="/mcp"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold text-sm py-3 rounded-xl shadow-lg"
            >
              <span>Install Open MCP Server →</span>
            </Link>
          </div>
        </div>
      )}

      {/* Global Command Palette */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
