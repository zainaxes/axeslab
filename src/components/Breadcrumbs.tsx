import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Axes Lab",
        item: "https://axeslab.zainaxes.com/",
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.label,
        ...(item.href
          ? { item: `https://axeslab.zainaxes.com${item.href}` }
          : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-muted overflow-x-auto no-scrollbar py-1"
      >
        <Link
          href="/"
          className="hover:text-ink transition-colors duration-150 rounded px-1 focus-visible:outline-2 focus-visible:outline-accent whitespace-nowrap"
        >
          Axes Lab
        </Link>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <ChevronRight className="w-3.5 h-3.5 text-muted/70 shrink-0" />
              {isLast || !item.href ? (
                <span
                  className="text-ink font-medium truncate max-w-[260px] px-1"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-ink transition-colors duration-150 truncate max-w-[200px] rounded px-1 focus-visible:outline-2 focus-visible:outline-accent whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
