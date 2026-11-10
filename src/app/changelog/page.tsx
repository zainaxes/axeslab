import React from "react";
import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Platform Changelog",
  description:
    "Chronological record of catalogue releases, taxonomy updates, and platform improvements on Axes Lab.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/changelog",
  },
};

export default function ChangelogPage() {
  const releases = [
    {
      date: "10 November 2026",
      version: "v2.0.0",
      title: "Unified Catalogue Presentation & Dedicated Categories Index",
      items: [
        "Unified all 375 verified website UI prompts, motion graphics directives, and agent skills under one media-led discovery grid and split preview experience.",
        "Added one-click Show and copy the prompt inspection for non-customizable website prompts alongside the existing parameter customizer for customizable motion prompts.",
        "Launched dedicated /categories index mapping real resource collections, web UI categories, and motion topics.",
        "Aligned About and Licensing documentation around ZainAxes identity and third-party resource ownership principles.",
      ],
    },
    {
      date: "31 October 2026",
      version: "v1.0.0",
      title: "Initial Production Launch of Axes Lab",
      items: [
        "Established core editorial taxonomies across Prompts, Skills, MCP Servers, Agents, Workflows, Rules, Templates, Models, Datasets, Tools, and Learning.",
        "Launched Agent Skills preview inspector and MCP Server endpoint (/api/mcp).",
        "Integrated dual-gate licensing and distribution tracking (host_allowed, public_domain_or_cc0, link_only).",
        "Deployed machine-readable index at /llms.txt and public REST API endpoint at /api/public/resources.",
      ],
    },
  ];

  return (
    <PolicyLayout
      title="Platform Changelog"
      subtitle="Chronological record of catalogue expansions, interface updates, and infrastructure releases."
      breadcrumbs={[{ label: "Changelog", href: "/changelog" }]}
    >
      <div className="space-y-6">
        {releases.map((rel) => (
          <section
            key={rel.version}
            className="p-6 rounded-card border border-rule bg-paper-2 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
              <span className="font-mono text-xs font-medium text-ink px-2.5 py-0.5 rounded-pill bg-paper-3 border border-rule">
                {rel.version}
              </span>
              <span className="text-xs font-mono text-muted">{rel.date}</span>
            </div>

            <h2 className="text-base font-display font-medium text-ink">
              {rel.title}
            </h2>

            <ul className="list-disc pl-5 text-xs sm:text-sm text-muted space-y-1.5 leading-relaxed">
              {rel.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PolicyLayout>
  );
}
