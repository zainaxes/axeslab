import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CatalogDiscoveryBrowser } from "@/components/CatalogDiscoveryBrowser";
import { CATALOG_COUNTS } from "@/lib/unified-catalog";

export const metadata: Metadata = {
  title: "3D Websites — WebGL, Three.js & Spatial Interfaces",
  description:
    "Explore interactive 3D WebGL website prompts, Three.js scenes, Spline integrations, and spatial UI specifications.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/3d-websites",
  },
};

export default function ThreeDWebsitesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="3D & Spatial Websites"
        meta={`${CATALOG_COUNTS.threeD} 3D & WebGL prompts`}
        description="Interactive Three.js scenes, WebGL shaders, Spline layouts, and spatial web specifications with video previews."
        breadcrumbs={[{ label: "3D Websites", href: "/3d-websites" }]}
      />

      <Suspense
        fallback={
          <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-xs text-muted">
            Loading 3D website prompts…
          </div>
        }
      >
        <CatalogDiscoveryBrowser
          initialGroup="3d"
          lockGroup={true}
          showGroupTabs={false}
          pageSize={36}
        />
      </Suspense>
    </div>
  );
}
