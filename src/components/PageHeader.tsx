import React from "react";
import Breadcrumbs, { BreadcrumbItem } from "./Breadcrumbs";

interface PageHeaderProps {
  title: string;
  description?: string;
  meta?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  meta,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    <section className="border-b border-rule bg-paper-2">
      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-3">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} />
        )}

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            {meta && (
              <p className="text-xs font-mono text-muted num">{meta}</p>
            )}
            <h1 className="text-2xl sm:text-4xl font-display font-medium text-ink leading-tight">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-muted leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>

          {children && <div className="shrink-0">{children}</div>}
        </div>
      </div>
    </section>
  );
}
