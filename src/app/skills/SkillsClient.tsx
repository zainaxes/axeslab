"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, Download, ExternalLink, GitBranch } from "lucide-react";
import { toast } from "sonner";
import { UNIFIED_MOTION_ITEMS, UnifiedCatalogItem } from "@/lib/unified-catalog";
import { SafeMediaImage } from "@/components/SafeMediaImage";

export function SkillsClient() {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const skills = UNIFIED_MOTION_ITEMS.filter((item) => item.isSkill);

  const handleCopy = async (e: React.MouseEvent, cmd: string, id: string) => {
    e.stopPropagation();
    if (!cmd) return;
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedId(id);
      toast.success("Installation command copied");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.info("Select the command text to copy");
    }
  };

  const openPreview = (item: UnifiedCatalogItem) => {
    router.push(`/skills?prompt=${encodeURIComponent(item.slug)}`, {
      scroll: false,
    });
  };

  return (
    <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => {
          const cmd =
            skill.skillCommand ||
            (skill.skillRepo ? `git clone ${skill.skillRepo}` : "");

          return (
            <article
              key={skill.id}
              className="rounded-card border border-rule bg-paper-2 hover:border-rule-2 overflow-hidden flex flex-col justify-between transition-colors duration-150"
            >
              <div>
                <button
                  type="button"
                  onClick={() => openPreview(skill)}
                  className="relative aspect-[16/10] w-full bg-paper-3 border-b border-rule overflow-hidden block cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <SafeMediaImage
                    src={skill.posterUrl}
                    alt={skill.title}
                    fallbackLabel={skill.subcategory || skill.title}
                    className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-300 hover:scale-[1.02]"
                  />
                </button>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-xs text-muted block">
                        {skill.subcategory} · @{skill.handle}
                      </span>
                      <button
                        type="button"
                        onClick={() => openPreview(skill)}
                        className="text-left focus-visible:outline-2 focus-visible:outline-accent rounded"
                      >
                        <h2 className="text-base font-display font-medium text-ink hover:text-cool transition-colors duration-150 mt-0.5">
                          {skill.title}
                        </h2>
                      </button>
                    </div>

                    {skill.skillRepo && (
                      <a
                        href={skill.skillRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-pill bg-paper-3 border border-rule text-muted hover:text-ink hover:border-rule-2 transition-colors duration-150 shrink-0"
                        title="Open GitHub repository"
                        aria-label={`Open ${skill.title} repository on GitHub`}
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {skill.skillDescription && (
                    <p className="text-xs text-muted leading-relaxed">
                      {skill.skillDescription}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                {cmd && (
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-pill bg-paper-3 border border-rule font-mono text-xs">
                    <span className="truncate text-cool select-all">{cmd}</span>
                    <button
                      type="button"
                      onClick={(e) => handleCopy(e, cmd, skill.id)}
                      className="shrink-0 p-1 rounded text-muted hover:text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                      title="Copy command"
                      aria-label={`Copy install command for ${skill.title}`}
                    >
                      {copiedId === skill.id ? (
                        <Check className="w-3.5 h-3.5 text-cool" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted pt-2.5 border-t border-rule">
                  <span className="font-mono text-[11px]">
                    {skill.license || "MIT"}
                  </span>

                  {skill.sourceUrl && (
                    <a
                      href={skill.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-ink transition-colors duration-150"
                    >
                      <span>Creator post</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Axes Lab & AxesKit SKILL.md Downloads */}
      <section className="rounded-card border border-rule bg-paper-2 p-6 space-y-4">
        <div className="space-y-1">
          <h2 className="text-base font-display font-medium text-ink">
            Axes Lab SKILL.md Bundles
          </h2>
          <p className="text-xs text-muted">
            Download packaged SKILL.md instruction files directly for local agent workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              label: "Merged Axes Lab + AxesKit Skill",
              href: "/api/skill/download?type=merged",
              file: "merged-SKILL.md",
            },
            {
              label: "Axes Lab Design System Skill",
              href: "/api/skill/download?type=axeslab",
              file: "axeslab-SKILL.md",
            },
            {
              label: "AxesKit Assets Skill",
              href: "/api/skill/download?type=axeskit",
              file: "axeskit-SKILL.md",
            },
          ].map((bundle) => (
            <a
              key={bundle.href}
              href={bundle.href}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-card bg-paper-3 border border-rule hover:border-rule-2 text-xs transition-colors duration-150"
            >
              <div className="min-w-0">
                <span className="font-medium text-ink block truncate">
                  {bundle.label}
                </span>
                <span className="font-mono text-[11px] text-muted">
                  {bundle.file}
                </span>
              </div>
              <Download className="w-4 h-4 text-muted shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
