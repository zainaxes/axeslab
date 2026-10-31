"use client";

import React, { useState, useTransition } from "react";
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
  ChevronDown,
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
  const [isPending, startTransition] = useTransition();

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
    { label: "Free Hosted", value: "free_hosted" },
    { label: "Free Tier Available", value: "free_with_limits" },
    { label: "Paid API Dependent", value: "open_source_paid_dependency" },
  ];

  const distributionOptions = [
    { label: "Any Distribution", value: "" },
    { label: "Hosted Here / Download", value: "host_allowed" },
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

    // Reset page to 1 when filters change (unless page itself is being changed)
    if (!updates.page) {
      params.delete("page");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ q: searchQuery.trim() || null });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const activeFiltersCount = [
    initialParams.categorySlug,
    initialParams.subcategorySlug,
    initialParams.resourceType,
    initialParams.accessStatus,
    initialParams.distributionStatus,
    initialParams.query,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Top Banner: Title and Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-subtleBorder">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primaryText tracking-tight">
            Explore All Resources
          </h1>
          <p className="text-xs sm:text-sm text-mutedText-secondary mt-1">
            Browse verified tools, prompts, MCP servers, and agent capabilities across the index.
          </p>
        </div>

        {/* View toggle & Mobile filter trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-btn border border-subtleBorder bg-surface text-xs font-semibold text-primaryText"
          >
            <Filter className="w-3.5 h-3.5" />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>

          <div className="flex items-center rounded-btn border border-subtleBorder bg-surface p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === "grid" ? "bg-surface-strong text-primaryText shadow-sm" : "text-mutedText hover:text-primaryText"
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === "list" ? "bg-surface-strong text-primaryText shadow-sm" : "text-mutedText hover:text-primaryText"
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Filter Rail + Results */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Left Filter Rail (Desktop) */}
        <aside className="hidden md:block col-span-1 space-y-6 sticky top-24 max-h-[85vh] overflow-y-auto pr-2">
          {/* Active filter count & clear */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-between p-3 rounded-btn bg-surface border border-subtleBorder text-xs">
              <span className="font-semibold text-primaryText">
                {activeFiltersCount} active filter{activeFiltersCount > 1 ? "s" : ""}
              </span>
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1 text-[11px] text-mutedText hover:text-primaryText font-medium"
              >
                <RotateCcw className="w-3 h-3" /> Clear all
              </button>
            </div>
          )}

          {/* Search within results */}
          <div>
            <label htmlFor="rail-search" className="text-xs font-bold uppercase tracking-wider text-primaryText block mb-2">
              Search Within Results
            </label>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                id="rail-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Keywords, tools, authors..."
                className="w-full text-xs h-9 pl-3 pr-8 rounded-input bg-surface-strong border border-subtleBorder text-primaryText placeholder:text-mutedText focus:outline-none focus:ring-1 focus:ring-primaryText"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-2.5 text-mutedText hover:text-primaryText"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Resource Type Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primaryText mb-2">
              Resource Type
            </h4>
            <div className="space-y-1">
              {resourceTypes.map((type) => {
                const isSelected = initialParams.resourceType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => updateFilters({ type: isSelected ? null : type.value })}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-btn text-xs font-medium text-left transition-colors ${
                      isSelected
                        ? "bg-state-selected text-primaryText font-bold"
                        : "text-mutedText-secondary hover:bg-state-hover hover:text-primaryText"
                    }`}
                  >
                    <span>{type.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primaryText" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Category Rail */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primaryText mb-2">
              Category
            </h4>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => updateFilters({ category: null, subcategory: null })}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-btn text-xs font-medium text-left transition-colors ${
                  !initialParams.categorySlug
                    ? "bg-state-selected text-primaryText font-bold"
                    : "text-mutedText-secondary hover:bg-state-hover hover:text-primaryText"
                }`}
              >
                <span>All Categories</span>
                {!initialParams.categorySlug && <Check className="w-3.5 h-3.5 text-primaryText" />}
              </button>

              {categories.map((cat) => {
                const isSelected = initialParams.categorySlug === cat.slug;
                return (
                  <div key={cat.id} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => updateFilters({ category: isSelected ? null : cat.slug, subcategory: null })}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-btn text-xs font-medium text-left transition-colors ${
                        isSelected
                          ? "bg-state-selected text-primaryText font-bold"
                          : "text-mutedText-secondary hover:bg-state-hover hover:text-primaryText"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] font-mono text-mutedText">{cat.resource_count || 0}</span>
                    </button>

                    {/* Subcategories (only when parent is selected) */}
                    {isSelected && cat.subcategories && cat.subcategories.length > 0 && (
                      <div className="pl-3 space-y-0.5 border-l border-subtleBorder ml-2 my-1">
                        {cat.subcategories.map((sub) => {
                          const isSubSelected = initialParams.subcategorySlug === sub.slug;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => updateFilters({ subcategory: isSubSelected ? null : sub.slug })}
                              className={`w-full flex items-center justify-between px-2 py-1 rounded text-[11px] text-left transition-colors ${
                                isSubSelected
                                  ? "bg-state-selected text-primaryText font-bold"
                                  : "text-mutedText-secondary hover:bg-state-hover hover:text-primaryText"
                              }`}
                            >
                              <span>{sub.name}</span>
                              <span className="font-mono text-mutedText">{sub.resource_count || 0}</span>
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

          {/* Access Model Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primaryText mb-2">
              Access & Cost
            </h4>
            <div className="space-y-1">
              {accessOptions.map((opt) => {
                const isSelected = initialParams.accessStatus === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateFilters({ access: isSelected ? null : opt.value })}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-btn text-xs font-medium text-left transition-colors ${
                      isSelected
                        ? "bg-state-selected text-primaryText font-bold"
                        : "text-mutedText-secondary hover:bg-state-hover hover:text-primaryText"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primaryText" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Distribution Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primaryText mb-2">
              Redistribution
            </h4>
            <div className="space-y-1">
              {distributionOptions.map((dist) => {
                const isSelected = initialParams.distributionStatus === dist.value;
                return (
                  <button
                    key={dist.value}
                    type="button"
                    onClick={() => updateFilters({ distribution: isSelected ? null : dist.value })}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-btn text-xs font-medium text-left transition-colors ${
                      isSelected
                        ? "bg-state-selected text-primaryText font-bold"
                        : "text-mutedText-secondary hover:bg-state-hover hover:text-primaryText"
                    }`}
                  >
                    <span>{dist.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primaryText" />}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Main Results Section */}
        <div className="col-span-1 md:col-span-3 space-y-6">
          {/* Controls Bar: Result Count + Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-btn bg-surface border border-subtleBorder text-xs">
            <div className="text-mutedText-secondary">
              Showing <span className="font-bold text-primaryText">{initialData.resources.length}</span> of{" "}
              <span className="font-bold text-primaryText">{initialData.total}</span> verified records
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-mutedText font-medium">Sort by:</span>
              <select
                value={initialParams.sort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="bg-surface-strong border border-subtleBorder text-primaryText rounded-btn px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primaryText cursor-pointer"
              >
                {sortOptions.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {initialParams.query && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-subtleBorder text-xs font-medium text-primaryText">
                  Query: "{initialParams.query}"
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      updateFilters({ q: null });
                    }}
                    className="hover:text-state-danger"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {initialParams.categorySlug && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-subtleBorder text-xs font-medium text-primaryText">
                  Category: {categories.find((c) => c.slug === initialParams.categorySlug)?.name || initialParams.categorySlug}
                  <button
                    type="button"
                    onClick={() => updateFilters({ category: null, subcategory: null })}
                    className="hover:text-state-danger"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {initialParams.subcategorySlug && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-subtleBorder text-xs font-medium text-primaryText">
                  Subcategory: {initialParams.subcategorySlug}
                  <button
                    type="button"
                    onClick={() => updateFilters({ subcategory: null })}
                    className="hover:text-state-danger"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {initialParams.resourceType && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-subtleBorder text-xs font-medium text-primaryText">
                  Type: {resourceTypes.find((t) => t.value === initialParams.resourceType)?.label}
                  <button
                    type="button"
                    onClick={() => updateFilters({ type: null })}
                    className="hover:text-state-danger"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {initialParams.accessStatus && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-subtleBorder text-xs font-medium text-primaryText">
                  Access: {accessOptions.find((a) => a.value === initialParams.accessStatus)?.label}
                  <button
                    type="button"
                    onClick={() => updateFilters({ access: null })}
                    className="hover:text-state-danger"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results Display */}
          {initialData.resources.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {initialData.resources.map((res) => (
                  <ResourceCard key={res.id} resource={res} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {initialData.resources.map((res) => (
                  <ResourceRow key={res.id} resource={res} />
                ))}
              </div>
            )
          ) : (
            /* Empty State */
            <div className="p-12 text-center rounded-panel border border-subtleBorder bg-surface">
              <h3 className="text-base font-bold text-primaryText mb-2">No matching resources found</h3>
              <p className="text-xs text-mutedText-secondary max-w-sm mx-auto mb-6">
                No published entries match the selected combination. Try clearing filters or searching
                for related capabilities.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-4 py-2 rounded-btn bg-state-inverse text-state-inverseText text-xs font-semibold hover:opacity-90"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {initialData.totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-subtleBorder text-xs">
              <button
                type="button"
                disabled={initialData.page <= 1}
                onClick={() => updateFilters({ page: initialData.page - 1 })}
                className="px-3 py-1.5 rounded-btn border border-subtleBorder bg-surface hover:bg-state-hover disabled:opacity-40 disabled:cursor-not-allowed font-medium text-primaryText"
              >
                Previous
              </button>
              <span className="text-mutedText">
                Page {initialData.page} of {initialData.totalPages}
              </span>
              <button
                type="button"
                disabled={initialData.page >= initialData.totalPages}
                onClick={() => updateFilters({ page: initialData.page + 1 })}
                className="px-3 py-1.5 rounded-btn border border-subtleBorder bg-surface hover:bg-state-hover disabled:opacity-40 disabled:cursor-not-allowed font-medium text-primaryText"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer / Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-primaryText/40 backdrop-blur-sm md:hidden">
          <div className="w-full max-w-xs h-full bg-surface-strong p-5 overflow-y-auto border-l border-subtleBorder space-y-6">
            <div className="flex items-center justify-between border-b border-subtleBorder pb-3">
              <h3 className="text-sm font-bold text-primaryText">Filter Catalogue</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded text-mutedText hover:text-primaryText"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primaryText mb-2">Resource Type</h4>
              <div className="space-y-1">
                {resourceTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => {
                      updateFilters({ type: type.value || null });
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded text-xs text-primaryText hover:bg-state-hover font-medium"
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-subtleBorder">
              <button
                type="button"
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2 rounded-btn border border-subtleBorder text-xs font-semibold text-primaryText bg-surface"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
