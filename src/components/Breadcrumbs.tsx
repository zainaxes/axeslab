import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-1.5 text-xs text-mutedText-secondary mb-4 overflow-x-auto py-1"
    >
      <Link
        href="/"
        className="hover:text-primaryText transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryText rounded px-1"
      >
        Library
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-mutedText flex-shrink-0" />
            {isLast || !item.href ? (
              <span className="font-medium text-primaryText truncate max-w-[240px] px-1" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-primaryText transition-colors truncate max-w-[180px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryText rounded px-1"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
