"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bookmark, Send, Menu, X, Layers, Shield } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global keyboard shortcut '/' or 'Ctrl+K' / 'Cmd+K'
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
    { name: "Explore", href: "/explore" },
    { name: "Prompts", href: "/prompts" },
    { name: "Agent Skills", href: "/skills" },
    { name: "MCP Servers", href: "/mcp" },
    { name: "Models", href: "/models" },
    { name: "Collections", href: "/collections" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-canvas/95 backdrop-blur-sm border-b border-subtleBorder">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryText rounded-btn p-1"
            >
              <div className="w-8 h-8 rounded-btn bg-state-inverse text-state-inverseText flex items-center justify-center font-bold text-base tracking-tighter shadow-sm">
                AL
              </div>
              <div>
                <span className="font-bold text-lg text-primaryText tracking-tight block leading-tight">
                  Axes Lab
                </span>
                <span className="text-[10px] text-mutedText-secondary font-medium tracking-wide uppercase hidden sm:block">
                  Discover the tools behind AI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-btn transition-colors ${
                      isActive
                        ? "bg-state-selected text-primaryText font-bold"
                        : "text-mutedText-secondary hover:text-primaryText hover:bg-state-hover"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Search Trigger (Center/Right) */}
          <div className="flex-1 max-w-md mx-2 sm:mx-4">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-full h-10 px-3 sm:px-4 rounded-input border border-subtleBorder bg-surface-strong text-mutedText text-xs sm:text-sm flex items-center justify-between hover:border-subtleBorder-strong transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryText"
              aria-label="Open search dialog"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-4 h-4 text-mutedText flex-shrink-0" />
                <span className="truncate">Search prompts, skills, MCP servers...</span>
              </div>
              <kbd className="hidden sm:inline-block font-mono text-[10px] bg-canvas border border-subtleBorder px-1.5 py-0.5 rounded text-mutedText-secondary">
                /
              </kbd>
            </button>
          </div>

          {/* Right Action Links */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/saved"
              className="p-2 text-mutedText-secondary hover:text-primaryText hover:bg-state-hover rounded-btn transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Saved Resources"
              aria-label="Saved Resources"
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden md:inline">Saved</span>
            </Link>

            <Link
              href="/submit"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-btn bg-surface border border-subtleBorder hover:bg-state-hover text-primaryText transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              Submit
            </Link>

            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-2 rounded-btn text-mutedText-secondary hover:text-primaryText hover:bg-state-hover transition-colors"
              title="Admin Panel"
            >
              <Shield className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-primaryText hover:bg-state-hover rounded-btn transition-colors"
              aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-subtleBorder bg-surface px-4 py-4 space-y-2">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-subtleBorder">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs font-semibold rounded-btn bg-surface-strong border border-subtleBorder text-primaryText"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-between pt-2 text-xs">
              <Link
                href="/submit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1.5 py-2 text-primaryText font-medium"
              >
                <Send className="w-3.5 h-3.5" /> Submit Resource
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1.5 py-2 text-mutedText-secondary font-medium"
              >
                <Shield className="w-3.5 h-3.5" /> Admin Panel
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Palette */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
