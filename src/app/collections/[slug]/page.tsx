import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getCollectionBySlug } from "@/lib/queries";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResourceCard from "@/components/ResourceCard";

export const dynamic = "force-dynamic";

interface CollectionDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CollectionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);

  if (!col) {
    return { title: "Collection Not Found" };
  }

  return {
    title: `${col.title} | Axes Lab Collections`,
    description: col.description,
    alternates: {
      canonical: `https://axeslab.zainaxes.com/collections/${col.slug}`,
    },
  };
}

export default async function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);

  if (!col) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "Collections", href: "/collections" },
          { label: col.title },
        ]}
      />

      <div className="border-b border-subtleBorder pb-8 max-w-3xl">
        <div className="flex items-center gap-2 mb-3 text-xs text-mutedText">
          <span>Curated by {col.editor_name}</span>
          <span>•</span>
          <span>Updated {new Date(col.updated_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-primaryText tracking-tight mb-3">
          {col.title}
        </h1>
        <p className="text-sm sm:text-base text-mutedText-secondary leading-relaxed mb-4">
          {col.description}
        </p>
        {col.rationale && (
          <div className="p-4 rounded-btn border border-subtleBorder bg-surface text-xs text-mutedText-secondary leading-relaxed">
            <strong className="text-primaryText block mb-1">Editorial Selection Rationale:</strong>
            {col.rationale}
          </div>
        )}
      </div>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-mutedText mb-6">
          Included Resources ({col.resource_count || 0})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {col.resources && col.resources.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      </section>
    </div>
  );
}
