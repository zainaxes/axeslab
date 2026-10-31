import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getCollections } from "@/lib/queries";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowRight, Layers } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Curated Collections — Task-Oriented AI Toolchains | Axes Lab",
  description:
    "Explore hand-curated collections of verified AI tools, MCP servers, and open-weight models organized around real engineering tasks.",
};

export default function CollectionsIndexPage() {
  const collections = getCollections();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Collections", href: "/collections" }]} />

      <div className="border-b border-subtleBorder pb-6 max-w-3xl">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-primaryText tracking-tight mb-2">
          Curated Collections
        </h1>
        <p className="text-xs sm:text-sm text-mutedText-secondary leading-relaxed">
          Carefully selected toolchains and resource bundles assembled by editorial engineers to solve
          concrete development, research, and production workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((col) => (
          <Link
            key={col.id}
            href={`/collections/${col.slug}`}
            className="group p-6 rounded-card border border-subtleBorder bg-surface hover:bg-surface-strong hover:border-subtleBorder-strong transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-mutedText font-medium">Editor: {col.editor_name}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-canvas border border-subtleBorder text-primaryText font-semibold">
                  {col.resource_count || 0} tools
                </span>
              </div>
              <h2 className="text-lg font-bold text-primaryText group-hover:underline mb-2">
                {col.title}
              </h2>
              <p className="text-xs text-mutedText-secondary leading-relaxed mb-4">
                {col.description}
              </p>
            </div>
            <div className="pt-3 border-t border-subtleBorder/60 flex items-center justify-between text-xs font-semibold text-primaryText">
              <span>View full collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
