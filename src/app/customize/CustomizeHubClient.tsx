"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ALL_REAL_PROMPTS } from "@/lib/real-prompts";
import { SafeMediaImage } from "@/components/SafeMediaImage";

export function CustomizeHubClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [displayCount, setDisplayCount] = useState(36);

  const customizablePrompts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_REAL_PROMPTS.filter((p) => {
      if (!p.hasCustomize) return false;
      if (categoryFilter !== "All" && p.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.handle.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, categoryFilter]);

  const displayed = customizablePrompts.slice(0, displayCount);

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-4">
        <div>
          <h2 className="text-lg font-display font-medium text-ink">
            Customizable Prompts ({customizablePrompts.length})
          </h2>
          <p className="text-xs text-muted mt-0.5">
            Select any motion prompt to open its parameter customizer.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center p-1 rounded-pill bg-paper-2 border border-rule">
            {["All", "Website Prompts", "Motion Ads"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategoryFilter(cat);
                  setDisplayCount(36);
                }}
                className={`px-3 py-1 rounded-pill text-xs transition-colors duration-150 ${
                  categoryFilter === cat
                    ? "bg-ink text-paper font-medium"
                    : "text-muted hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDisplayCount(36);
              }}
              placeholder="Filter customizable prompts…"
              className="w-full h-9 pl-9 pr-8 rounded-pill bg-paper-2 border border-rule focus:border-rule-2 text-xs text-ink placeholder:text-muted outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {displayed.length === 0 ? (
        <div className="rounded-card border border-rule bg-paper-2 p-10 text-center text-xs text-muted">
          No customizable prompts matched your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((item) => (
            <Link
              key={item.id}
              href={`/customize/${item.slug}`}
              className="group flex items-center gap-3.5 rounded-card bg-paper-2 border border-rule hover:border-rule-2 p-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div className="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-pill bg-paper-3 border border-rule">
                <SafeMediaImage
                  src={item.poster}
                  alt={item.title}
                  fallbackLabel={item.subcategory}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <span className="text-[11px] text-muted block truncate">
                  {item.subcategory} · @{item.handle}
                </span>
                <h3 className="font-sans font-medium text-xs text-ink group-hover:text-cool transition-colors truncate">
                  {item.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted">
                  <SlidersHorizontal className="w-3 h-3 text-cool" />
                  <span>
                    {item.customizerType === "field_replacement"
                      ? "Parameter rewrite"
                      : "Override block"}
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {displayed.length < customizablePrompts.length && (
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={() => setDisplayCount((prev) => prev + 36)}
            className="h-9 px-5 rounded-pill bg-paper-2 border border-rule hover:border-rule-2 text-xs font-medium text-ink transition-colors"
          >
            Load more ({customizablePrompts.length - displayed.length} remaining)
          </button>
        </div>
      )}
    </section>
  );
}
