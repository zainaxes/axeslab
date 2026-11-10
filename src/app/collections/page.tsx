import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getCollections } from "@/lib/queries";
import { PageHeader } from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Curated Collections — Task-Oriented Toolchains",
  description:
    "Explore curated collections of verified AI resources, MCP servers, and workflows organized around engineering tasks.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/collections",
  },
};

export default function CollectionsIndexPage() {
  const collections = getCollections();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Curated Collections"
        meta={`${collections.length} curated collections`}
        description="Hand-selected toolchains and resource bundles organized around development and design workflows."
        breadcrumbs={[{ label: "Collections", href: "/collections" }]}
      />

      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group p-6 rounded-card border border-rule bg-paper-2 hover:border-rule-2 transition-colors duration-150 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <span className="text-xs text-muted font-mono">
                  Editor: {col.editor_name}
                </span>
                <h2 className="text-lg font-display font-medium text-ink group-hover:text-cool transition-colors">
                  {col.title}
                </h2>
                <p className="text-xs text-muted leading-relaxed">
                  {col.description}
                </p>
              </div>
              <div className="pt-3 border-t border-rule flex items-center justify-between text-xs font-medium text-ink">
                <span>View collection</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-ink" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
