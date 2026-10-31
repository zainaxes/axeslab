import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getResources, getCategories } from "@/lib/queries";
import { WebDesignGallery } from "@/components/WebDesignGallery";
import { Sparkles, Layers, Video, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Web Design Prompts & UI Components — Axes Lab",
  description:
    "Curated collection of 640+ production-grade web design prompts, hero sections, full landing pages, motion backgrounds, and interactive UI animations. Explore at axeslab.zainaxes.com.",
};

export default function WebDesignPage() {
  const result = getResources({
    categorySlug: "web-design",
    limit: 1000, // retrieve all 640+ prompts
    sort: "recent",
  });

  const categories = getCategories();
  const webDesignCategory = categories.find((c) => c.slug === "web-design");

  // Calculate category stats
  const catCountMap = new Map<string, number>();
  for (const r of result.resources) {
    const meta = r.parsed_metadata || {};
    const catName = meta.categoryName || r.subcategory_name || "General";
    catCountMap.set(catName, (catCountMap.get(catName) || 0) + 1);
  }

  const categoryPills = Array.from(catCountMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-[#E9E9E0] text-black dark:bg-[#0A0A0A] dark:text-white">
      {/* Hero Section */}
      <section className="border-b border-black/10 bg-white/40 px-4 py-16 backdrop-blur-md dark:border-white/10 dark:bg-black/40 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-mono font-medium dark:border-white/10 dark:bg-white/10">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>640+ CURATED PROMPTS</span>
                <span>•</span>
                <span className="text-black/60 dark:text-white/60">WEB DESIGN & UI MOTION</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Web Design Prompt Library
              </h1>

              <p className="text-lg text-black/70 dark:text-white/70 leading-relaxed max-w-2xl">
                Explore 640+ production-grade web design prompts with pixel-perfect visual previews, interactive videos, motion backgrounds, and copy-ready specifications. Designed & verified by Axes Lab.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-black/60 dark:text-white/60">
                <div className="flex items-center gap-1.5">
                  <Video className="h-4 w-4" />
                  <span>HD Video & Looping Previews</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4" />
                  <span>120+ UI Design Categories</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Verified by Axes Lab</span>
                </div>
              </div>
            </div>

            {/* Quick Link Card to User Site */}
            <div className="flex flex-col rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 lg:max-w-xs">
              <span className="font-mono text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                Official Hub
              </span>
              <h3 className="mt-1 text-base font-bold text-black dark:text-white">
                Axes Lab Platform
              </h3>
              <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                Full resource catalog, MCP agents, and developer documentation.
              </p>
              <a
                href="https://axeslab.zainaxes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-between rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <span>Visit axeslab.zainaxes.com</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Gallery Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <WebDesignGallery
          resources={result.resources}
          categories={categoryPills}
        />
      </section>
    </div>
  );
}
