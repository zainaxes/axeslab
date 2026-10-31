import React from "react";
import Link from "next/link";
import {
  getStats,
  getAdminSubmissions,
  getAdminReports,
  getAdminAuditLogs,
} from "@/lib/queries";
import {
  Boxes,
  Inbox,
  Flag,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminOverviewPage() {
  const stats = getStats();
  const submissions = getAdminSubmissions();
  const reports = getAdminReports();
  const auditLogs = getAdminAuditLogs();

  const pendingSubmissions = submissions.filter((s) => s.status === "pending_review").length;
  const pendingReports = reports.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-primaryText tracking-tight mb-1">
          Catalogue Overview & Governance
        </h1>
        <p className="text-xs text-mutedText-secondary">
          Live database metrics, pending review queues, and operational status.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-card border border-subtleBorder bg-surface">
          <span className="text-xs text-mutedText block">Published Resources</span>
          <span className="text-2xl font-extrabold text-primaryText">{stats.totalPublished}</span>
        </div>

        <div className="p-4 rounded-card border border-subtleBorder bg-surface">
          <span className="text-xs text-mutedText block">Verified Rate</span>
          <span className="text-2xl font-extrabold text-state-success">
            {stats.totalPublished > 0
              ? `${Math.round((stats.totalVerified / stats.totalPublished) * 100)}%`
              : "0%"}
          </span>
        </div>

        <div className="p-4 rounded-card border border-subtleBorder bg-surface">
          <span className="text-xs text-mutedText block">Pending Submissions</span>
          <span className={`text-2xl font-extrabold ${pendingSubmissions > 0 ? "text-state-warning" : "text-primaryText"}`}>
            {pendingSubmissions}
          </span>
        </div>

        <div className="p-4 rounded-card border border-subtleBorder bg-surface">
          <span className="text-xs text-mutedText block">Pending Reports</span>
          <span className={`text-2xl font-extrabold ${pendingReports > 0 ? "text-state-danger" : "text-primaryText"}`}>
            {pendingReports}
          </span>
        </div>
      </div>

      {/* Resource Types Breakdown */}
      <div className="p-5 rounded-panel border border-subtleBorder bg-surface space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-primaryText uppercase tracking-wider">
            Catalogue Distribution by Resource Type
          </h2>
          <Link
            href="/admin/resources"
            className="text-xs font-semibold text-primaryText hover:underline flex items-center gap-1"
          >
            Manage Records <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {stats.typeCounts.map((tc) => (
            <div
              key={tc.resource_type}
              className="p-3 rounded bg-surface-strong border border-subtleBorder flex items-center justify-between"
            >
              <span className="font-medium text-mutedText-secondary uppercase text-[11px]">
                {tc.resource_type.replace("_", " ")}
              </span>
              <span className="font-mono font-bold text-primaryText">{tc.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Queues & Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Submissions Queue Preview */}
        <div className="p-5 rounded-panel border border-subtleBorder bg-surface space-y-3">
          <div className="flex items-center justify-between border-b border-subtleBorder pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primaryText flex items-center gap-1.5">
              <Inbox className="w-4 h-4 text-mutedText" /> Pending Submissions ({pendingSubmissions})
            </h3>
            <Link href="/admin/submissions" className="text-xs font-semibold text-primaryText hover:underline">
              View all
            </Link>
          </div>

          {submissions.slice(0, 3).map((sub) => (
            <div key={sub.id} className="p-3 rounded bg-surface-strong border border-subtleBorder text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-mutedText">{sub.resource_type}</span>
                <span className="text-[10px] text-state-warning font-semibold">Review Pending</span>
              </div>
              <p className="font-mono text-primaryText truncate">{sub.canonical_url}</p>
              <p className="text-mutedText-secondary text-[11px] line-clamp-1">{sub.explanation}</p>
            </div>
          ))}
        </div>

        {/* Recent Audit Log */}
        <div className="p-5 rounded-panel border border-subtleBorder bg-surface space-y-3">
          <div className="flex items-center justify-between border-b border-subtleBorder pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primaryText flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-mutedText" /> Recent Operational Audit Log
            </h3>
            <Link href="/admin/audit-log" className="text-xs font-semibold text-primaryText hover:underline">
              View all
            </Link>
          </div>

          {auditLogs.slice(0, 4).map((log) => (
            <div key={log.id} className="p-2.5 rounded bg-surface-strong border border-subtleBorder text-xs space-y-0.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-primaryText">{log.action}</span>
                <span className="font-mono text-mutedText">{log.admin_user}</span>
              </div>
              <span className="text-[10px] text-mutedText block">
                {new Date(log.created_at).toLocaleString("en-GB")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
