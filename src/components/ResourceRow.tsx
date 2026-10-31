"use client";

import React from "react";
import Link from "next/link";
import { Resource } from "@/types";
import { AccessBadge, VerificationBadge, TypeBadge } from "./StatusBadges";
import { ArrowUpRight } from "lucide-react";

export default function ResourceRow({ resource }: { resource: Resource }) {
  const detailUrl = resource.category_slug && resource.subcategory_slug
    ? `/${resource.category_slug}/${resource.subcategory_slug}/${resource.slug}`
    : `/resource/${resource.slug}`;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-btn border border-subtleBorder bg-surface hover:bg-surface-strong transition-all gap-4">
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-2 mb-1">
          <TypeBadge type={resource.resource_type} />
          {resource.subcategory_name && (
            <span className="text-xs text-mutedText-secondary font-medium">
              / {resource.subcategory_name}
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-primaryText truncate mb-1">
          <Link href={detailUrl} className="hover:underline">
            {resource.title}
          </Link>
        </h3>
        <p className="text-xs text-mutedText-secondary line-clamp-1">{resource.summary}</p>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-subtleBorder/60">
        <AccessBadge status={resource.access_status} />
        <VerificationBadge
          status={resource.verification_status}
          lastChecked={resource.last_checked_at}
        />
        <Link
          href={detailUrl}
          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-btn bg-canvas border border-subtleBorder hover:bg-state-hover text-primaryText transition-colors"
        >
          View <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
