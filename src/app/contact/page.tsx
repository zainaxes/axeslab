import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — ZainAxes & Axes Lab",
  description:
    "Contact Axes Lab and ZainAxes for attribution corrections, copyright takedowns, technical inquiries, or contributions.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Contact"
        meta="Axes Lab · ZainAxes"
        description="Reach out for attribution corrections, copyright or removal requests, broken links, technical questions, or contributing time, skills, or support."
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />
      <Suspense fallback={null}>
        <ContactClient />
      </Suspense>
    </div>
  );
}
