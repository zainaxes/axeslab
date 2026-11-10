"use client";

import React, { useMemo, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Category, Resource } from "@/types";
import ResourceCard from "@/components/ResourceCard";
import ResourceRow from "@/components/ResourceRow";
import {
  Search,
  Filter,
  X,
  LayoutGrid,
  List,
  RotateCcw,
  Check,
} from "lucide-react";

interface ExploreClientProps {
  categories: Category[];
  initialData: {
    resources: Resource[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  initialParams: {
    query: string;
    categorySlug: string;
    subcategorySlug: string;
    resourceType: string;
    accessStatus: string;
    distributionStatus: string;
    sort: string;
    page: number;
  };
}

export default function ExploreClient({
  categories,
  initialData,
  initialParams,
}: ExploreClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialParams.query);

  const resourceTypes = [
    { label: "All Types", value: "" },
    { label: "Prompts", value: "prompt" },
    { label: "Agent Skills", value: "skill" },
    { label: "MCP Servers", value: "mcp_server" },
    { label: "Agents", value: "agent" },
    { label: "Workflows", value: "workflow" },
    { label: "Rules & Configs", value: "rule" },
    { label: "Templates", value: "template" },
    { label: "Models", value: "model" },
    { label: "Datasets", value: "dataset" },
    { label: "Tools", value: "tool" },
    { label: "References", value: "reference" },
  ];

  const accessOptions = [
    { label: "Any Access Model", value: "" },
    { label: "Open Source", value: "free_open_source" },
    { label: "Open Access", value: "open_access" },
    { label: "Free Hosted", value: "free_hosted" },
    { label: "Free Tier Available", value: "free_with_limits" },
  ];

  const distributionOptions = [
    { label: "Any Distribution", value: "" },
    { label: "Hosted Here", value: "canonical_mirror" },
    { label: "Host Allowed", value: "host_allowed" },
    { label: "Official Source Link Only", value: "link_only" },
  ];

  const sortOptions = [
    { label: "Featured & Curated", value: "featured" },
    { label: "Recently Verified", value: "verified" },
    { label: "Recently Added", value: "recent" },
    { label: "Title (A–Z)", value: "title" },
  ];

  const updateFilters = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === "" || val === undefined) {
        params.delete(key);
      } else {
        params.set(key, String(val));
      }
    });

    if (!updates.page) {
      params.delete("page");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ q: searchQuery.trim() || null });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const tagFilter = searchParams.get("tag") || "";

  // Client-side filter alignment ensuring exact matches regardless of static snapshot adapter
  const filteredResources = useMemo(() => {
    const q = (searchQuery || initialParams.query).trim().toLowerCase();
    const list = initialData.resources.filter((res) => {
      if (
        initialParams.categorySlug &&
        res.category_slug !== initialParams.categorySlug &&
        res.primary_category_id !== `cat_${initialParams.categorySlug.replace("-", "")}`
      ) {
        const metaSlug = res.parsed_metadata?.categoryName
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-");
        if (
          res.category_slug !== initialParams.categorySlug &&
          metaSlug !== initialParams.categorySlug
        ) {
          return false;
        }
      }

      if (initialParams.subcategorySlug) {
        const metaSlug = res.parsed_metadata?.categoryName
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-");
        if (
          res.subcategory_slug !== initialParams.subcategorySlug &&
          metaSlug !== initialParams.subcategorySlug
        ) {
          return false;
        }
      }

      if (
        initialParams.resourceType &&
        res.resource_type !== initialParams.resourceType
      ) {
        return false;
      }

      if (
        initialParams.accessStatus &&
        res.access_status !== initialParams.accessStatus
      ) {
        return false;
      }

      if (
        initialParams.distributionStatus &&
        res.distribution_status !== initialParams.distributionStatus
      ) {
        return false;
      }

      if (
        tagFilter &&
        !(res.tags || []).some((t) => t.toLowerCase() === tagFilter.toLowerCase())
      ) {
        return false;
      }

      if (q) {
        const haystack = [
          res.title,
          res.summary,
          res.description || "",
          res.author_or_publisher || "",
          res.category_name || "",
          res.subcategory_name || "",
          res.parsed_metadata?.categoryName || "",
          ...(res.tags || []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    if (initialParams.sort === "title") {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (initialParams.sort === "recent") {
      return [...list].sort((a, b) =>
        (b.created_at || "").localeCompare(a.created_at || "")
      );
    }
    if (initialParams.sort === "verified") {
      return [...list].sort((a, b) =>
        (b.last_checked_at || "").localeCompare(a.last_checked_at || "")
      );
    }
    return list;
  }, [initialData.resources, initialParams, searchQuery, tagFilter]);

  const perPage = 24;
  const totalPages = Math.max(1, Math.ceil(filteredResources.length / perPage));
  const safePage = Math.min(Math.max(1, initialParams.page), totalPages);
  const pagedResources = filteredResources.slice(
    (safePage - 1) * perPage,
    safePage * perPage
  );

  const activeFiltersCount = [
    initialParams.categorySlug,
    initialParams.subcategorySlug,
    initialParams.resourceType,
    initialParams.accessStatus,
    initialParams.distributionStatus,
    initialParams.query,
    tagFilter,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Left Filter Rail (Desktop) */}
        <aside className="hidden md:block col-span-1 space-y-6 sticky top-20 max-h-[82vh] overflow-y-auto pr-2">
          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-between p-3 rounded-card bg-paper-2 border border-rule text-xs">
              <span className="font-medium text-ink">
                {activeFiltersCount} active filter{activeFiltersCount > 1 ? "s" : ""}
              </span>
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1 text-xs text-cool hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
          )}

          <div>
            <label
              htmlFor="rail-search"
              className="text-xs font-medium text-ink block mb-2"
            >
              Search
            </label>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                id="rail-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Keywords, categories…"
                className="w-full text-xs h-9 pl-3 pr-8 rounded-pill bg-paper-2 border border-rule focus:border-rule-2 text-ink placeholder:text-muted outline-none"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-2.5 text-muted hover:text-ink"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xs font-medium text-ink mb-2">Resource Type</h2>
            <div className="space-y-1">
              {resourceTypes.map((type) => {
                const isSelected = initialParams.resourceType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() =>
                      updateFilters({ type: isSelected ? null : type.value })
                    }
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-pill text-xs text-left transition-colors ${
                      isSelected
                        ? "bg-paper-2 border border-rule-2 text-ink font-medium"
                        : "text-muted hover:bg-paper-2/60 hover:text-ink border border-transparent"
                    }`}
                  >
                    <span>{type.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cool" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-medium text-ink mb-2">Category</h2>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() =>
                  updateFilters({ category: null, subcategory: null })
                }
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-pill text-xs text-left transition-colors ${
                  !initialParams.categorySlug
                    ? "bg-paper-2 border border-rule-2 text-ink font-medium"
                    : "text-muted hover:bg-paper-2/60 hover:text-ink border border-transparent"
                }`}
              >
                <span>All Categories</span>
                {!initialParams.categorySlug && (
                  <Check className="w-3.5 h-3.5 text-cool" />
                )}
              </button>

              {categories
                .filter((cat) => (cat.resource_count || 0) > 0)
                .map((cat) => {
                  const isSelected = initialParams.categorySlug === cat.slug;
                  return (
                    <div key={cat.id} className="space-y-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateFilters({
                            category: isSelected ? null : cat.slug,
                            subcategory: null,
                          })
                        }
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-pill text-xs text-left transition-colors ${
                          isSelected
                            ? "bg-paper-2 border border-rule-2 text-ink font-medium"
                            : "text-muted hover:bg-paper-2/60 hover:text-ink border border-transparent"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[11px] font-mono text-muted num">
                          {cat.resource_count || 0}
                        </span>
                      </button>

                      {isSelected &&
                        cat.subcategories &&
                        cat.subcategories.length > 0 && (
                          <div className="pl-3 space-y-0.5 border-l border-rule ml-2 my-1">
                            {cat.subcategories
                              .filter((sub) => (sub.resource_count || 0) > 0)
                              .map((sub) => {
                                const isSubSelected =
                                  initialParams.subcategorySlug === sub.slug;
                                return (
                                  <button
                                    key={sub.id}
                                    type="button"
                                    onClick={() =>
                                      updateFilters({
                                        subcategory: isSubSelected
                                          ? null
                                          : sub.slug,
                                      })
                                    }
                                    className={`w-full flex items-center justify-between px-2 py-1 rounded-pill text-[11px] text-left transition-colors ${
                                      isSubSelected
                                        ? "bg-paper-2 text-ink font-medium"
                                        : "text-muted hover:text-ink"
                                    }`}
                                  >
                                    <span>{sub.name}</span>
                                    <span className="font-mono text-muted num">
                                      {sub.resource_count || 0}
                                    </span>
                                  </button>
                                );
                              })}
                          </div>
                        )}
                    </div>
                  );
                })}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-medium text-ink mb-2">Access Model</h2>
            <div className="space-y-1">
              {accessOptions.map((opt) => {
                const isSelected = initialParams.accessStatus === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      updateFilters({ access: isSelected ? null : opt.value })
                    }
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-pill text-xs text-left transition-colors ${
                      isSelected
                        ? "bg-paper-2 border border-rule-2 text-ink font-medium"
                        : "text-muted hover:bg-paper-2/60 hover:text-ink border border-transparent"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cool" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-medium text-ink mb-2">
              Redistribution
            </h2>
            <div className="space-y-1">
              {distributionOptions.map((dist) => {
                const isSelected =
                  initialParams.distributionStatus === dist.value;
                return (
                  <button
                    key={dist.value}
                    type="button"
                    onClick={() =>
                      updateFilters({
                        distribution: isSelected ? null : dist.value,
                      })
                    }
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-pill text-xs text-left transition-colors ${
                      isSelected
                        ? "bg-paper-2 border border-rule-2 text-ink font-medium"
                        : "text-muted hover:bg-paper-2/60 hover:text-ink border border-transparent"
                    }`}
                  >
                    <span>{dist.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cool" />}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Results Area */}
        <div className="col-span-1 md:col-span-3 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-card bg-paper-2 border border-rule text-xs">
            <div className="text-muted num">
              Showing{" "}
              <strong className="text-ink font-medium">
                {pagedResources.length}
              </strong>{" "}
              of{" "}
              <strong className="text-ink font-medium">
                {filteredResources.length}
              </strong>{" "}
              verified records
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill border border-rule bg-paper-3 text-xs font-medium text-ink"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>
                  Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}
                </span>
              </button>

              <select
                value={initialParams.sort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                aria-label="Sort resources"
                className="bg-paper-3 border border-rule text-ink rounded-pill px-3 py-1.5 text-xs outline-none cursor-pointer"
              >
                {sortOptions.map((s) => (
                  <option key={s.value} value={s.value} className="bg-paper-2">
                    {s.label}
                  </option>
                ))}
              </select>

              <div className="flex items-center rounded-pill border border-rule bg-paper-3 p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-pill transition-colors ${
                    viewMode === "grid"
                      ? "bg-ink text-paper"
                      : "text-muted hover:text-ink"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-pill transition-colors ${
                    viewMode === "list"
                      ? "bg-ink text-paper"
                      : "text-muted hover:text-ink"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {pagedResources.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
                {pagedResources.map((res) => (
                  <ResourceCard key={res.id} resource={res} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {pagedResources.map((res) => (
                  <ResourceRow key={res.id} resource={res} />
                ))}
              </div>
            )
          ) : (
            <div className="p-12 text-center rounded-card border border-rule bg-paper-2 space-y-3">
              <h3 className="text-base font-display font-medium text-ink">
                No matching resources found
              </h3>
              <p className="text-xs text-muted max-w-sm mx-auto">
                No entries match the selected filters. Try clearing filters or searching broader terms.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-4 py-2 rounded-pill bg-accent text-accent-ink text-xs font-medium hover:opacity-90"
              >
                Reset filters
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-rule text-xs">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => updateFilters({ page: safePage - 1 })}
                className="px-4 py-2 rounded-pill border border-rule bg-paper-2 hover:border-rule-2 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-ink"
              >
                Previous
              </button>
              <span className="text-muted num">
                Page {safePage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => updateFilters({ page: safePage + 1 })}
                className="px-4 py-2 rounded-pill border border-rule bg-paper-2 hover:border-rule-2 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-ink"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Sheet */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] flex justify-end bg-paper-3/80 backdrop-blur-sm md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filter catalogue"
        >
          <div className="w-full max-w-xs h-full bg-paper p-5 overflow-y-auto border-l border-rule space-y-6">
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <h3 className="text-sm font-medium text-ink">Filter Catalogue</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-pill text-muted hover:text-ink"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-medium text-ink">Resource Type</h4>
              <div className="space-y-1">
                {resourceTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => {
                      updateFilters({ type: type.value || null });
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-pill text-xs text-ink hover:bg-paper-2"
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                clearAllFilters();
                setIsMobileFilterOpen(false);
              }}
              className="w-full py-2 rounded-pill border border-rule text-xs font-medium text-ink bg-paper-2"
            >
              Reset all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
