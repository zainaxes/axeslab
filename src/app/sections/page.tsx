import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CatalogDiscoveryBrowser } from "@/components/CatalogDiscoveryBrowser";
import { CATALOG_COUNTS } from "@/lib/unified-catalog";

export const metadata: Metadata = {
  title: "UI Sections — Hero Sections, Pricing Grids & Footers",
  description:
    "Browse curated hero sections, pricing matrices, feature grids, footers, marquees, and authentication layouts with visual previews.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/sections",
  },
};

export default function SectionsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="UI Sections & Blocks"
        meta={`${CATALOG_COUNTS.sections} section prompts`}
        description="Hero sections, pricing grids, feature blocks, footers, marquees, and form layouts with live previews."
        breadcrumbs={[{ label: "UI Sections", href: "/sections" }]}
      />

      <Suspense
        fallback={
          <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-xs text-muted">
            Loading UI sections…
          </div>
        }
      >
        <CatalogDiscoveryBrowser
          initialGroup="sections"
          lockGroup={true}
          showGroupTabs={false}
          pageSize={36}
        />
      </Suspense>
    </div>
  );
}
