import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryBySlug, getResources } from "@/lib/queries";
import { PageHeader } from "@/components/PageHeader";
import ResourceCard from "@/components/ResourceCard";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: catSlug } = await params;
  const category = getCategoryBySlug(catSlug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} — Resource Directory`,
    description:
      category.description ||
      `Browse verified ${category.name} resources in the Axes Lab library.`,
    alternates: {
      canonical: `https://axeslab.zainaxes.com/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Axes Lab`,
      description: category.description || undefined,
      url: `https://axeslab.zainaxes.com/${category.slug}`,
    },
  };
}

export default async function MainCategoryPage({ params }: CategoryPageProps) {
  const { category: catSlug } = await params;
  const category = getCategoryBySlug(catSlug);

  if (!category || category.parent_id !== null) {
    notFound();
  }

  const allRows = getResources({
    categorySlug: category.slug,
    limit: 500,
  }).resources;

  const resources = allRows.filter(
    (r) =>
      r.primary_category_id === category.id ||
      r.category_slug === category.slug
  );

  // Compute factual counts per subcategory
  const subCounts = new Map<string, number>();
  for (const r of resources) {
    if (r.subcategory_id) {
      subCounts.set(r.subcategory_id, (subCounts.get(r.subcategory_id) || 0) + 1);
    }
  }

  const activeSubcats = (category.subcategories || [])
    .map((s) => ({ ...s, exactCount: subCounts.get(s.id) || 0 }))
    .filter((s) => s.exactCount > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `https://axeslab.zainaxes.com/${category.slug}`,
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        title={category.name}
        meta={`${resources.length} resources`}
        description={category.description || undefined}
        breadcrumbs={[{ label: category.name, href: `/${category.slug}` }]}
      >
        <Link
          href={`/explore?category=${category.slug}`}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-xs font-medium text-ink transition-colors duration-150"
        >
          <span>Filter in Explorer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </PageHeader>

      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {activeSubcats.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-base font-display font-medium text-ink">
              Subcategories in {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {activeSubcats.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/${category.slug}/${sub.slug}`}
                  className="group p-4 rounded-card border border-rule bg-paper-2 hover:border-rule-2 flex flex-col justify-between gap-2 transition-colors duration-150"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-medium text-ink group-hover:text-cool transition-colors">
                        {sub.name}
                      </h3>
                      <span className="text-xs font-mono text-muted num">
                        {sub.exactCount}
                      </span>
                    </div>
                    {sub.description && (
                      <p className="text-xs text-muted line-clamp-2 mt-1">
                        {sub.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-5">
          <h2 className="text-base font-display font-medium text-ink">
            Resources ({resources.length})
          </h2>

          {resources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
              {resources.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center rounded-card border border-rule bg-paper-2 text-xs text-muted">
              No published resources currently in this category.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
