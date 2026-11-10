import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SkillsClient } from "./SkillsClient";
import { CATALOG_COUNTS } from "@/lib/unified-catalog";

export const metadata: Metadata = {
  title: "Agent Skills — Open-Source Skill Bundles",
  description:
    "Explore open-source agent skill packages for Claude Code, Cursor, and autonomous coding workflows with CLI install commands and repository attribution.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/skills",
  },
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Agent Skills"
        meta={`${CATALOG_COUNTS.skills} verified open-source skills`}
        description="Capability bundles for Claude Code, Cursor, and coding agents. Copy the CLI installation directive or inspect the upstream repository."
        breadcrumbs={[{ label: "Skills", href: "/skills" }]}
      />
      <SkillsClient />
    </div>
  );
}
