import React, { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogDiscoveryBrowser } from "@/components/CatalogDiscoveryBrowser";
import { CATALOG_COUNTS } from "@/lib/unified-catalog";

export const metadata: Metadata = {
  title: "Motion & Interactive Prompts — Library | Axes Lab",
  description:
    "Browse 232 customizable motion graphics and interactive website prompts alongside 137 website UI prompts with live video previews.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/prompts",
  },
};

export default function PromptsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="border-b border-rule bg-paper-2 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[var(--container)] mx-auto space-y-2.5">
          <p className="text-xs text-muted font-mono num">
            {CATALOG_COUNTS.motionTotal} customizable motion prompts · {CATALOG_COUNTS.websiteUi} website UI prompts
          </p>
          <h1 className="text-2xl sm:text-4xl font-display font-medium text-ink">
            Prompt Library
          </h1>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            Explore verified website design prompts and motion graphics directives with live video previews, original attribution, and interactive customization.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-xs text-muted">
            Loading prompts…
          </div>
        }
      >
        <CatalogDiscoveryBrowser initialGroup="motion" pageSize={36} />
      </Suspense>
    </div>
  );
}
