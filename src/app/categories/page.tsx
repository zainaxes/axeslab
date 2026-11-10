import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SafeMediaImage } from "@/components/SafeMediaImage";
import { getCategories, getResources } from "@/lib/queries";
import {
  ALL_UNIFIED_ITEMS,
  CATALOG_COUNTS,
  UNIFIED_MOTION_ITEMS,
  UNIFIED_WEB_LIBRARY_ITEMS,
} from "@/lib/unified-catalog";
import { SUBCATEGORIES } from "@/lib/real-prompts";
import { TEMPLATES } from "@/lib/templates-data";

export const metadata: Metadata = {
  title: "Categories — Complete Resource Taxonomy",
  description:
    "Browse every non-empty resource category and topic across Axes Lab: website UI prompts, motion graphics, UI sections, 3D websites, backgrounds, applications, and agent skills.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/categories",
  },
};

export default function CategoriesPage() {
  const dbCategories = getCategories();
  const allDbResources = getResources({ limit: 1000 }).resources;
  const webDesignParent = dbCategories.find((c) => c.slug === "web-design");

  // Compute exact factual counts per subcategory from published resources
  const subCountMap = new Map<string, number>();
  for (const res of allDbResources) {
    if (res.subcategory_id) {
      subCountMap.set(
        res.subcategory_id,
        (subCountMap.get(res.subcategory_id) || 0) + 1
      );
    }
  }

  const webDesignSubcats = (webDesignParent?.subcategories || [])
    .map((sub) => ({
      ...sub,
      exactCount: subCountMap.get(sub.id) || 0,
    }))
    .filter((s) => s.exactCount > 0)
    .sort((a, b) => b.exactCount - a.exactCount || a.name.localeCompare(b.name));

  // Build representative preview map for Web Design subcategories
  const webSubcatPreviews = new Map<string, string>();
  for (const item of UNIFIED_WEB_LIBRARY_ITEMS) {
    if (item.categorySlug && !webSubcatPreviews.has(item.categorySlug) && item.posterUrl) {
      webSubcatPreviews.set(item.categorySlug, item.posterUrl);
    }
  }

  const primaryCollections = [
    {
      name: "Website Design Prompts",
      count: CATALOG_COUNTS.websiteUi,
      href: "/web-design",
      description:
        "Landing pages, hero sections, SaaS layouts, and UI components ready to view and copy.",
      preview: UNIFIED_WEB_LIBRARY_ITEMS[0]?.posterUrl,
    },
    {
      name: "Motion Graphics & Showreels",
      count: CATALOG_COUNTS.motionAds,
      href: "/prompts",
      description:
        "Customizable motion design prompts with timeline, pacing, and visual parameter controls.",
      preview: UNIFIED_MOTION_ITEMS.find((i) => i.category === "Motion Ads")?.posterUrl,
    },
    {
      name: "Interactive Website Motion",
      count: CATALOG_COUNTS.websiteMotion,
      href: "/prompts",
      description:
        "UI state morphing, scroll choreography, and interactive product demos connected to the customizer.",
      preview: UNIFIED_MOTION_ITEMS.find((i) => i.category === "Website Prompts")?.posterUrl,
    },
    {
      name: "UI Sections & Blocks",
      count: CATALOG_COUNTS.sections,
      href: "/sections",
      description:
        "Hero sections, pricing grids, feature blocks, footers, marquees, and authentication layouts.",
      preview: ALL_UNIFIED_ITEMS.find((i) => i.isSection)?.posterUrl,
    },
    {
      name: "3D & WebGL Websites",
      count: CATALOG_COUNTS.threeD,
      href: "/3d-websites",
      description:
        "Three.js scenes, spatial layouts, shaders, and interactive 3D web experiences.",
      preview: ALL_UNIFIED_ITEMS.find((i) => i.is3D)?.posterUrl,
    },
    {
      name: "Applications & Product UI",
      count: CATALOG_COUNTS.apps,
      href: "/apps",
      description:
        "Dashboard interfaces, mobile layouts, developer tools, and interactive product screens.",
      preview: ALL_UNIFIED_ITEMS.find((i) => i.isApp)?.posterUrl,
    },
    {
      name: "Backgrounds & Shaders",
      count: CATALOG_COUNTS.backgrounds,
      href: "/backgrounds",
      description:
        "Particle systems, procedural geometry, and looping visual background directives.",
      preview: ALL_UNIFIED_ITEMS.find((i) => i.isBackground)?.posterUrl,
    },
    {
      name: "Agent Skills",
      count: CATALOG_COUNTS.skills,
      href: "/skills",
      description:
        "Open-source skill bundles with CLI installation commands and upstream repositories.",
      preview: UNIFIED_MOTION_ITEMS.find((i) => i.isSkill)?.posterUrl,
    },
    {
      name: "Reusable Blueprint Templates",
      count: TEMPLATES.length,
      href: "/templates",
      description:
        "Parameterized prompt templates built specifically for customization.",
      preview: TEMPLATES[0]?.poster,
    },
  ].filter((c) => c.count > 0);

  const motionTopics = SUBCATEGORIES.filter((s) => s !== "All")
    .map((topic) => {
      const matching = UNIFIED_MOTION_ITEMS.filter(
        (item) =>
          item.subcategory.toLowerCase() === topic.toLowerCase() ||
          item.subcategories.some((s) => s.toLowerCase() === topic.toLowerCase())
      );
      return {
        name: topic,
        count: matching.length,
        preview: matching[0]?.posterUrl,
        href: `/prompts?topic=${encodeURIComponent(topic)}`,
      };
    })
    .filter((t) => t.count > 0);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Categories"
        meta={`${primaryCollections.length} collections · ${webDesignSubcats.length} web categories · ${motionTopics.length} motion topics`}
        description="Browse the complete Axes Lab taxonomy across website UI prompts, motion graphics, sections, 3D scenes, backgrounds, and agent skills."
        breadcrumbs={[{ label: "Categories", href: "/categories" }]}
      />

      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {/* 1. Primary Resource Collections */}
        <section className="space-y-5">
          <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
            <h2 className="text-lg font-display font-medium text-ink">
              Catalogue Collections
            </h2>
            <span className="text-xs font-mono text-muted num">
              {CATALOG_COUNTS.total} total indexed items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {primaryCollections.map((col) => (
              <Link
                key={col.name}
                href={col.href}
                className="group rounded-card border border-rule bg-paper-2 hover:border-rule-2 overflow-hidden flex flex-col transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="relative aspect-[16/9] w-full bg-paper-3 overflow-hidden border-b border-rule">
                  <SafeMediaImage
                    src={col.preview}
                    alt={col.name}
                    fallbackLabel={col.name}
                    className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-display font-medium text-ink group-hover:text-cool transition-colors duration-150">
                        {col.name}
                      </h3>
                      <span className="font-mono text-xs px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-ink-2 num shrink-0">
                        {col.count}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      {col.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-rule">
                    <span>Open collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:text-ink transition-colors duration-150" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 2. Web Design & UI Categories */}
        {webDesignSubcats.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
              <h2 className="text-lg font-display font-medium text-ink">
                Web Design &amp; UI Categories
              </h2>
              <Link
                href="/web-design"
                className="text-xs text-cool hover:underline"
              >
                View all web design
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {webDesignSubcats.map((sub) => {
                const preview = webSubcatPreviews.get(sub.slug);
                return (
                  <Link
                    key={sub.id}
                    href={`/web-design/${sub.slug}`}
                    className="group rounded-card border border-rule bg-paper-2 hover:border-rule-2 overflow-hidden flex flex-col transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {preview && (
                      <div className="aspect-[16/9] w-full bg-paper-3 overflow-hidden border-b border-rule">
                        <SafeMediaImage
                          src={preview}
                          alt={sub.name}
                          fallbackLabel={sub.name}
                          className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-medium text-ink group-hover:text-cool transition-colors duration-150 truncate">
                            {sub.name}
                          </h3>
                          <span className="font-mono text-xs text-muted num shrink-0">
                            {sub.exactCount}
                          </span>
                        </div>
                        {sub.description && (
                          <p className="text-xs text-muted line-clamp-2 mt-1 leading-relaxed">
                            {sub.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* 3. Motion & Technique Topics */}
        <section className="space-y-5">
          <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
            <h2 className="text-lg font-display font-medium text-ink">
              Motion &amp; Technique Topics
            </h2>
            <Link href="/prompts" className="text-xs text-cool hover:underline">
              View all motion prompts
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {motionTopics.map((topic) => (
              <Link
                key={topic.name}
                href={topic.href}
                className="group rounded-card border border-rule bg-paper-2 hover:border-rule-2 p-3.5 flex items-center gap-3.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="w-20 aspect-[16/10] rounded-pill bg-paper-3 border border-rule overflow-hidden shrink-0">
                  <SafeMediaImage
                    src={topic.preview}
                    alt={topic.name}
                    fallbackLabel={topic.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-ink group-hover:text-cool transition-colors duration-150 truncate">
                    {topic.name}
                  </h3>
                  <p className="text-xs font-mono text-muted mt-0.5 num">
                    {topic.count} directives
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-ink shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
