import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SafeMediaImage } from "@/components/SafeMediaImage";
import { TEMPLATES } from "@/lib/templates-data";

export const metadata: Metadata = {
  title: "Templates — Parameterized Motion Blueprints",
  description:
    "Reusable prompt templates written for motion design and real-time 3D generation with explicit customizable parameter fields.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/templates",
  },
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Templates"
        meta={`${TEMPLATES.length} reusable prompt templates`}
        description="Prompts structured explicitly for customization, with every creative and technical parameter exposed as an editable field."
        breadcrumbs={[{ label: "Templates", href: "/templates" }]}
      />

      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((tpl) => (
            <Link
              key={tpl.id}
              href={`/templates/${tpl.slug}`}
              className="group flex flex-col rounded-card bg-paper-2 border border-rule hover:border-rule-2 transition-colors duration-150 overflow-hidden focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-3 border-b border-rule">
                <SafeMediaImage
                  src={tpl.poster}
                  alt={tpl.title}
                  fallbackLabel={tpl.title}
                  className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.02]"
                />
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display font-medium text-base text-ink group-hover:text-cool transition-colors">
                      {tpl.title}
                    </h2>
                    <ArrowRight className="w-4 h-4 text-muted group-hover:text-ink shrink-0" />
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-rule text-xs font-mono text-muted">
                  <span>{tpl.fields.length} editable fields</span>
                  <span>{tpl.model}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
