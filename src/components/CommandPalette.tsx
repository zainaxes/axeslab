"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { ALL_UNIFIED_ITEMS, UnifiedCatalogItem } from "@/lib/unified-catalog";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_UNIFIED_ITEMS.slice(0, 10);
    return ALL_UNIFIED_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.subcategory.toLowerCase().includes(q) ||
        item.resourceTypeLabel.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.handle.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q)
    ).slice(0, 18);
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => inputRef.current?.focus(), 20);
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          results.length ? (prev - 1 + results.length) % results.length : 0
        );
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, results, selectedIndex]);

  if (!isOpen) return null;

  const handleSelect = (item: UnifiedCatalogItem) => {
    onClose();
    setQuery("");
    router.push(`/?prompt=${encodeURIComponent(item.slug)}`, { scroll: false });
  };

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center pt-16 sm:pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search Axes Lab directory"
    >
      <div
        className="fixed inset-0 bg-paper-3/85 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl bg-paper border border-rule-2 rounded-card overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-rule bg-paper-2">
          <Search className="w-4 h-4 text-muted mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 375 prompts, categories, UI sections, or skills…"
            className="w-full bg-transparent text-ink placeholder:text-muted text-sm outline-none font-sans"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs text-muted hover:text-ink px-2 py-0.5 rounded-pill bg-paper-3 border border-rule mr-2"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-pill text-muted hover:text-ink hover:bg-paper-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-rule p-1.5">
          {results.length === 0 ? (
            <div className="py-10 text-center text-muted text-xs space-y-2">
              <p>No matching resources found for &ldquo;{query}&rdquo;.</p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
                }}
                className="text-xs px-3 py-1.5 rounded-pill bg-paper-2 border border-rule text-ink hover:border-rule-2"
              >
                Search full index
              </button>
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={() => handleSelect(item)}
                className={`w-full text-left px-3 py-2.5 rounded-pill transition-colors duration-150 flex items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-accent ${
                  idx === selectedIndex ? "bg-paper-2" : "hover:bg-paper-2/70"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {item.posterUrl && (
                    <img
                      src={item.posterUrl}
                      alt=""
                      className="w-11 h-7 object-cover rounded border border-rule shrink-0 bg-paper-3"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-medium text-ink text-xs truncate">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-muted px-1.5 py-0.5 rounded bg-paper-3 border border-rule shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted line-clamp-1 mt-0.5">
                      {item.resourceTypeLabel} · {item.source}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-muted shrink-0">
                  {item.hasCustomize ? "Customize" : "Prompt"}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-paper-3 border-t border-rule flex items-center justify-between text-[11px] text-muted">
          <span>{ALL_UNIFIED_ITEMS.length} verified resources indexed</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-paper-2 border border-rule font-mono">
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
