"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Resource } from "@/types";
import { AccessBadge, DistributionBadge, VerificationBadge, TypeBadge } from "./StatusBadges";
import { ExternalLink, Bookmark, ArrowUpRight, Check } from "lucide-react";

export default function ResourceCard({ resource }: { resource: Resource }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("axes_lab_saved_resources") || "[]");
      setIsSaved(saved.some((item: { id: string }) => item.id === resource.id));
    } catch {
      setIsSaved(false);
    }
  }, [resource.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = JSON.parse(localStorage.getItem("axes_lab_saved_resources") || "[]");
      let nextSaved;
      if (isSaved) {
        nextSaved = saved.filter((item: { id: string }) => item.id !== resource.id);
      } else {
        nextSaved = [
          ...saved,
          {
            id: resource.id,
            title: resource.title,
            slug: resource.slug,
            resource_type: resource.resource_type,
            summary: resource.summary,
            saved_at: new Date().toISOString(),
          },
        ];
      }
      localStorage.setItem("axes_lab_saved_resources", JSON.stringify(nextSaved));
      setIsSaved(!isSaved);
    } catch (err) {
      console.error(err);
    }
  };

  const detailUrl = resource.category_slug && resource.subcategory_slug
    ? `/${resource.category_slug}/${resource.subcategory_slug}/${resource.slug}`
    : `/resource/${resource.slug}`;

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-card border border-subtleBorder bg-surface hover:bg-surface-strong hover:border-subtleBorder-strong transition-all duration-150">
      <div>
        {/* Top Header: Type, Subcategory & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <TypeBadge type={resource.resource_type} />
            {resource.subcategory_name && (
              <>
                <span className="text-mutedText text-xs">•</span>
                <span className="text-xs text-mutedText-secondary font-medium">
                  {resource.subcategory_name}
                </span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={toggleSave}
            title={isSaved ? "Remove from saved" : "Save for later"}
            aria-label={isSaved ? "Remove from saved" : "Save for later"}
            className={`p-1.5 rounded text-xs transition-colors ${
              isSaved
                ? "text-primaryText bg-state-selected"
                : "text-mutedText hover:text-primaryText hover:bg-state-hover"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-primaryText tracking-tight mb-2 group-hover:underline">
          <Link href={detailUrl} className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryText rounded">
            {resource.title}
          </Link>
        </h3>

        {/* Concise Plain-Language Summary */}
        <p className="text-xs text-mutedText-secondary leading-relaxed line-clamp-3 mb-4">
          {resource.summary}
        </p>

        {/* Tags / Compatibility Indicators */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {resource.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-canvas border border-subtleBorder text-mutedText-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Metadata & Actions */}
      <div className="pt-3 border-t border-subtleBorder/70 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <AccessBadge status={resource.access_status} />
          <VerificationBadge
            status={resource.verification_status}
            lastChecked={resource.last_checked_at}
          />
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 text-xs">
          <span className="text-[11px] text-mutedText truncate max-w-[140px]">
            {resource.author_or_publisher || "Verified Source"}
          </span>
          <Link
            href={detailUrl}
            className="inline-flex items-center gap-1 font-semibold text-xs text-primaryText hover:underline"
          >
            Details <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
