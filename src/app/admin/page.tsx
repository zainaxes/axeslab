import React from "react";
import Link from "next/link";
import {
  getStats,
  getAdminSubmissions,
  getAdminReports,
  getAdminAuditLogs,
} from "@/lib/queries";
import { Inbox, ArrowRight, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminOverviewPage() {
  const stats = getStats();
  const submissions = getAdminSubmissions();
  const reports = getAdminReports();
  const auditLogs = getAdminAuditLogs();

  const pendingSubmissions = submissions.filter((s) => s.status === "pending_review").length;
  const pendingReports = reports.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-4">
        <h1 className="text-xl sm:text-2xl font-medium text-ink tracking-tight mb-1">
          Catalogue Overview & Governance
        </h1>
        <p className="text-xs text-muted">
          Live database metrics, pending review queues, and operational status.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-card border border-rule bg-paper-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.06em] text-muted block mb-1">
            Published Resources
          </span>
          <span className="text-2xl font-mono font-medium text-ink">{stats.totalPublished}</span>
        </div>

        <div className="p-4 rounded-card border border-rule bg-paper-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.06em] text-muted block mb-1">
            Verified Rate
          </span>
          <span className="text-2xl font-mono font-medium text-ok">
            {stats.totalPublished > 0
              ? `${Math.round((stats.totalVerified / stats.totalPublished) * 100)}%`
              : "0%"}
          </span>
        </div>

        <div className="p-4 rounded-card border border-rule bg-paper-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.06em] text-muted block mb-1">
            Pending Submissions
          </span>
          <span className={`text-2xl font-mono font-medium ${pendingSubmissions > 0 ? "text-accent" : "text-ink"}`}>
            {pendingSubmissions}
          </span>
        </div>

        <div className="p-4 rounded-card border border-rule bg-paper-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.06em] text-muted block mb-1">
            Pending Reports
          </span>
          <span className={`text-2xl font-mono font-medium ${pendingReports > 0 ? "text-bad" : "text-ink"}`}>
            {pendingReports}
          </span>
        </div>
      </div>

      <div className="p-5 rounded-card border border-rule bg-paper-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-[0.06em] text-ink font-medium">
            Catalogue Distribution by Resource Type
          </h2>
          <Link
            href="/admin/resources"
            className="text-xs font-mono text-cool hover:underline inline-flex items-center gap-1"
          >
            <span>Manage Records</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {stats.typeCounts.map((tc) => (
            <div
              key={tc.resource_type}
              className="p-3 rounded-card bg-paper-3 border border-rule flex items-center justify-between"
            >
              <span className="font-mono text-muted uppercase text-[11px]">
                {tc.resource_type.replace("_", " ")}
              </span>
              <span className="font-mono font-medium text-ink">{tc.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-card border border-rule bg-paper-2 space-y-3">
          <div className="flex items-center justify-between border-b border-rule pb-2.5">
            <h3 className="text-xs font-mono uppercase tracking-[0.06em] text-ink flex items-center gap-1.5">
              <Inbox className="w-3.5 h-3.5 text-muted" />
              <span>Pending Submissions ({pendingSubmissions})</span>
            </h3>
            <Link href="/admin/submissions" className="text-xs font-mono text-cool hover:underline">
              View all
            </Link>
          </div>

          {submissions.slice(0, 3).map((sub) => (
            <div key={sub.id} className="p-3 rounded-card bg-paper-3 border border-rule text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted">{sub.resource_type}</span>
                <span className="font-mono text-[11px] text-accent">Review Pending</span>
              </div>
              <p className="font-mono text-ink truncate">{sub.canonical_url}</p>
              <p className="text-muted text-[11px] line-clamp-1">{sub.explanation}</p>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-card border border-rule bg-paper-2 space-y-3">
          <div className="flex items-center justify-between border-b border-rule pb-2.5">
            <h3 className="text-xs font-mono uppercase tracking-[0.06em] text-ink flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted" />
              <span>Recent Audit Log</span>
            </h3>
            <Link href="/admin/audit-log" className="text-xs font-mono text-cool hover:underline">
              View all
            </Link>
          </div>

          {auditLogs.slice(0, 4).map((log) => (
            <div key={log.id} className="p-2.5 rounded-card bg-paper-3 border border-rule text-xs space-y-0.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-ink">{log.action}</span>
                <span className="font-mono text-muted">{log.admin_user}</span>
              </div>
              <span className="text-[11px] font-mono text-muted block">
                {new Date(log.created_at).toLocaleString("en-GB")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
