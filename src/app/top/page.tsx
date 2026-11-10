import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TopClient } from "./TopClient";

export const metadata: Metadata = {
  title: "Curated Essential Directives — Top Specification Depth",
  description:
    "Explore 50 comprehensive website and motion prompt specifications selected by specification depth and completeness.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/top",
  },
};

export default function TopPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Curated Essential Directives"
        meta="50 specifications ordered by directive depth"
        description="The 50 longest, most detailed prompt specifications in the Axes Lab library, ordered strictly by specification length and structural completeness."
        breadcrumbs={[{ label: "Top Picks", href: "/top" }]}
      />
      <TopClient />
    </div>
  );
}
