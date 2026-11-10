"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import {
  ALL_UNIFIED_ITEMS,
  CATALOG_COUNTS,
  ResourceKindGroup,
  UnifiedCatalogItem,
} from "@/lib/unified-catalog";
import { UnifiedResourceCard } from "./UnifiedResourceCard";
import { PromptRegistryRow } from "./PromptRegistryRow";
import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/motion";

export interface CatalogDiscoveryBrowserProps {
  initialGroup?: ResourceKindGroup;
  initialCategory?: string;
  lockGroup?: boolean;
  pageSize?: number;
  showGroupTabs?: boolean;
  showViewToggle?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

const GROUP_TABS: Array<{ id: ResourceKindGroup; label: string; count: number }> = [
  { id: "all", label: "All", count: CATALOG_COUNTS.total },
  { id: "website-ui", label: "Website UI", count: CATALOG_COUNTS.websiteUi },
  { id: "motion", label: "Motion", count: CATALOG_COUNTS.motionTotal },
  { id: "sections", label: "Sections", count: CATALOG_COUNTS.sections },
  { id: "3d", label: "3D", count: CATALOG_COUNTS.threeD },
  { id: "apps", label: "Apps", count: CATALOG_COUNTS.apps },
  { id: "backgrounds", label: "Backgrounds", count: CATALOG_COUNTS.backgrounds },
  { id: "skills", label: "Skills", count: CATALOG_COUNTS.skills },
];

type SortMode = "featured" | "newest" | "title";

export function CatalogDiscoveryBrowser({
  initialGroup = "all",
  initialCategory = "All",
  lockGroup = false,
  pageSize = 36,
  showGroupTabs = true,
  showViewToggle = true,
  emptyTitle = "No matching resources found",
  emptyDescription = "Try clearing your search query or switching category filters.",
}: CatalogDiscoveryBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get("q") || "";
  const urlTopic = searchParams.get("topic") || searchParams.get("category") || "";

  const [activeGroup, setActiveGroup] = useState<ResourceKindGroup>(initialGroup);
  const [activeCategory, setActiveCategory] = useState<string>(
    urlTopic || initialCategory
  );
  const [searchQuery, setSearchQuery] = useState<string>(urlQuery);
  const [sortBy, setSortBy] = useState<SortMode>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [displayCount, setDisplayCount] = useState<number>(pageSize);

  const railRef = useRef<HTMLDivElement | null>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (urlTopic) {
      setActiveCategory(urlTopic);
    }
  }, [urlTopic]);

  useEffect(() => {
    if (urlQuery) {
      setSearchQuery(urlQuery);
    }
  }, [urlQuery]);

  // Filter strictly by resource group first
  const groupItems = useMemo(() => {
    return ALL_UNIFIED_ITEMS.filter((item) => {
      switch (activeGroup) {
        case "website-ui":
          return item.origin === "web-library";
        case "motion":
          return item.origin === "motion-registry" && !item.isSkill;
        case "sections":
          return item.isSection;
        case "3d":
          return item.is3D;
        case "apps":
          return item.isApp;
        case "backgrounds":
          return item.isBackground;
        case "skills":
          return item.isSkill;
        default:
          return true;
      }
    });
  }, [activeGroup]);

  // Compute authentic non-empty categories from groupItems (zero duplicates, zero empty counts)
  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>();

    for (const item of groupItems) {
      const primary =
        item.origin === "web-library"
          ? item.category
          : item.subcategory || item.category;
      if (primary) {
        counts.set(primary, (counts.get(primary) || 0) + 1);
      }
      for (const sub of item.subcategories) {
        if (sub && sub !== primary) {
          counts.set(sub, (counts.get(sub) || 0) + 1);
        }
      }
    }

    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [groupItems]);

  // Apply category + search filtering
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const catLower = activeCategory.toLowerCase();

    return groupItems.filter((item) => {
      const matchesCat =
        activeCategory === "All" ||
        item.category.toLowerCase() === catLower ||
        item.categorySlug.toLowerCase() === catLower ||
        item.subcategory.toLowerCase() === catLower ||
        item.subcategories.some(
          (s) =>
            s.toLowerCase() === catLower ||
            s.toLowerCase().replace(/[^a-z0-9]+/g, "-") === catLower
        );

      if (!matchesCat) return false;

      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.subcategory.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.handle.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.originalPrompt.toLowerCase().includes(q)
      );
    });
  }, [groupItems, activeCategory, searchQuery]);

  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    if (sortBy === "newest") {
      return list.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    }
    if (sortBy === "title") {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [filteredItems, sortBy]);

  const displayedItems = sortedItems.slice(0, displayCount);

  const hasActiveFilters =
    (!lockGroup && activeGroup !== initialGroup) ||
    activeCategory !== "All" ||
    searchQuery.trim() !== "" ||
    sortBy !== "featured";

  const handleReset = () => {
    if (!lockGroup) setActiveGroup(initialGroup);
    setActiveCategory("All");
    setSearchQuery("");
    setSortBy("featured");
    setDisplayCount(pageSize);
  };

  const handleSelectItem = (item: UnifiedCatalogItem) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("prompt", item.slug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const scrollCategoryRail = (dir: "left" | "right") => {
    if (!railRef.current) return;
    const offset = dir === "right" ? 280 : -280;
    railRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  // Subtle ScrollTrigger batch entrance for cards (respects prefers-reduced-motion)
  useGSAP(
    () => {
      if (viewMode !== "grid") return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-catalog-card]");
        if (cards.length === 0) return;

        ScrollTrigger.batch(cards, {
          interval: 0.08,
          batchMax: 8,
          once: true,
          start: "top 95%",
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: MOTION.durCard,
                ease: MOTION.easeOut,
                stagger: { each: 0.025, from: "start" },
                overwrite: true,
                clearProps: "transform,opacity,visibility",
              }
            );
          },
        });
      });
    },
    {
      scope: gridContainerRef,
      dependencies: [
        activeGroup,
        activeCategory,
        searchQuery,
        sortBy,
        viewMode,
        displayedItems.length,
      ],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      id="catalog-discovery"
      className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7"
    >
      {/* Discovery Toolbar (MotionSites-inspired 2-tier separation) */}
      <div className="space-y-4">
        {/* Tier 1: Resource-Type Tabs + Search + Sort + View Mode */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Resource-type segmented navigation */}
          {showGroupTabs && (
            <div
              role="tablist"
              aria-label="Resource types"
              className="flex items-center gap-1 p-1 rounded-pill bg-paper-2 border border-rule overflow-x-auto no-scrollbar"
            >
              {GROUP_TABS.map((tab) => {
                const active = activeGroup === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setActiveGroup(tab.id);
                      setActiveCategory("All");
                      setDisplayCount(pageSize);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
                      active
                        ? "bg-ink text-paper font-medium"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`font-mono text-[10px] num ${
                        active ? "text-paper/75" : "text-muted"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Right controls: Search + Sort + View Switcher */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 flex-1 lg:justify-end">
            <div className="relative flex-1 sm:max-w-xs min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="catalog-filter-input"
                name="catalogFilter"
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setDisplayCount(pageSize);
                }}
                placeholder="Filter by title, category, creator…"
                aria-label="Filter resources"
                className="w-full h-9 pl-9 pr-8 rounded-pill bg-paper-2 border border-rule focus:border-rule-2 text-xs text-ink placeholder:text-muted outline-none transition-colors duration-150"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink p-0.5"
                  aria-label="Clear filter search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort selector (existing supported sorting modes only) */}
            <div className="inline-flex items-center p-1 rounded-pill bg-paper-2 border border-rule">
              {(
                [
                  { id: "featured", label: "Featured" },
                  { id: "newest", label: "Recent" },
                  { id: "title", label: "A–Z" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSortBy(opt.id)}
                  className={`px-2.5 py-1 rounded-pill text-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
                    sortBy === opt.id
                      ? "bg-paper-3 text-ink font-medium border border-rule"
                      : "text-muted hover:text-ink border border-transparent"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {showViewToggle && (
              <div className="inline-flex items-center p-1 rounded-pill bg-paper-2 border border-rule">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-pill transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
                    viewMode === "grid"
                      ? "bg-ink text-paper"
                      : "text-muted hover:text-ink"
                  }`}
                  aria-label="Card grid view"
                  title="Card grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-pill transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
                    viewMode === "list"
                      ? "bg-ink text-paper"
                      : "text-muted hover:text-ink"
                  }`}
                  aria-label="Compact registry list view"
                  title="Compact registry list view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tier 2: Horizontal Category Pill Strip with Scroll Buttons */}
        <div className="flex items-center gap-2 border-y border-rule py-3">
          <button
            type="button"
            onClick={() => scrollCategoryRail("left")}
            className="hidden sm:inline-flex items-center justify-center w-7 h-7 rounded-pill bg-paper-2 border border-rule text-muted hover:text-ink hover:border-rule-2 shrink-0 transition-colors duration-150"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div
            ref={railRef}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 py-0.5"
          >
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setDisplayCount(pageSize);
              }}
              className={`px-3 py-1.5 rounded-pill text-xs whitespace-nowrap transition-colors duration-150 border focus-visible:outline-2 focus-visible:outline-accent ${
                activeCategory === "All"
                  ? "bg-ink text-paper border-ink font-medium"
                  : "bg-paper-2 text-muted border-rule hover:text-ink hover:border-rule-2"
              }`}
            >
              All ({groupItems.length})
            </button>

            {categoryOptions.map((cat) => {
              const isSelected =
                activeCategory.toLowerCase() === cat.name.toLowerCase() ||
                activeCategory.toLowerCase() ===
                  cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => {
                    setActiveCategory(isSelected ? "All" : cat.name);
                    setDisplayCount(pageSize);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs whitespace-nowrap transition-colors duration-150 border focus-visible:outline-2 focus-visible:outline-accent ${
                    isSelected
                      ? "bg-ink text-paper border-ink font-medium"
                      : "bg-paper-2 text-muted border-rule hover:text-ink hover:border-rule-2"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`font-mono text-[10px] num ${
                      isSelected ? "text-paper/75" : "text-muted"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollCategoryRail("right")}
            className="hidden sm:inline-flex items-center justify-center w-7 h-7 rounded-pill bg-paper-2 border border-rule text-muted hover:text-ink hover:border-rule-2 shrink-0 transition-colors duration-150"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <Link
            href="/categories"
            className="hidden md:inline-flex items-center px-3 py-1.5 rounded-pill bg-paper-2 border border-rule hover:border-rule-2 text-xs text-muted hover:text-ink whitespace-nowrap shrink-0 transition-colors duration-150"
          >
            All categories
          </Link>
        </div>

        {/* Active Result Summary Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              Showing{" "}
              <strong className="text-ink font-medium num">
                {displayedItems.length}
              </strong>{" "}
              of{" "}
              <strong className="text-ink font-medium num">
                {filteredItems.length}
              </strong>{" "}
              resources
            </span>
            {activeCategory !== "All" && (
              <span className="px-2 py-0.5 rounded-pill bg-paper-2 border border-rule text-ink">
                {activeCategory}
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-cool hover:underline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Grid / Empty State */}
      <div ref={gridContainerRef}>
        {filteredItems.length === 0 ? (
          <div className="rounded-card border border-rule bg-paper-2 p-12 text-center space-y-3 max-w-lg mx-auto my-8">
            <h3 className="text-base font-display font-medium text-ink">
              {emptyTitle}
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              {emptyDescription}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-pill bg-accent text-accent-ink text-xs font-medium hover:opacity-90 transition-opacity"
            >
              Reset filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
            {displayedItems.map((item, idx) => (
              <UnifiedResourceCard
                key={item.id}
                item={item}
                index={idx}
                onSelect={handleSelectItem}
              />
            ))}
          </div>
        ) : (
          <div className="border border-rule rounded-card bg-paper overflow-hidden">
            {displayedItems.map((item, idx) => (
              <PromptRegistryRow
                key={item.id}
                item={{
                  id: item.id,
                  slug: item.slug,
                  title: item.title,
                  category: item.category,
                  categorySlug: item.categorySlug,
                  subcategory: item.subcategory,
                  subcategories: item.subcategories,
                  summary: item.summary,
                  contentBody: item.originalPrompt,
                  originalPrompt: item.originalPrompt,
                  improvedPrompt: item.improvedPrompt,
                  template: item.template,
                  fields: item.fields,
                  hasCustomize: item.hasCustomize,
                  customizerType: item.customizerType,
                  rightsStatus: item.rightsStatus,
                  license: item.license,
                  isSkill: item.isSkill,
                  skillCommand: item.skillCommand,
                  skillRepo: item.skillRepo,
                  skillDescription: item.skillDescription,
                  llmTarget: item.llmTarget || "Claude Opus 5.5",
                  type: item.resourceTypeLabel,
                  tokens: item.tokens,
                  views: 0,
                  likes: 0,
                  author: item.author,
                  handle: item.handle,
                  sourceUrl: item.sourceUrl,
                  date: item.date,
                  model: item.model,
                  effort: item.effort,
                  poster: item.posterUrl,
                  preview: item.videoUrl,
                  video: item.videoUrl,
                  tags: item.tags,
                  chars: item.chars,
                  videoUrl: item.videoUrl,
                  posterUrl: item.posterUrl,
                }}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {displayedItems.length < filteredItems.length && (
        <div className="pt-6 text-center">
          <button
            type="button"
            onClick={() => setDisplayCount((prev) => prev + pageSize)}
            className="h-10 px-6 rounded-pill bg-paper-2 border border-rule hover:border-rule-2 text-xs font-medium text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
          >
            Load more ({filteredItems.length - displayedItems.length} remaining)
          </button>
        </div>
      )}
    </section>
  );
}
