import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getCategoryBySlug, getResources } from "@/lib/queries";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResourceCard from "@/components/ResourceCard";

export const dynamic = "force-dynamic";

interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { category: catSlug, subcategory: subSlug } = await params;
  const parent = getCategoryBySlug(catSlug);
  const sub = getCategoryBySlug(subSlug);

  if (!parent || !sub) {
    return { title: "Subcategory Not Found" };
  }

  return {
    title: `${sub.name} — ${parent.name} | Axes Lab`,
    description: sub.description || `Browse verified ${sub.name} resources in the Axes Lab directory.`,
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

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category: catSlug, subcategory: subSlug } = await params;
  const parent = getCategoryBySlug(catSlug);
  const sub = getCategoryBySlug(subSlug);

  if (!parent || !sub || sub.parent_id !== parent.id) {
    notFound();
  }

  const { resources, total } = getResources({
    categorySlug: parent.slug,
    subcategorySlug: sub.slug,
    limit: 24,
  });

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: parent.name, href: `/${parent.slug}` },
          { label: sub.name, href: `/${parent.slug}/${sub.slug}` },
        ]}
      />

      {/* Header */}
      <div className="border-b border-subtleBorder pb-6 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primaryText tracking-tight mb-2">
          {sub.name}
        </h1>
        <p className="text-xs sm:text-sm text-mutedText-secondary leading-relaxed">
          {sub.description}
        </p>
      </div>

      {/* Resource Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">
            Available Resources ({total})
          </h2>
          <Link
            href={`/explore?category=${parent.slug}&subcategory=${sub.slug}`}
            className="text-xs font-semibold text-primaryText hover:underline"
          >
            Faceted Filter View →
          </Link>
        </div>

        {resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-panel border border-subtleBorder bg-surface">
            <h3 className="text-sm font-bold text-primaryText mb-1">No verified entries yet</h3>
            <p className="text-xs text-mutedText-secondary max-w-xs mx-auto mb-4">
              Resources for {sub.name} are currently in editorial review.
            </p>
            <Link
              href="/submit"
              className="inline-block px-3 py-1.5 rounded-btn bg-state-inverse text-state-inverseText text-xs font-semibold"
            >
              Submit a Resource
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
