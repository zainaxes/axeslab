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
  ShieldCheck,
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
    <div className="space-y-6">
      {/* Top Admin Notice Bar */}
      <div className="flex items-center justify-between p-3.5 rounded-btn bg-surface border border-subtleBorder text-xs">
        <div className="flex items-center gap-2.5">
          <img src="/logo-white.png" alt="Axes Lab Logo" className="w-5 h-5 object-contain" />
          <span className="w-2 h-2 rounded-full bg-state-success" />
          <span className="font-bold text-primaryText uppercase tracking-wider text-[11px]">
            Axes Lab Administration Console
          </span>
          <span className="text-mutedText">| Environment: Production Database</span>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-semibold text-primaryText hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Site
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Admin Navigation Sidebar */}
        <aside className="col-span-1 space-y-1 bg-surface p-3 rounded-panel border border-subtleBorder">
          <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-mutedText">
            Admin Navigation
          </div>
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-btn text-xs font-semibold text-primaryText hover:bg-state-hover transition-colors"
              >
                <Icon className="w-4 h-4 text-mutedText flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </aside>

        {/* Admin Main Work Surface */}
        <div className="col-span-1 md:col-span-4 min-h-[600px]">{children}</div>
      </div>
    </div>
  );
}
