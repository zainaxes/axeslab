import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollectionBySlug } from "@/lib/queries";
import { PageHeader } from "@/components/PageHeader";
import ResourceCard from "@/components/ResourceCard";

export const dynamic = "force-dynamic";

interface CollectionDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CollectionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);

  if (!col) {
    return { title: "Collection Not Found" };
  }

  return {
    title: `${col.title} — Collections`,
    description: col.description,
    alternates: {
      canonical: `https://axeslab.zainaxes.com/collections/${col.slug}`,
    },
  };
}

export default async function CollectionDetailPage({
  params,
}: CollectionDetailPageProps) {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);

  if (!col) {
    notFound();
  }

  const items = col.resources || [];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title={col.title}
        meta={`Curated by ${col.editor_name}`}
        description={col.description}
        breadcrumbs={[
          { label: "Collections", href: "/collections" },
          { label: col.title },
        ]}
      />

      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {col.rationale && (
          <div className="p-4 rounded-card border border-rule bg-paper-2 text-xs text-muted leading-relaxed max-w-3xl">
            <strong className="text-ink block mb-1">
              Editorial Selection Rationale
            </strong>
            {col.rationale}
          </div>
        )}

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
            {items.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        ) : (
          <div className="p-10 text-center rounded-card border border-rule bg-paper-2 text-xs text-muted">
            No published items are currently assigned to this collection.
          </div>
        )}
      </div>
    </div>
  );
}
