import React from "react";
import type { Metadata } from "next";
import { getCategories, getResources } from "@/lib/queries";
import { PageHeader } from "@/components/PageHeader";
import ExploreClient from "./ExploreClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explore All Resources — Full Catalogue Index",
  description:
    "Search and filter verified website prompts, UI components, agent skills, and Model Context Protocol resources across the Axes Lab catalogue.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/explore",
  },
};

interface ExplorePageProps {
  searchParams: Promise<{
    q?: string;
    query?: string;
    category?: string;
    subcategory?: string;
    type?: string;
    access?: string;
    distribution?: string;
    verification?: string;
    tag?: string;
    sort?: "recent" | "verified" | "title" | "featured";
    page?: string;
  }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;
  const categories = getCategories();

  const query = params.q || params.query || undefined;
  const categorySlug = params.category || undefined;
  const subcategorySlug = params.subcategory || undefined;
  const resourceType = params.type || undefined;
  const accessStatus = params.access || undefined;
  const distributionStatus = params.distribution || undefined;
  const verificationStatus = params.verification || undefined;
  const tag = params.tag || undefined;
  const sort = params.sort || "featured";
  const page = parseInt(params.page || "1", 10);

  const initialData = getResources({
    query,
    categorySlug,
    subcategorySlug,
    resourceType,
    accessStatus,
    distributionStatus,
    verificationStatus,
    tag,
    sort,
    page,
    limit: 500,
  });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Explore Catalogue"
        meta={`${initialData.resources.length} verified database records`}
        description="Filter verified website UI components, prompts, and resources by category, license, and distribution status."
        breadcrumbs={[{ label: "Explore", href: "/explore" }]}
      />

      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ExploreClient
          categories={categories}
          initialData={initialData}
          initialParams={{
            query: query || "",
            categorySlug: categorySlug || "",
            subcategorySlug: subcategorySlug || "",
            resourceType: resourceType || "",
            accessStatus: accessStatus || "",
            distributionStatus: distributionStatus || "",
            sort,
            page,
          }}
        />
      </div>
    </div>
  );
}
