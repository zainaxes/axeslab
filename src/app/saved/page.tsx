import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SavedClient } from "./SavedClient";

export const metadata: Metadata = {
  title: "Saved Resources — Local Bookmarks",
  description:
    "View and manage your locally bookmarked Axes Lab prompts and resources stored directly in your browser.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Saved Resources"
        meta="Stored locally in your browser"
        description="Prompts and resources you bookmarked on this device. No account or cloud sync is required."
        breadcrumbs={[{ label: "Saved", href: "/saved" }]}
      />
      <SavedClient />
    </div>
  );
}
