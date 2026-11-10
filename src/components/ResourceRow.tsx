"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Resource } from "@/types";
import { AccessBadge, VerificationBadge, TypeBadge } from "./StatusBadges";

export default function ResourceRow({ resource }: { resource: Resource }) {
  const detailUrl = `/resource/${resource.slug}`;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-card border border-rule bg-paper-2 hover:border-rule-2 transition-colors duration-150 gap-4">
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-2 mb-1">
          <TypeBadge type={resource.resource_type} />
          {resource.subcategory_name && (
            <span className="text-xs text-muted">
              / {resource.subcategory_name}
            </span>
          )}
        </div>
        <h3 className="text-sm font-medium text-ink truncate mb-0.5">
          <Link href={detailUrl} className="hover:text-cool transition-colors">
            {resource.title}
          </Link>
        </h3>
        <p className="text-xs text-muted line-clamp-1">{resource.summary}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-rule">
        <AccessBadge status={resource.access_status} />
        <VerificationBadge
          status={resource.verification_status}
          lastChecked={resource.last_checked_at}
        />
        <Link
          href={detailUrl}
          className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-ink transition-colors duration-150"
        >
          <span>View</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
