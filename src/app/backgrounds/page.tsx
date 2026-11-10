import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CatalogDiscoveryBrowser } from "@/components/CatalogDiscoveryBrowser";
import { CATALOG_COUNTS } from "@/lib/unified-catalog";

export const metadata: Metadata = {
  title: "Backgrounds & Shaders — Animated Canvases & Particle Loops",
  description:
    "Explore procedural particle systems, geometric motion backgrounds, WebGL shaders, and looping canvas directives.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/backgrounds",
  },
};

export default function BackgroundsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Backgrounds & Shaders"
        meta={`${CATALOG_COUNTS.backgrounds} background & shader directives`}
        description="Particle systems, geometric animations, WebGL shaders, and looping canvas motion backgrounds."
        breadcrumbs={[{ label: "Backgrounds", href: "/backgrounds" }]}
      />

      <Suspense
        fallback={
          <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-xs text-muted">
            Loading backgrounds…
          </div>
        }
      >
        <CatalogDiscoveryBrowser
          initialGroup="backgrounds"
          lockGroup={true}
          showGroupTabs={false}
          pageSize={36}
        />
      </Suspense>
    </div>
  );
}
