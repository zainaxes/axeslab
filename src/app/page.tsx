import React from "react";
import Link from "next/link";
import { getCategories, getResources, getCollections, getStats } from "@/lib/queries";
import ResourceCard from "@/components/ResourceCard";
import {
  Terminal,
  Boxes,
  Server,
  Cpu,
  GitBranch,
  Sliders,
  LayoutTemplate,
  Box,
  Database,
  Wrench,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Search,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const categories = getCategories();
  const { resources: featuredResources } = getResources({ limit: 6, sort: "featured" });
  const { resources: recentlyVerified } = getResources({ limit: 4, sort: "verified" });
  const collections = getCollections();
  const stats = getStats();

  const iconMap: Record<string, React.ElementType> = {
    Terminal,
    Boxes,
    Server,
    Cpu,
    GitBranch,
    Sliders,
    LayoutTemplate,
    Box,
    Database,
    Wrench,
    BookOpen,
  };

  return (
    <div className="space-y-16 py-4">
      {/* 1. Above-the-fold Search & Browse Intro */}
      <section className="pt-6 sm:pt-10 pb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-btn bg-surface border border-subtleBorder text-xs font-semibold text-mutedText-secondary mb-4">
          <span className="w-2 h-2 rounded-full bg-state-success" />
          Independent AI Resource Library
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-primaryText tracking-tight mb-4 leading-tight">
          Discover the tools behind AI.
        </h1>

        <p className="text-sm sm:text-base text-mutedText-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
          A calm, precise reference library of verified prompts, agent skills, MCP servers,
          workflows, and open-source models. Free to search, inspect, and evaluate.
        </p>

        {/* Global Search Bar (prominent) */}
        <div className="relative max-w-xl mx-auto mb-4">
          <Link
            href="/explore"
            className="w-full h-12 px-4 rounded-input border border-subtleBorder bg-surface-strong text-mutedText text-sm flex items-center justify-between hover:border-subtleBorder-strong shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryText"
          >
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-primaryText" />
              <span>Search {stats.totalPublished} verified resources by task, client, or protocol...</span>
            </div>
            <kbd className="font-mono text-xs bg-canvas border border-subtleBorder px-2 py-0.5 rounded text-mutedText-secondary">
              /
            </kbd>
          </Link>
        </div>

        {/* Example Search Chips */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-mutedText">
          <span className="text-[11px] uppercase tracking-wider font-semibold">Try:</span>
          {["Postgres MCP", "Code review skill", "Product photography", "SWE-bench", "Local model"].map((term) => (
            <Link
              key={term}
              href={`/explore?q=${encodeURIComponent(term)}`}
              className="px-2.5 py-1 rounded bg-surface border border-subtleBorder hover:bg-state-hover text-primaryText transition-colors font-medium"
            >
              {term}
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Browse by Resource Type */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primaryText tracking-tight">
              Browse by Resource Type
            </h2>
            <p className="text-xs sm:text-sm text-mutedText-secondary mt-1">
              Structured taxonomies separated by protocol, runtime, and execution model.
            </p>
          </div>
          <Link
            href="/explore"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-primaryText hover:underline"
          >
            All Resources <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon_key || ""] || Terminal;
            return (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="group p-5 rounded-card border border-subtleBorder bg-surface hover:bg-surface-strong hover:border-subtleBorder-strong transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-btn bg-canvas border border-subtleBorder flex items-center justify-center text-primaryText group-hover:bg-state-hover transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-canvas border border-subtleBorder text-mutedText-secondary">
                      {cat.resource_count || 0} items
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-primaryText group-hover:underline mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-mutedText-secondary leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-subtleBorder/60 flex items-center gap-1.5 flex-wrap">
                    {cat.subcategories.slice(0, 3).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-[11px] text-mutedText hover:text-primaryText font-medium"
                      >
                        {sub.name}
                        {cat.subcategories && sub !== cat.subcategories.slice(0, 3)[cat.subcategories.slice(0, 3).length - 1] ? " •" : ""}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Featured & Editor-Selected Resources */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primaryText tracking-tight">
              Featured Verified Resources
            </h2>
            <p className="text-xs sm:text-sm text-mutedText-secondary mt-1">
              Inspected for authentic provenance, permissive licensing, and immediate utility.
            </p>
          </div>
          <Link
            href="/explore"
            className="text-xs font-semibold text-primaryText hover:underline flex items-center gap-1"
          >
            Explore All ({stats.totalPublished}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      {/* 4. Curated Task-Oriented Collections */}
      {collections.length > 0 && (
        <section className="p-6 sm:p-8 rounded-panel border border-subtleBorder bg-surface">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-mutedText uppercase tracking-wider block mb-1">
                Editorial Stacks
              </span>
              <h2 className="text-xl font-bold text-primaryText tracking-tight">
                Curated Task Collections
              </h2>
            </div>
            <Link
              href="/collections"
              className="text-xs font-semibold text-primaryText hover:underline"
            >
              View All Collections →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group p-5 rounded-card border border-subtleBorder bg-surface-strong hover:border-subtleBorder-strong transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-mutedText font-medium">
                      Editor: {col.editor_name}
                    </span>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-surface border border-subtleBorder text-primaryText">
                      {col.resource_count || 0} tools
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-primaryText group-hover:underline mb-2">
                    {col.title}
                  </h3>
                  <p className="text-xs text-mutedText-secondary leading-relaxed mb-3">
                    {col.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-subtleBorder/60 flex items-center justify-between text-xs font-semibold text-primaryText">
                  <span>Inspect collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 5. Recently Verified Resources */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-primaryText tracking-tight">
            Recently Checked & Verified
          </h2>
          <p className="text-xs sm:text-sm text-mutedText-secondary mt-1">
            Rechecked periodically to verify repository health, valid links, and accurate terms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentlyVerified.map((r) => (
            <Link
              key={r.id}
              href={`/resource/${r.slug}`}
              className="p-4 rounded-card border border-subtleBorder bg-surface hover:bg-surface-strong transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-canvas border border-subtleBorder text-mutedText-secondary mb-2 inline-block">
                  {r.resource_type.replace("_", " ")}
                </span>
                <h4 className="text-sm font-bold text-primaryText line-clamp-1 mb-1">{r.title}</h4>
                <p className="text-xs text-mutedText-secondary line-clamp-2">{r.summary}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-subtleBorder/60 text-[11px] text-state-success flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>
                  {r.last_checked_at
                    ? `Checked ${new Date(r.last_checked_at).toLocaleDateString("en-GB", {
                        month: "short",
                        day: "numeric",
                      })}`
                    : "Verified"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. How the Library is Curated (Trust & Standards) */}
      <section className="p-6 sm:p-8 rounded-panel border border-subtleBorder bg-surface grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="w-8 h-8 rounded-btn bg-canvas border border-subtleBorder flex items-center justify-center text-primaryText mb-3">
            <ShieldCheck className="w-4 h-4 text-state-success" />
          </div>
          <h3 className="text-sm font-bold text-primaryText mb-1.5">Rigorous Rights Review</h3>
          <p className="text-xs text-mutedText-secondary leading-relaxed">
            Every entry is evaluated for true distribution rights. We distinguish between open source,
            open weights, and external-only links without making legal assumptions.
          </p>
        </div>

        <div>
          <div className="w-8 h-8 rounded-btn bg-canvas border border-subtleBorder flex items-center justify-center text-primaryText mb-3">
            <FileCheck2 className="w-4 h-4 text-state-info" />
          </div>
          <h3 className="text-sm font-bold text-primaryText mb-1.5">No Fabricated Metrics</h3>
          <p className="text-xs text-mutedText-secondary leading-relaxed">
            No synthetic star ratings, fake download numbers, or AI generated marketing fluff.
            Descriptions are written objectively and technical specs are grounded in source evidence.
          </p>
        </div>

        <div>
          <div className="w-8 h-8 rounded-btn bg-canvas border border-subtleBorder flex items-center justify-center text-primaryText mb-3">
            <CheckCircle2 className="w-4 h-4 text-primaryText" />
          </div>
          <h3 className="text-sm font-bold text-primaryText mb-1.5">Least-Privilege Security</h3>
          <p className="text-xs text-mutedText-secondary leading-relaxed">
            MCP servers and agent skills feature explicit permission matrices (filesystem, network,
            command execution) so developers can evaluate risks before running code.
          </p>
        </div>
      </section>
    </div>
  );
}
