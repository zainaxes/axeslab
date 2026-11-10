import React from "react";
import {
  AccessStatus,
  DistributionStatus,
  VerificationStatus,
  ResourceType,
} from "@/types";
import {
  ShieldCheck,
  ExternalLink,
  Download,
  AlertCircle,
} from "lucide-react";

export function AccessBadge({ status }: { status: AccessStatus }) {
  const config: Record<string, { label: string; className: string }> = {
    free_open_source: {
      label: "Open Source",
      className: "bg-cool-soft text-cool border-cool/40",
    },
    free_hosted: {
      label: "Free Hosted",
      className: "bg-paper-3 text-ink border-rule",
    },
    open_access: {
      label: "Open Access",
      className: "bg-cool-soft text-cool border-cool/40",
    },
    free_with_limits: {
      label: "Free Tier",
      className: "bg-accent-soft text-accent border-accent/40",
    },
    open_source_paid_dependency: {
      label: "Paid API Dependent",
      className: "bg-accent-soft text-accent border-accent/40",
    },
    trial: {
      label: "Trial",
      className: "bg-paper-3 text-muted border-rule",
    },
    paid: {
      label: "Paid Account Required",
      className: "bg-bad-soft text-bad border-bad/40",
    },
  };

  const item = config[status] || {
    label: status.replace(/_/g, " "),
    className: "bg-paper-3 text-muted border-rule",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-pill text-[11px] font-medium border ${item.className}`}
    >
      {item.label}
    </span>
  );
}

export function DistributionBadge({
  status,
}: {
  status: DistributionStatus | string;
}) {
  if (status === "host_allowed" || status === "canonical_mirror") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill text-[11px] font-medium bg-paper-3 text-ink border border-rule">
        <Download className="w-3 h-3 text-cool" />
        <span>Hosted Here</span>
      </span>
    );
  }

  if (status === "public_domain_or_cc0") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill text-[11px] font-medium bg-paper-3 text-ink border border-rule">
        CC0 / Public Domain
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill text-[11px] font-medium bg-paper-3 text-muted border border-rule">
      <ExternalLink className="w-3 h-3 text-muted" />
      <span>Official Source Only</span>
    </span>
  );
}

export function VerificationBadge({
  status,
  lastChecked,
}: {
  status: VerificationStatus;
  lastChecked?: string | null;
}) {
  const formattedDate = lastChecked
    ? new Date(lastChecked).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  if (status === "verified") {
    return (
      <span
        title={formattedDate ? `Checked ${formattedDate}` : "Verified"}
        className="inline-flex items-center gap-1 text-xs font-medium text-cool"
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>{formattedDate ? `Verified ${formattedDate}` : "Verified"}</span>
      </span>
    );
  }

  if (status === "needs_review" || status === "stale") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>Review Required</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
      Unchecked
    </span>
  );
}

export function TypeBadge({ type }: { type: ResourceType }) {
  const labels: Record<ResourceType, string> = {
    prompt: "Prompt",
    skill: "Agent Skill",
    mcp_server: "MCP Server",
    agent: "Agent",
    workflow: "Workflow",
    rule: "Config / Rule",
    template: "Template",
    model: "Model",
    dataset: "Dataset",
    tool: "Developer Tool",
    reference: "Technical Reference",
  };

  return (
    <span className="inline-block text-[11px] font-medium text-muted">
      {labels[type] || type}
    </span>
  );
}
