import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Boxes,
  Inbox,
  Flag,
  Globe,
  ScrollText,
  ArrowLeft,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminNav = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Resource Manager", href: "/admin/resources", icon: Boxes },
    { name: "Submissions Queue", href: "/admin/submissions", icon: Inbox },
    { name: "Reports & Takedowns", href: "/admin/reports", icon: Flag },
    { name: "Source Registry", href: "/admin/sources", icon: Globe },
    { name: "Audit Log", href: "/admin/audit-log", icon: ScrollText },
  ];

  return (
    <div className="mx-auto max-w-[var(--container)] px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-card bg-paper-2 border border-rule text-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-ok flex-shrink-0" />
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink font-medium">
            Axes Lab Governance Console
          </span>
          <span className="text-muted hidden sm:inline">· Production Database Snapshot</span>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded-pill"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Catalogue</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <aside className="lg:col-span-1 space-y-1 bg-paper-2 p-3 rounded-card border border-rule">
          <div className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.08em] text-muted">
            Console Sections
          </div>
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-card text-xs font-medium text-ink-2 hover:text-ink hover:bg-paper-3 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
              >
                <Icon className="w-4 h-4 text-muted flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </aside>

        <div className="lg:col-span-4 min-h-[540px] min-w-0">{children}</div>
      </div>
    </div>
  );
}
