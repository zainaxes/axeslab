import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getResourceBySlug, getRelatedResources } from "@/lib/queries";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResourceCard from "@/components/ResourceCard";
import TypePreview from "@/components/TypePreview";
import { AccessBadge, DistributionBadge, VerificationBadge, TypeBadge } from "@/components/StatusBadges";
import {
  ExternalLink,
  ShieldAlert,
  Calendar,
  Layers,
  Flag,
  FileCode,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface ResourceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ResourceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return { title: "Resource Not Found" };
  }

  const title = resource.seo_title || `${resource.title} — ${resource.resource_type.replace("_", " ").toUpperCase()}`;
  const description = resource.seo_description || resource.summary;

  return {
    title: `${title} | Axes Lab`,
    description,
    alternates: {
      canonical: `https://axeslab.org/resource/${resource.slug}`,
    },
    openGraph: {
      title: `${resource.title} | Axes Lab`,
      description,
      url: `https://axeslab.org/resource/${resource.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${resource.title} | Axes Lab`,
      description,
    },
  };
}

export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const related = getRelatedResources(
    resource.id,
    resource.primary_category_id,
    resource.subcategory_id,
    3
  );

  const metadata = resource.parsed_metadata || {};

  // JSON-LD Structured Data
  let schemaType = "CreativeWork";
  if (resource.resource_type === "mcp_server" || resource.resource_type === "tool") {
    schemaType = "SoftwareApplication";
  } else if (resource.resource_type === "dataset") {
    schemaType = "Dataset";
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: resource.title,
    description: resource.summary,
    url: `https://axeslab.org/resource/${resource.slug}`,
    license: resource.license_url || resource.license_name,
    creator: {
      "@type": "Organization",
      name: resource.author_or_publisher || "Axes Lab Verified Contributor",
    },
    datePublished: resource.published_at || resource.created_at,
    dateModified: resource.updated_at,
    isAccessibleForFree: resource.access_status.startsWith("free") || resource.access_status.includes("open"),
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          ...(resource.category_name && resource.category_slug
            ? [{ label: resource.category_name, href: `/${resource.category_slug}` }]
            : []),
          ...(resource.subcategory_name && resource.category_slug && resource.subcategory_slug
            ? [
                {
                  label: resource.subcategory_name,
                  href: `/${resource.category_slug}/${resource.subcategory_slug}`,
                },
              ]
            : []),
          { label: resource.title },
        ]}
      />

      {/* Top Resource Hero / Metadata */}
      <div className="border-b border-subtleBorder pb-8">
        <div className="flex items-center gap-2 mb-3">
          <TypeBadge type={resource.resource_type} />
          {resource.version_label && (
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface border border-subtleBorder text-primaryText font-semibold">
              {resource.version_label}
            </span>
          )}
          <AccessBadge status={resource.access_status} />
          <DistributionBadge status={resource.distribution_status} />
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-primaryText tracking-tight mb-3">
          {resource.title}
        </h1>

        <p className="text-sm sm:text-base text-mutedText-secondary leading-relaxed max-w-3xl mb-6">
          {resource.summary}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {resource.canonical_url && (
            <a
              href={resource.canonical_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn bg-state-inverse text-state-inverseText font-semibold text-xs hover:opacity-90 transition-opacity"
            >
              <span>Open Authoritative Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <Link
            href={`/contact?report=${encodeURIComponent(resource.id)}`}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-btn bg-surface border border-subtleBorder text-mutedText-secondary hover:text-primaryText hover:bg-state-hover font-medium text-xs transition-colors"
          >
            <Flag className="w-3.5 h-3.5 text-mutedText" />
            Report Issue / Takedown
          </Link>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Preview & Detailed Documentation (approx 8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Type-Specific Interactive Content */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-mutedText mb-3">
              Resource Instructions & Content
            </h2>
            <TypePreview resource={resource} />
          </section>

          {/* Description & Technical Rationale */}
          {resource.description && (
            <section className="space-y-3">
              <h2 className="text-base font-bold text-primaryText tracking-tight">
                Overview & Practical Rationale
              </h2>
              <div className="prose prose-sm text-xs sm:text-sm text-mutedText-secondary leading-relaxed space-y-2">
                <p>{resource.description}</p>
              </div>
            </section>
          )}

          {/* Technical Requirements & Compatibility */}
          {metadata.requirements && metadata.requirements.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-base font-bold text-primaryText tracking-tight">
                Runtime Requirements
              </h2>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-mutedText-secondary space-y-1">
                {metadata.requirements.map((req: string, i: number) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Rights, Provenance & Attribution Policy */}
          <section className="p-5 rounded-panel border border-subtleBorder bg-surface space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primaryText">
              Licensing, Provenance & Attribution
            </h2>
            <div className="text-xs text-mutedText-secondary space-y-2 leading-relaxed">
              <p>
                <strong>License:</strong>{" "}
                {resource.license_url ? (
                  <a
                    href={resource.license_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primaryText underline inline-flex items-center gap-1"
                  >
                    {resource.license_name} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="font-semibold text-primaryText">{resource.license_name}</span>
                )}
                {resource.license_scope && ` (${resource.license_scope} scope)`}
              </p>
              {resource.attribution_text && (
                <p>
                  <strong>Attribution:</strong> {resource.attribution_text}
                </p>
              )}
              {resource.rights_notes && (
                <p>
                  <strong>Rights Notes:</strong> {resource.rights_notes}
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Right Information Rail (approx 4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-panel border border-subtleBorder bg-surface space-y-4 text-xs">
            <h3 className="font-bold text-primaryText uppercase tracking-wider text-[11px] border-b border-subtleBorder pb-2">
              Metadata & Provenance
            </h3>

            <div className="space-y-3 divide-y divide-subtleBorder/60">
              <div className="pt-2 flex justify-between">
                <span className="text-mutedText">Maintainer / Author</span>
                <span className="font-semibold text-primaryText text-right">
                  {resource.author_or_publisher || "Verified"}
                </span>
              </div>

              {resource.upstream_repository && (
                <div className="pt-2 flex justify-between">
                  <span className="text-mutedText">Repository</span>
                  <span className="font-mono text-primaryText truncate max-w-[150px]">
                    {resource.upstream_repository}
                  </span>
                </div>
              )}

              <div className="pt-2 flex justify-between">
                <span className="text-mutedText">Verification Status</span>
                <VerificationBadge
                  status={resource.verification_status}
                  lastChecked={resource.last_checked_at}
                />
              </div>

              {resource.last_checked_at && (
                <div className="pt-2 flex justify-between">
                  <span className="text-mutedText">Last Checked</span>
                  <span className="font-mono text-mutedText-secondary">
                    {new Date(resource.last_checked_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}

              {resource.source_name && (
                <div className="pt-2 flex justify-between">
                  <span className="text-mutedText">Canonical Host</span>
                  <span className="font-semibold text-primaryText">{resource.source_name}</span>
                </div>
              )}

              <div className="pt-2 flex justify-between">
                <span className="text-mutedText">Redistribution</span>
                <span className="font-medium text-primaryText">
                  {resource.distribution_status === "host_allowed" ? "Hosted Download" : "Official Link Only"}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="p-5 rounded-panel border border-subtleBorder bg-surface">
              <h3 className="font-bold text-primaryText uppercase tracking-wider text-[11px] mb-3">
                Classification Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {resource.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/explore?tag=${encodeURIComponent(t.toLowerCase())}`}
                    className="font-mono text-[11px] px-2 py-1 rounded bg-canvas border border-subtleBorder hover:bg-state-hover text-primaryText transition-colors"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Related Resources */}
      {related.length > 0 && (
        <section className="pt-8 border-t border-subtleBorder">
          <h2 className="text-xl font-bold text-primaryText tracking-tight mb-4">
            Related & Alternative Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((rel) => (
              <ResourceCard key={rel.id} resource={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
