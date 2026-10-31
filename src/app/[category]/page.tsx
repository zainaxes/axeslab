import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getCategoryBySlug, getResources } from "@/lib/queries";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResourceCard from "@/components/ResourceCard";
import { ArrowRight, Terminal } from "lucide-react";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: catSlug } = await params;
  const category = getCategoryBySlug(catSlug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} — AI Resource Directory`,
    description: category.description || `Browse verified ${category.name} in the Axes Lab independent AI directory.`,
    alternates: {
      canonical: `https://axeslab.org/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Axes Lab`,
      description: category.description || undefined,
      url: `https://axeslab.org/${category.slug}`,
    },
  };
}

export default async function MainCategoryPage({ params }: CategoryPageProps) {
  const { category: catSlug } = await params;
  const category = getCategoryBySlug(catSlug);

  if (!category || category.parent_id !== null) {
    notFound();
  }

  const { resources, total } = getResources({
    categorySlug: category.slug,
    limit: 24,
  });

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `https://axeslab.org/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: resources.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.title,
        url: `https://axeslab.org/resource/${r.slug}`,
      })),
    },
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs items={[{ label: category.name, href: `/${category.slug}` }]} />

      {/* Header */}
      <div className="border-b border-subtleBorder pb-6 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primaryText tracking-tight mb-2">
          {category.name}
        </h1>
        <p className="text-sm sm:text-base text-mutedText-secondary leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Subcategory Navigation Grid */}
      {category.subcategories && category.subcategories.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-mutedText mb-4">
            Subcategories in {category.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/${category.slug}/${sub.slug}`}
                className="group p-4 rounded-card border border-subtleBorder bg-surface hover:bg-surface-strong hover:border-subtleBorder-strong transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-primaryText group-hover:underline">
                      {sub.name}
                    </h3>
                    <span className="text-xs font-mono text-mutedText bg-canvas border border-subtleBorder px-2 py-0.5 rounded">
                      {sub.resource_count || 0}
                    </span>
                  </div>
                  <p className="text-xs text-mutedText-secondary line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 text-[11px] font-semibold text-primaryText flex items-center gap-1">
                  <span>Explore subcategory</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Resources in this Category */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primaryText tracking-tight">
            Published Resources ({total})
          </h2>
          <Link
            href={`/explore?category=${category.slug}`}
            className="text-xs font-semibold text-primaryText hover:underline"
          >
            Filter & Search within {category.name} →
          </Link>
        </div>

        {resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-panel border border-subtleBorder bg-surface text-xs text-mutedText">
            No published items currently in this parent category.
          </div>
        )}
      </section>
    </div>
  );
}
