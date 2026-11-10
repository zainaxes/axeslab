import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCategoryBySlug, getResources } from "@/lib/queries";
import { PageHeader } from "@/components/PageHeader";
import ResourceCard from "@/components/ResourceCard";

export const dynamic = "force-dynamic";

interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const { category: catSlug, subcategory: subSlug } = await params;
  const parent = getCategoryBySlug(catSlug);
  const sub = getCategoryBySlug(subSlug);

  if (!parent || !sub) {
    return { title: "Subcategory Not Found" };
  }

  return {
    title: `${sub.name} — ${parent.name}`,
    description:
      sub.description ||
      `Browse verified ${sub.name} resources in the Axes Lab ${parent.name} directory.`,
    alternates: {
      canonical: `https://axeslab.zainaxes.com/${parent.slug}/${sub.slug}`,
    },
    openGraph: {
      title: `${sub.name} | Axes Lab`,
      description: sub.description || undefined,
      url: `https://axeslab.zainaxes.com/${parent.slug}/${sub.slug}`,
    },
  };
}

export default async function SubcategoryPage({
  params,
}: SubcategoryPageProps) {
  const { category: catSlug, subcategory: subSlug } = await params;
  const parent = getCategoryBySlug(catSlug);
  const sub = getCategoryBySlug(subSlug);

  if (!parent || !sub || sub.parent_id !== parent.id) {
    notFound();
  }

  const allRows = getResources({
    categorySlug: parent.slug,
    subcategorySlug: sub.slug,
    limit: 500,
  }).resources;

  const resources = allRows.filter(
    (r) =>
      r.subcategory_id === sub.id ||
      r.subcategory_slug === sub.slug ||
      r.parsed_metadata?.categoryName?.toLowerCase() === sub.name.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title={sub.name}
        meta={`${resources.length} resources in ${parent.name}`}
        description={sub.description || undefined}
        breadcrumbs={[
          { label: parent.name, href: `/${parent.slug}` },
          { label: sub.name, href: `/${parent.slug}/${sub.slug}` },
        ]}
      >
        <Link
          href="/categories"
          className="inline-flex items-center h-9 px-4 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-xs font-medium text-ink transition-colors duration-150"
        >
          All categories
        </Link>
      </PageHeader>

      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {resources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
            {resources.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-card border border-rule bg-paper-2 space-y-3 max-w-md mx-auto">
            <h2 className="text-base font-display font-medium text-ink">
              No published entries in {sub.name}
            </h2>
            <p className="text-xs text-muted">
              Browse all categories or submit a resource for this topic.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <Link
                href="/categories"
                className="px-4 py-2 rounded-pill bg-paper-3 border border-rule text-xs font-medium text-ink hover:border-rule-2"
              >
                All categories
              </Link>
              <Link
                href="/submit"
                className="px-4 py-2 rounded-pill bg-accent text-accent-ink text-xs font-medium hover:opacity-90"
              >
                Submit resource
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
