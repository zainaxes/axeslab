import React, { Suspense } from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { CatalogDiscoveryBrowser } from "@/components/CatalogDiscoveryBrowser";
import { CATALOG_COUNTS } from "@/lib/unified-catalog";

export const metadata: Metadata = {
  title: "Axes Lab — AI Website Prompts, Motion Directives, Skills & MCP",
  description:
    "Discover 375 verified AI website prompts, motion-design directives, UI sections, agent skills, and Model Context Protocol resources.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <HeroSection totalPublished={CATALOG_COUNTS.total} />

      <Suspense
        fallback={
          <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-xs text-muted">
            Loading resource catalogue…
          </div>
        }
      >
        <CatalogDiscoveryBrowser initialGroup="all" pageSize={36} />
      </Suspense>
    </div>
  );
}
