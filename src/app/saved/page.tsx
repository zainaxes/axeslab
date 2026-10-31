"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Bookmark, Trash2, ArrowUpRight, Download, RotateCcw } from "lucide-react";

interface SavedItem {
  id: string;
  title: string;
  slug: string;
  resource_type: string;
  summary: string;
  saved_at: string;
}

export default function SavedResourcesPage() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const data = JSON.parse(localStorage.getItem("axes_lab_saved_resources") || "[]");
      setSavedItems(data);
    } catch {
      setSavedItems([]);
    }
  }, []);

  const removeItem = (id: string) => {
    const updated = savedItems.filter((item) => item.id !== id);
    setSavedItems(updated);
    localStorage.setItem("axes_lab_saved_resources", JSON.stringify(updated));
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear all saved resources?")) {
      setSavedItems([]);
      localStorage.removeItem("axes_lab_saved_resources");
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(savedItems, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `axes-lab-saved-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!mounted) {
    return (
      <div className="py-12 text-center text-xs text-mutedText">Loading saved resources...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <Breadcrumbs items={[{ label: "Saved Resources", href: "/saved" }]} />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-subtleBorder pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primaryText tracking-tight mb-2">
            Saved Bookmarks ({savedItems.length})
          </h1>
          <p className="text-xs sm:text-sm text-mutedText-secondary leading-relaxed">
            Resources bookmarked locally in your current browser. No account or tracking required.
          </p>
        </div>

        {savedItems.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-surface border border-subtleBorder hover:bg-state-hover text-xs font-semibold text-primaryText transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export JSON
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-surface border border-subtleBorder hover:bg-state-hover text-xs font-semibold text-state-danger transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>
        )}
      </div>

      {savedItems.length === 0 ? (
        <div className="p-16 text-center rounded-panel border border-subtleBorder bg-surface space-y-3">
          <Bookmark className="w-8 h-8 text-mutedText mx-auto" />
          <h3 className="text-base font-bold text-primaryText">No saved resources yet</h3>
          <p className="text-xs text-mutedText-secondary max-w-sm mx-auto mb-4">
            Click the bookmark icon on any prompt, skill, or MCP server card to save it for quick local reference.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-state-inverse text-state-inverseText text-xs font-semibold hover:opacity-90"
          >
            Browse Catalogue
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {savedItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-btn border border-subtleBorder bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-strong transition-all"
            >
              <div className="flex-1 min-w-0 pr-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-canvas border border-subtleBorder text-mutedText-secondary mb-1 inline-block">
                  {item.resource_type.replace("_", " ")}
                </span>
                <h3 className="text-sm font-bold text-primaryText truncate">
                  <Link href={`/resource/${item.slug}`} className="hover:underline">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-xs text-mutedText-secondary line-clamp-1 mt-0.5">{item.summary}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                <Link
                  href={`/resource/${item.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-btn bg-canvas border border-subtleBorder hover:bg-state-hover text-primaryText"
                >
                  View <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 rounded-btn text-mutedText hover:text-state-danger hover:bg-state-hover transition-colors"
                  title="Remove from saved"
                  aria-label="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
