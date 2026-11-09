"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Resource } from "@/types";
import { AccessBadge, VerificationBadge, TypeBadge } from "./StatusBadges";
import { Bookmark, ArrowUpRight, Copy, Check } from "lucide-react";
import { getYouTubeThumbnailUrl, isYouTubeUrl } from "@/lib/video-utils";

export default function ResourceCard({ resource }: { resource: Resource }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const metadata = resource.parsed_metadata || {};
  const videoUrl = metadata.custom_video_url || metadata.effectUrl || metadata.default_video_url;
  const youtubeUrl = metadata.youtube_video_id || metadata.custom_video_url;
  const isYT = isYouTubeUrl(youtubeUrl);
  const posterUrl = metadata.posterUrl || (isYT ? getYouTubeThumbnailUrl(youtubeUrl) : null);

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

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!resource.content_body) return;
    try {
      await navigator.clipboard.writeText(resource.content_body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !isYT) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && !isYT) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const detailUrl = resource.category_slug && resource.subcategory_slug
    ? `/${resource.category_slug}/${resource.subcategory_slug}/${resource.slug}`
    : `/resource/${resource.slug}`;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#101014] p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-[#141419] hover:shadow-[0_12px_36px_rgba(0,0,0,0.8)]"
    >
      <div>
        {/* Top Header: Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <TypeBadge type={resource.resource_type} />
            {resource.subcategory_name && (
              <>
                <span className="text-zinc-600 text-xs">•</span>
                <span className="text-xs font-mono text-zinc-400 font-medium">
                  {resource.subcategory_name}
                </span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={toggleSave}
            title={isSaved ? "Remove bookmark" : "Save bookmark"}
            aria-label={isSaved ? "Remove bookmark" : "Save bookmark"}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              isSaved
                ? "text-sky-400 bg-sky-950/50 border border-sky-500/30"
                : "text-zinc-500 hover:text-white hover:bg-white/10"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* 16/10 Aspect Ratio Media Preview */}
        {(posterUrl || videoUrl) && (
          <div className="relative mb-3.5 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/60">
            {posterUrl && (
              <img
                src={posterUrl}
                alt={resource.title}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  isHovered && videoUrl && !isYT ? "opacity-0" : "opacity-100"
                }`}
              />
            )}

            {videoUrl && !isYT && (
              <video
                ref={videoRef}
                src={videoUrl}
                poster={posterUrl || undefined}
                muted
                loop
                playsInline
                preload="none"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}

            {/* Quick Action Overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100">
              <Link
                href={detailUrl}
                className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-black shadow-lg transition-transform hover:scale-105"
              >
                <span>View</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
              {resource.content_body && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 rounded-xl bg-black/80 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-md transition-transform hover:scale-105"
                >
                  {copied ? <Check className="h-3 w-3 text-cool" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-bold text-white tracking-tight mb-2 group-hover:text-sky-300 transition-colors">
          <Link href={detailUrl} className="focus-visible:outline-none">
            {resource.title}
          </Link>
        </h3>

        {/* Plain-Language Summary */}
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4">
          {resource.summary}
        </p>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {resource.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <AccessBadge status={resource.access_status} />
          <VerificationBadge
            status={resource.verification_status}
            lastChecked={resource.last_checked_at}
          />
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 text-xs">
          <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[150px]">
            {resource.author_or_publisher || "Axes Lab"}
          </span>
          <Link
            href={detailUrl}
            className="inline-flex items-center gap-1 font-semibold text-xs text-zinc-200 hover:text-white group-hover:translate-x-0.5 transition-all"
          >
            <span>Inspect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
