import React from "react";
import Breadcrumbs, { BreadcrumbItem } from "./Breadcrumbs";

interface PolicyLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
}

export function PolicyLayout({
  title,
  subtitle,
  lastUpdated,
  breadcrumbs,
  children,
}: PolicyLayoutProps) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="border-b border-rule bg-paper-2">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-3">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-2xl sm:text-4xl font-display font-medium text-ink leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted leading-relaxed">{subtitle}</p>
          )}
          {lastUpdated && (
            <p className="text-xs font-mono text-muted pt-1">{lastUpdated}</p>
          )}
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-sm text-ink-2 leading-relaxed">
        {children}
      </article>
    </div>
  );
}
