'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { CommandPalette } from './CommandPalette';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const navLinks = [
    { label: "mcp", href: "/mcp" },
    { label: "prompts", href: "/" },
    { label: "apps", href: "/apps" },
    { label: "skills", href: "/skills" },
    { label: "backgrounds", href: "/backgrounds" },
    { label: "sections", href: "/sections" },
    { label: "3d", href: "/3d-websites" },
    { label: "top", href: "/top" },
    { label: "restyle", href: "/restyle" },
    { label: "submit", href: "/submit" },
    { label: "contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-[var(--z-sticky-nav)] h-14 w-full border-b border-rule bg-paper/95 backdrop-blur-md">
        <div className="max-w-[var(--container)] mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-4">
          
          {/* Left — Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-accent outline-offset-2"
          >
            <div className="w-7 h-7 rounded-pill bg-paper-2 border border-rule flex items-center justify-center p-1">
              <img
                src="/logo-white.png"
                alt="Axes Lab"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-display font-medium text-ink">
                Axes Lab
              </span>
              <span className="text-xs text-muted px-1.5 py-0.5 rounded-pill bg-paper-2 border border-rule">
                registry
              </span>
            </div>
          </Link>

          {/* Center: Clean Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs px-2.5 py-1 rounded-pill transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
                    isActive
                      ? "text-ink bg-paper-2 border border-rule-2 font-medium"
                      : "text-muted hover:text-ink hover:bg-paper-2"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search & Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-pill bg-paper-2 border border-rule text-xs text-muted hover:text-ink hover:border-rule-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              title="Search directory (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-muted" />
              <span className="hidden sm:inline font-sans">Search</span>
              <kbd className="hidden sm:inline font-mono text-xs text-muted px-1 bg-paper-3 rounded border border-rule">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/mcp"
              className="hidden sm:inline-flex items-center gap-1 text-xs px-3 py-1 rounded-pill bg-accent text-accent-ink font-medium hover:opacity-90 active:opacity-100 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>Install MCP</span>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-pill text-muted hover:text-ink bg-paper-2 border border-rule focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-14 z-[var(--z-modal)] bg-paper/98 border-b border-rule p-4 lg:hidden space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-pill text-sm text-ink hover:bg-paper-2 transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-rule">
            <Link
              href="/mcp"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2 rounded-pill bg-accent text-accent-ink text-sm font-medium"
            >
              Install MCP Server
            </Link>
          </div>
        </div>
      )}

      {/* Command Palette */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
