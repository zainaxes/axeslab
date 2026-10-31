import React, { Suspense } from "react";
import { getCategories, getResources } from "@/lib/queries";
import ExploreClient from "./ExploreClient";
import Breadcrumbs from "@/components/Breadcrumbs";

export const dynamic = "force-dynamic";

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
    limit: 24,
  });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Explore Catalogue", href: "/explore" }]} />
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
          sort: sort,
          page: page,
        }}
      />
    </div>
  );
}
