import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Changelog & Release Notes | Axes Lab",
  description:
    "System updates, catalog revisions, and new taxonomy additions to the Axes Lab AI resource directory.",
};

export default function ChangelogPage() {
  const releases = [
    {
      date: "31 October 2026",
      version: "v1.0.0",
      title: "Initial Production Launch of Axes Lab",
      items: [
        "Established core editorial taxonomies across 11 main categories: Prompts, Skills, MCP Servers, Agents, Workflows, Rules, Templates, Models, Datasets, Tools, and Learning.",
        "Launched standardized Agent Skills (`SKILL.md`) preview inspector and MCP Server permission matrices.",
        "Integrated dual-gate licensing and distribution status tracking (open source, open weights, link-only).",
        "Shipped high-performance faceted filtering, instant command search (/), and local bookmark persistence.",
        "Deployed machine-readable index at /llms.txt and public REST API endpoint at /api/public/resources.",
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-8">
      <Breadcrumbs items={[{ label: "Changelog", href: "/changelog" }]} />

      <header className="border-b border-subtleBorder pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primaryText tracking-tight mb-2">
          Platform Changelog
        </h1>
        <p className="text-xs sm:text-sm text-mutedText-secondary leading-relaxed">
          Chronological record of catalogue expansions, taxonomy refinements, and infrastructure upgrades.
        </p>
      </header>

      <div className="space-y-8">
        {releases.map((rel) => (
          <div key={rel.version} className="p-6 rounded-panel border border-subtleBorder bg-surface space-y-4">
            <div className="flex items-center justify-between border-b border-subtleBorder pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-primaryText px-2 py-0.5 rounded bg-surface-strong border border-subtleBorder mr-2">
                  {rel.version}
                </span>
                <span className="text-xs text-mutedText font-medium">{rel.date}</span>
              </div>
            </div>
            <h2 className="text-base font-bold text-primaryText">{rel.title}</h2>
            <ul className="list-disc pl-5 text-xs text-mutedText-secondary space-y-1.5 leading-relaxed">
              {rel.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
