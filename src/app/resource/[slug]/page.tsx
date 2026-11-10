import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Flag } from "lucide-react";
import { getResourceBySlug, getRelatedResources } from "@/lib/queries";
import { ALL_UNIFIED_ITEMS, findUnifiedItemBySlug } from "@/lib/unified-catalog";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ResourcePreviewTheater } from "@/components/ResourcePreviewTheater";
import { SafeMediaImage } from "@/components/SafeMediaImage";
import ResourceCard from "@/components/ResourceCard";
import TypePreview from "@/components/TypePreview";
import {
  AccessBadge,
  DistributionBadge,
  TypeBadge,
  VerificationBadge,
} from "@/components/StatusBadges";

export const dynamic = "force-dynamic";

interface ResourceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ResourceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const unified = findUnifiedItemBySlug(slug);
  if (unified) {
    const title = `${unified.title} — ${unified.category}`;
    const description = unified.summary || undefined;
    return {
      title,
      description,
      alternates: {
        canonical: `https://axeslab.zainaxes.com/resource/${unified.slug}`,
      },
      openGraph: {
        title: `${title} | Axes Lab`,
        description,
        url: `https://axeslab.zainaxes.com/resource/${unified.slug}`,
        type: "article",
        ...(unified.posterUrl ? { images: [{ url: unified.posterUrl }] } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Axes Lab`,
        description,
      },
    };
  }

  const resource = getResourceBySlug(slug);
  if (!resource) {
    return { title: "Resource Not Found" };
  }

  const categoryLabel =
    resource.category_name || resource.resource_type.replace("_", " ");
  const title = resource.seo_title || `${resource.title} — ${categoryLabel}`;
  const description = resource.seo_description || resource.summary || undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `https://axeslab.zainaxes.com/resource/${resource.slug}`,
    },
    openGraph: {
      title: `${resource.title} | Axes Lab`,
      description,
      url: `https://axeslab.zainaxes.com/resource/${resource.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${resource.title} | Axes Lab`,
      description,
    },
  };
}

export default async function ResourceDetailPage({
  params,
}: ResourceDetailPageProps) {
  const { slug } = await params;
  const unified = findUnifiedItemBySlug(slug);

  if (unified) {
    const relatedItems = ALL_UNIFIED_ITEMS.filter(
      (i) =>
        i.slug !== unified.slug &&
        (i.categorySlug === unified.categorySlug ||
          i.subcategory === unified.subcategory)
    ).slice(0, 4);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": unified.isSkill ? "SoftwareSourceCode" : "CreativeWork",
      name: unified.title,
      description: unified.summary,
      url: `https://axeslab.zainaxes.com/resource/${unified.slug}`,
      ...(unified.posterUrl ? { image: unified.posterUrl } : {}),
      creator: {
        "@type": "Person",
        name: unified.author,
      },
      ...(unified.date ? { datePublished: unified.date } : {}),
    };

    return (
      <div className="min-h-screen bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          <Breadcrumbs
            items={[
              {
                label: unified.category,
                href:
                  unified.origin === "web-library"
                    ? `/web-design/${unified.categorySlug}`
                    : "/prompts",
              },
              { label: unified.title },
            ]}
          />

          <ResourcePreviewTheater item={unified} showPermalink={false} />

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <section className="pt-8 border-t border-rule space-y-5">
              <h2 className="text-lg font-display font-medium text-ink">
                Related in {unified.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedItems.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/resource/${rel.slug}`}
                    className="group flex flex-col gap-2 focus-visible:outline-2 focus-visible:outline-accent rounded-card"
                  >
                    <div className="aspect-[16/10] w-full rounded-card overflow-hidden bg-paper-3 border border-rule group-hover:border-rule-2 transition-colors duration-150">
                      <SafeMediaImage
                        src={rel.posterUrl}
                        alt={rel.title}
                        fallbackLabel={rel.subcategory || rel.category}
                        className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="px-0.5">
                      <h3 className="text-sm font-medium text-ink truncate group-hover:text-cool transition-colors duration-150">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-muted truncate">
                        {rel.subcategory || rel.category} · {rel.source}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // Fallback to DB snapshot resource
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

  let schemaType = "CreativeWork";
  if (
    resource.resource_type === "mcp_server" ||
    resource.resource_type === "tool"
  ) {
    schemaType = "SoftwareApplication";
  } else if (resource.resource_type === "dataset") {
    schemaType = "Dataset";
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: resource.title,
    description: resource.summary,
    url: `https://axeslab.zainaxes.com/resource/${resource.slug}`,
    license: resource.license_url || resource.license_name,
    creator: {
      "@type": "Organization",
      name: resource.author_or_publisher || "Axes Lab",
    },
    datePublished: resource.published_at || resource.created_at,
    dateModified: resource.updated_at,
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs
          items={[
            ...(resource.category_name && resource.category_slug
              ? [{ label: resource.category_name, href: `/${resource.category_slug}` }]
              : []),
            ...(resource.subcategory_name &&
            resource.category_slug &&
            resource.subcategory_slug
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

        <header className="border-b border-rule pb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={resource.resource_type} />
            {resource.version_label && (
              <span className="font-mono text-xs px-2 py-0.5 rounded-pill bg-paper-2 border border-rule text-ink">
                {resource.version_label}
              </span>
            )}
            <AccessBadge status={resource.access_status} />
            <DistributionBadge status={resource.distribution_status} />
          </div>

          <h1 className="text-2xl sm:text-4xl font-display font-medium text-ink">
            {resource.title}
          </h1>

          <p className="text-sm text-muted leading-relaxed max-w-3xl">
            {resource.summary}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {resource.canonical_url && (
              <a
                href={resource.canonical_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-pill bg-accent text-accent-ink font-medium text-xs hover:opacity-90 transition-opacity"
              >
                <span>Open Authoritative Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <Link
              href={`/contact?report=${encodeURIComponent(resource.id)}`}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-pill bg-paper-2 border border-rule text-muted hover:text-ink hover:border-rule-2 font-medium text-xs transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Report Issue / Takedown</span>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <TypePreview resource={resource} />

            {resource.description && (
              <section className="space-y-2">
                <h2 className="text-base font-display font-medium text-ink">
                  Overview
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  {resource.description}
                </p>
              </section>
            )}

            {metadata.requirements && metadata.requirements.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-base font-display font-medium text-ink">
                  Runtime Requirements
                </h2>
                <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                  {metadata.requirements.map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="p-5 rounded-card border border-rule bg-paper-2 space-y-2.5 text-xs text-muted leading-relaxed">
              <h2 className="text-sm font-medium text-ink">
                Licensing, Provenance &amp; Attribution
              </h2>
              <p>
                <strong className="text-ink">License:</strong>{" "}
                {resource.license_url ? (
                  <a
                    href={resource.license_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cool hover:underline inline-flex items-center gap-1"
                  >
                    <span>{resource.license_name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-ink">{resource.license_name}</span>
                )}
              </p>
              {resource.attribution_text && (
                <p>
                  <strong className="text-ink">Attribution:</strong>{" "}
                  {resource.attribution_text}
                </p>
              )}
              {resource.rights_notes && (
                <p>
                  <strong className="text-ink">Rights Notes:</strong>{" "}
                  {resource.rights_notes}
                </p>
              )}
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="p-5 rounded-card border border-rule bg-paper-2 space-y-3 text-xs">
              <h3 className="text-xs font-medium text-ink border-b border-rule pb-2">
                Metadata &amp; Provenance
              </h3>

              <dl className="space-y-2.5">
                <div className="flex justify-between gap-2">
                  <dt className="text-muted">Maintainer</dt>
                  <dd className="text-ink font-medium text-right">
                    {resource.author_or_publisher || "Axes Lab"}
                  </dd>
                </div>

                {resource.upstream_repository && (
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted">Repository</dt>
                    <dd className="font-mono text-ink-2 truncate max-w-[170px]">
                      {resource.upstream_repository}
                    </dd>
                  </div>
                )}

                <div className="flex justify-between gap-2">
                  <dt className="text-muted">Verification</dt>
                  <dd>
                    <VerificationBadge
                      status={resource.verification_status}
                      lastChecked={resource.last_checked_at}
                    />
                  </dd>
                </div>

                {resource.source_name && (
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted">Canonical Host</dt>
                    <dd className="text-ink">{resource.source_name}</dd>
                  </div>
                )}
              </dl>
            </div>

            {resource.tags && resource.tags.length > 0 && (
              <div className="p-5 rounded-card border border-rule bg-paper-2 space-y-3">
                <h3 className="text-xs font-medium text-ink">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {resource.tags.map((t) => (
                    <Link
                      key={t}
                      href={`/explore?tag=${encodeURIComponent(t.toLowerCase())}`}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-ink-2 transition-colors"
                    >
                      #{t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="pt-8 border-t border-rule space-y-5">
            <h2 className="text-lg font-display font-medium text-ink">
              Related Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((rel) => (
                <ResourceCard key={rel.id} resource={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
