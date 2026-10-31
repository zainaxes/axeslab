"use client";

import React, { useState } from "react";
import { Resource } from "@/types";
import { WebDesignPromptCard } from "./WebDesignPromptCard";
import { PromptModal } from "./PromptModal";

interface WebDesignGalleryProps {
  resources: Resource[];
  initialCategory?: string;
  categories?: Array<{ name: string; slug: string; count: number }>;
}

export function WebDesignGallery({
  resources,
  initialCategory,
  categories = [],
}: WebDesignGalleryProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || "all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((res) => {
    const meta = res.parsed_metadata || {};
    const catName = meta.categoryName || res.subcategory_name || "";
    const matchesCategory =
      activeCategory === "all" ||
      catName.toLowerCase() === activeCategory.toLowerCase() ||
      res.subcategory_slug === activeCategory;

    const matchesSearch =
      searchQuery.trim() === "" ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      catName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative max-w-md flex-1">
          <input
            type="text"
            placeholder="Search prompts (e.g., Hero, SaaS, Glassmorphism, 3D)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-subtleBorder bg-surface/80 px-4 py-2.5 pl-10 text-sm text-primaryText backdrop-blur-md outline-none transition-all placeholder:text-mutedText focus:border-subtleBorder-strong focus:bg-surface-strong"
          />
          <svg
            className="absolute left-3.5 top-3 h-4 w-4 text-mutedText"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Counter */}
        <div className="font-mono text-xs text-mutedText">
          Showing <span className="font-bold text-primaryText">{filteredResources.length}</span> of {resources.length} Prompts
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      {categories.length > 0 && (
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all ${
              activeCategory === "all"
                ? "bg-state-inverse text-state-inverseText shadow-sm"
                : "bg-surface border border-subtleBorder text-mutedText hover:text-primaryText hover:bg-surface-strong"
            }`}
          >
            All Categories ({resources.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.name)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all ${
                activeCategory.toLowerCase() === cat.name.toLowerCase()
                  ? "bg-state-inverse text-state-inverseText shadow-sm"
                  : "bg-surface border border-subtleBorder text-mutedText hover:text-primaryText hover:bg-surface-strong"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      )}

      {/* Prompts Grid */}
      {filteredResources.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/15 p-12 text-center dark:border-white/15">
          <p className="text-base font-medium text-black/60 dark:text-white/60">
            No design prompts matched your filter criteria.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="mt-3 text-xs font-mono font-medium underline text-black dark:text-white"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredResources.map((resource) => (
            <WebDesignPromptCard
              key={resource.id}
              resource={resource}
              onOpenModal={(res) => setSelectedResource(res)}
            />
          ))}
        </div>
      )}

      {/* Interactive Modal */}
      <PromptModal
        resource={selectedResource}
        isOpen={Boolean(selectedResource)}
        onClose={() => setSelectedResource(null)}
      />
    </div>
  );
}
