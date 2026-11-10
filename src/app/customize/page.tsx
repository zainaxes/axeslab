import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SafeMediaImage } from "@/components/SafeMediaImage";
import { ALL_REAL_PROMPTS } from "@/lib/real-prompts";
import { TEMPLATES } from "@/lib/templates-data";
import { CustomizeHubClient } from "./CustomizeHubClient";

export const metadata: Metadata = {
  title: "Customize a Prompt — Interactive Parameter Studio",
  description:
    "Customize motion graphics and interactive website prompts by setting brand details, format, colors, typeface, and execution dials in your browser.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/customize",
  },
};

export default function CustomizeHubPage() {
  const customizableCount = ALL_REAL_PROMPTS.filter((p) => p.hasCustomize).length;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Customize a Prompt"
        meta={`${TEMPLATES.length} templates · ${customizableCount} customizable prompts`}
        description="Start from a motion prompt or template. Set your project purpose, format, colors, typeface, and execution dials, then copy a version tailored for your project. All inputs stay in your browser."
        breadcrumbs={[{ label: "Customize", href: "/customize" }]}
      />

      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Section 1: Parameterized Templates */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
            <h2 className="text-lg font-display font-medium text-ink">
              Blueprint Templates
            </h2>
            <Link href="/templates" className="text-xs text-cool hover:underline">
              View all templates
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {TEMPLATES.map((tpl) => (
              <Link
                key={tpl.id}
                href={`/templates/${tpl.slug}/customize`}
                className="group flex flex-col sm:flex-row items-stretch sm:items-center gap-4 rounded-card bg-paper-2 border border-rule hover:border-rule-2 p-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="relative aspect-[16/10] w-full sm:w-44 shrink-0 overflow-hidden rounded-pill bg-paper-3 border border-rule">
                  <SafeMediaImage
                    src={tpl.poster}
                    alt={tpl.title}
                    fallbackLabel={tpl.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <h3 className="font-display font-medium text-base text-ink group-hover:text-cool transition-colors">
                    {tpl.title}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>
                  <p className="font-mono text-[11px] text-cool pt-1">
                    {tpl.fields.length} editable fields · Open customizer
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: All Customizable Prompts */}
        <CustomizeHubClient />
      </div>
    </div>
  );
}
