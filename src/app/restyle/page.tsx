import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RestyleClient } from "./RestyleClient";

export const metadata: Metadata = {
  title: "Restyle Studio — UI Refactoring Prompt Builder",
  description:
    "Generate a structured refactoring prompt to transform existing React and Tailwind components into a chosen visual direction.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/restyle",
  },
};

export default function RestylePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Restyle Studio"
        meta="UI refactoring prompt generator"
        description="Paste an existing component or description, pick a target visual system, and generate a structured refactoring prompt for your coding assistant."
        breadcrumbs={[{ label: "Restyle Studio", href: "/restyle" }]}
      />
      <RestyleClient />
    </div>
  );
}
