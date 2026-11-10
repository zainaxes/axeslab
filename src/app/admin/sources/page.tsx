import React from "react";
import { getAdminSources } from "@/lib/queries";
import { Globe } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminSourcesPage() {
  const sources = getAdminSources();

  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-4">
        <h1 className="text-xl font-medium text-ink tracking-tight">Source Registry</h1>
        <p className="text-xs text-muted">
          Approved upstream roots, official registries, and automated verification check cadences.
        </p>
      </div>

      <div className="rounded-card border border-rule bg-paper-2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-paper-3 border-b border-rule text-muted font-mono uppercase text-[11px]">
              <tr>
                <th className="p-3">Source Name</th>
                <th className="p-3">Host</th>
                <th className="p-3">Type</th>
                <th className="p-3">Cadence</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {sources.map((s) => (
                <tr key={s.id} className="hover:bg-paper-3/60 transition-colors">
                  <td className="p-3 font-medium text-ink flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-muted" />
                    <span>{s.name}</span>
                  </td>
                  <td className="p-3 font-mono text-ink-2">{s.canonical_host}</td>
                  <td className="p-3 uppercase text-[11px] font-mono text-muted">
                    {s.source_type}
                  </td>
                  <td className="p-3 text-muted font-mono">Every {s.check_cadence_days}d</td>
                  <td className="p-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-pill text-[11px] font-mono bg-paper-3 border border-ok/40 text-ok">
                      ACTIVE
                    </span>
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
