"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Bookmark } from "lucide-react";
import { CommandPalette } from "./CommandPalette";
import { getSavedSlugOrIds } from "@/lib/saved-storage";

const PRIMARY_NAV = [
  { label: "Prompts", href: "/prompts" },
  { label: "Web Design", href: "/web-design" },
  { label: "Categories", href: "/categories" },
  { label: "Customize", href: "/customize" },
];

const SECONDARY_NAV = [
  { label: "Templates", href: "/templates" },
  { label: "Skills", href: "/skills" },
  { label: "Sections", href: "/sections" },
  { label: "3D", href: "/3d-websites" },
  { label: "Backgrounds", href: "/backgrounds" },
  { label: "Apps", href: "/apps" },
  { label: "MCP", href: "/mcp" },
  { label: "Submit", href: "/submit" },
  { label: "Contact", href: "/contact" },
];

const MOBILE_GROUPS = [
  {
    heading: "Library",
    links: [
      { label: "All Resources", href: "/" },
      { label: "Explore Catalogue", href: "/explore" },
      { label: "Categories", href: "/categories" },
      { label: "Prompts", href: "/prompts" },
      { label: "Web Design", href: "/web-design" },
      { label: "UI Sections", href: "/sections" },
      { label: "3D Websites", href: "/3d-websites" },
      { label: "Backgrounds", href: "/backgrounds" },
      { label: "Applications", href: "/apps" },
      { label: "Top Picks", href: "/top" },
      { label: "Collections", href: "/collections" },
    ],
  },
  {
    heading: "Tools & Agents",
    links: [
      { label: "Customize Prompts", href: "/customize" },
      { label: "Templates", href: "/templates" },
      { label: "Agent Skills", href: "/skills" },
      { label: "MCP Server", href: "/mcp" },
      { label: "Restyle Studio", href: "/restyle" },
      { label: "Saved Items", href: "/saved" },
    ],
  },
  {
    heading: "Platform & Policies",
    links: [
      { label: "About Axes Lab", href: "/about" },
      { label: "Submit Resource", href: "/submit" },
      { label: "Contact", href: "/contact" },
      { label: "Methodology", href: "/methodology" },
      { label: "Licensing & Rights", href: "/licensing" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const syncSaved = () => setSavedCount(getSavedSlugOrIds().size);
    syncSaved();
    window.addEventListener("axeslab:saved-changed", syncSaved);
    window.addEventListener("storage", syncSaved);
    return () => {
      window.removeEventListener("axeslab:saved-changed", syncSaved);
      window.removeEventListener("storage", syncSaved);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [mobileMenuOpen]);

  const isRouteActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="sticky top-0 z-[var(--z-sticky-nav)] h-14 w-full border-b border-rule bg-paper/92 backdrop-blur-md">
        <div className="max-w-[var(--container)] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Brand + Primary Resource Nav */}
          <div className="flex items-center gap-5 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0 rounded-pill py-1 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <img
                src="/logo-white.png"
                alt="Axes Lab"
                className="w-6 h-6 object-contain shrink-0"
              />
              <span className="text-sm font-display font-medium text-ink tracking-tight whitespace-nowrap">
                Axes Lab
              </span>
            </Link>

            <nav aria-label="Primary library" className="hidden lg:flex items-center gap-0.5">
              {PRIMARY_NAV.map((link) => {
                const active = isRouteActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 py-1.5 rounded-pill text-[13px] whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
                      active
                        ? "text-ink font-medium bg-paper-2"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Secondary Nav + Search + Saved + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <nav aria-label="Secondary routes" className="hidden xl:flex items-center gap-0.5">
              {SECONDARY_NAV.map((link) => {
                const active = isRouteActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 py-1.5 rounded-pill text-[13px] whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
                      active
                        ? "text-ink font-medium bg-paper-2"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Compact tablet/small-desktop quick links (lg..xl) */}
            <nav aria-label="Compact secondary routes" className="hidden lg:flex xl:hidden items-center gap-0.5">
              {SECONDARY_NAV.filter((l) =>
                ["/templates", "/skills", "/mcp", "/submit", "/contact"].includes(l.href)
              ).map((link) => {
                const active = isRouteActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2 py-1.5 rounded-pill text-[13px] whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
                      active
                        ? "text-ink font-medium bg-paper-2"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-2 h-8 px-2.5 rounded-pill bg-paper-2 border border-rule text-xs text-muted hover:text-ink hover:border-rule-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Search resources"
              title="Search directory (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline font-mono text-[10px] text-muted px-1 py-0.5 bg-paper-3 rounded border border-rule">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/saved"
              className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-pill text-xs font-medium border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
                isRouteActive("/saved")
                  ? "bg-accent text-accent-ink border-accent"
                  : "bg-paper-2 border-rule text-ink hover:border-rule-2"
              }`}
              aria-label="Saved resources"
            >
              <Bookmark className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className="font-mono text-[10px] tabular-nums opacity-85">
                  {savedCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="xl:hidden inline-flex items-center justify-center w-8 h-8 rounded-pill bg-paper-2 border border-rule text-muted hover:text-ink hover:border-rule-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-14 z-[var(--z-modal)] bg-paper/98 backdrop-blur-md overflow-y-auto xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 py-6 space-y-6">
            {MOBILE_GROUPS.map((group) => (
              <div key={group.heading} className="space-y-2.5">
                <h2 className="text-xs font-medium text-muted px-2">
                  {group.heading}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {group.links.map((link) => {
                    const active = isRouteActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-3 py-2 rounded-pill text-xs border transition-colors duration-150 ${
                          active
                            ? "bg-paper-2 border-rule-2 text-ink font-medium"
                            : "bg-paper-3 border-rule text-muted hover:text-ink hover:border-rule-2"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
