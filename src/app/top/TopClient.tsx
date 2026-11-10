"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { ALL_UNIFIED_ITEMS, UnifiedCatalogItem } from "@/lib/unified-catalog";
import { UnifiedResourceCard } from "@/components/UnifiedResourceCard";

export function TopClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const topItems = useMemo(() => {
    const base = [...ALL_UNIFIED_ITEMS]
      .sort((a, b) => b.chars - a.chars)
      .slice(0, 50);

    const q = searchQuery.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.subcategory.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelect = (item: UnifiedCatalogItem) => {
    router.push(`/top?prompt=${encodeURIComponent(item.slug)}`, { scroll: false });
  };

  return (
    <section className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rule">
        <div className="relative w-full sm:max-w-sm">
          <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            placeholder="Filter essential directives…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-8 rounded-pill bg-paper-2 border border-rule focus:border-rule-2 text-xs text-ink placeholder:text-muted outline-none transition-colors duration-150"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              aria-label="Clear filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <span className="text-xs text-muted num">
          Showing <strong className="text-ink font-medium">{topItems.length}</strong> directives
        </span>
      </div>

      {topItems.length === 0 ? (
        <div className="rounded-card border border-rule bg-paper-2 p-12 text-center text-xs text-muted">
          No directives match your filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
          {topItems.map((item, idx) => (
            <UnifiedResourceCard
              key={item.id}
              item={item}
              index={idx}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </section>
  );
}
