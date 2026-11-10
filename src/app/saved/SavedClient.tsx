"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { ALL_UNIFIED_ITEMS, UnifiedCatalogItem } from "@/lib/unified-catalog";
import { getSavedSlugOrIds } from "@/lib/saved-storage";
import { UnifiedResourceCard } from "@/components/UnifiedResourceCard";

export function SavedClient() {
  const router = useRouter();
  const [savedItems, setSavedItems] = useState<UnifiedCatalogItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadSaved = () => {
    const keys = getSavedSlugOrIds();
    const matched = ALL_UNIFIED_ITEMS.filter(
      (item) => keys.has(item.id) || keys.has(item.slug)
    );
    setSavedItems(matched);
    setLoaded(true);
  };

  useEffect(() => {
    loadSaved();
    window.addEventListener("axeslab:saved-changed", loadSaved);
    window.addEventListener("storage", loadSaved);
    return () => {
      window.removeEventListener("axeslab:saved-changed", loadSaved);
      window.removeEventListener("storage", loadSaved);
    };
  }, []);

  const handleSelect = (item: UnifiedCatalogItem) => {
    router.push(`/saved?prompt=${encodeURIComponent(item.slug)}`, { scroll: false });
  };

  return (
    <section className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between text-xs text-muted pb-3 border-b border-rule">
        <span className="num">
          <strong className="text-ink font-medium">{savedItems.length}</strong>{" "}
          saved items
        </span>
        <span>Local browser storage only</span>
      </div>

      {!loaded ? (
        <div className="py-12 text-center text-xs text-muted">
          Loading saved resources…
        </div>
      ) : savedItems.length === 0 ? (
        <div className="rounded-card border border-rule bg-paper-2 p-12 text-center space-y-4 max-w-md mx-auto my-8">
          <div className="w-10 h-10 rounded-full bg-paper-3 border border-rule flex items-center justify-center mx-auto text-muted">
            <Bookmark className="w-4 h-4" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-base font-display font-medium text-ink">
              No saved resources yet
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              Click the bookmark button on any resource card or preview screen to keep it accessible here.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center h-9 px-4 rounded-pill bg-accent text-accent-ink text-xs font-medium hover:opacity-90 transition-opacity"
          >
            Browse library
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
          {savedItems.map((item, idx) => (
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
