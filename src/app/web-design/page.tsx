import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CatalogDiscoveryBrowser } from "@/components/CatalogDiscoveryBrowser";
import { CATALOG_COUNTS } from "@/lib/unified-catalog";

export const metadata: Metadata = {
  title: "Web Design Prompts — Landing Pages & UI Components",
  description:
    "Explore 137 curated website design prompts, landing pages, hero sections, SaaS interfaces, and interactive UI components with live visual previews.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/web-design",
  },
};

export default function WebDesignPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Web Design Prompts"
        meta={`${CATALOG_COUNTS.websiteUi} curated website prompts`}
        description="Production-grade website design prompts covering landing pages, hero sections, SaaS layouts, and UI components. Open any preview to show and copy the complete original prompt."
        breadcrumbs={[{ label: "Web Design", href: "/web-design" }]}
      >
        <Link
          href="/categories"
          className="inline-flex items-center h-9 px-4 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-xs font-medium text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
        >
          Browse by category
        </Link>
      </PageHeader>

      <Suspense
        fallback={
          <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-xs text-muted">
            Loading web design prompts…
          </div>
        }
      >
        <CatalogDiscoveryBrowser
          initialGroup="website-ui"
          lockGroup={true}
          showGroupTabs={false}
          pageSize={36}
        />
      </Suspense>
    </div>
  );
}
