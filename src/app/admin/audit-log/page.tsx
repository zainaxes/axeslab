import React from "react";
import { getAdminAuditLogs } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default function AdminAuditLogPage() {
  const logs = getAdminAuditLogs();

  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-4">
        <h1 className="text-xl font-medium text-ink tracking-tight">Administrative Audit Log</h1>
        <p className="text-xs text-muted">
          Audit trail of catalogue publishing, quarantine decisions, and administrative actions.
        </p>
      </div>

      <div className="rounded-card border border-rule bg-paper-2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-paper-3 border-b border-rule text-muted font-mono uppercase text-[11px]">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Admin</th>
                <th className="p-3">Action</th>
                <th className="p-3">Target</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule font-mono text-[11px]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-paper-3/60 transition-colors">
                  <td className="p-3 text-muted whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString("en-GB")}
                  </td>
                  <td className="p-3 text-ink whitespace-nowrap">{log.admin_user}</td>
                  <td className="p-3 font-medium text-ink whitespace-nowrap">{log.action}</td>
                  <td className="p-3 text-ink-2 whitespace-nowrap">
                    {log.target_type}:{log.target_id}
                  </td>
                  <td className="p-3 text-muted max-w-xs truncate">
                    {log.details_json || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
