import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CatalogDiscoveryBrowser } from "@/components/CatalogDiscoveryBrowser";
import { CATALOG_COUNTS } from "@/lib/unified-catalog";

export const metadata: Metadata = {
  title: "Applications — Web Apps, Dashboards & Mobile UI",
  description:
    "Browse application UI prompts covering product interfaces, dashboards, mobile layouts, code directives, and agent skills.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/apps",
  },
};

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Applications & Product UI"
        meta={`${CATALOG_COUNTS.apps} application & product UI resources`}
        description="Specifications for web applications, product interfaces, dashboards, mobile layouts, and developer tooling."
        breadcrumbs={[{ label: "Applications", href: "/apps" }]}
      />

      <Suspense
        fallback={
          <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-xs text-muted">
            Loading applications…
          </div>
        }
      >
        <CatalogDiscoveryBrowser
          initialGroup="apps"
          lockGroup={true}
          showGroupTabs={false}
          pageSize={36}
        />
      </Suspense>
    </div>
  );
}
