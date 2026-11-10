import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SubmitClient } from "./SubmitClient";

export const metadata: Metadata = {
  title: "Submit a Resource — Contribute to Axes Lab",
  description:
    "Submit a prompt, template, agent skill, or MCP server reference for verification and attribution review on Axes Lab.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/submit",
  },
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Submit a Resource"
        meta="Community & creator contributions"
        description="Submit a prompt, agent skill, template, or MCP reference for attribution, licensing, and safety verification."
        breadcrumbs={[{ label: "Submit", href: "/submit" }]}
      />
      <SubmitClient />
    </div>
  );
}
