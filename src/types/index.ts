export type ResourceType =
  | "prompt"
  | "skill"
  | "mcp_server"
  | "agent"
  | "workflow"
  | "rule"
  | "template"
  | "model"
  | "dataset"
  | "tool"
  | "reference";

export type PublicationStatus =
  | "draft"
  | "review"
  | "published"
  | "stale"
  | "deprecated"
  | "quarantined"
  | "removed";

export type VerificationStatus =
  | "verified"
  | "unverified"
  | "needs_review"
  | "stale";

export type AccessStatus =
  | "free_open_source"
  | "free_hosted"
  | "free_with_limits"
  | "open_source_paid_dependency"
  | "trial"
  | "paid";

export type DistributionStatus =
  | "host_allowed"
  | "link_only"
  | "review_required"
  | "not_permitted"
  | "public_domain_or_cc0";

export interface Category {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  icon_key: string | null;
  sort_order: number;
  is_active: number;
  subcategories?: Category[];
  resource_count?: number;
}

export interface Source {
  id: string;
  name: string;
  canonical_host: string;
  source_type: string;
  is_official: number;
  terms_url: string | null;
  check_cadence_days: number;
  last_checked_at: string | null;
  status: string;
}

export interface ResourceMetadata {
  // Common
  requirements?: string[];
  compatibility?: string[];
  tested_models?: string[];
  tested_clients?: string[];
  runtimes?: string[];
  languages?: string[];
  frameworks?: string[];
  operating_systems?: string[];

  // Prompts
  prompt_variables?: Array<{ name: string; description: string; default_value?: string }>;
  prompt_input_example?: string;
  prompt_output_example?: string;
  modality?: string[];

  // Skills
  skill_format?: string;
  skill_files?: string[];
  skill_permissions?: string[];
  install_command?: string;

  // MCP Servers
  mcp_transports?: string[];
  mcp_tools?: Array<{ name: string; description: string; permissions?: string[] }>;
  mcp_deployment?: "local" | "remote";
  mcp_config_example?: string;
  permissions_summary?: {
    reads_filesystem?: boolean;
    writes_filesystem?: boolean;
    network_access?: boolean;
    executes_commands?: boolean;
    requires_api_key?: boolean;
  };

  // Workflows & Automations
  workflow_platform?: string;
  workflow_triggers?: string[];
  workflow_nodes?: string[];
  workflow_cost_disclosure?: string;

  // Models & Datasets
  model_family?: string;
  parameter_size?: string;
  context_window?: string;
  hardware_recommendation?: string;
  dataset_size?: string;
  dataset_modalities?: string[];

  // Tools & Utilities
  deployment_model?: string;
  account_requirement?: string;
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string | null;
  resource_type: ResourceType;
  primary_category_id: string;
  subcategory_id: string | null;
  status: PublicationStatus;
  canonical_source_id: string | null;
  canonical_url: string;
  source_path: string | null;
  author_or_publisher: string | null;
  upstream_repository: string | null;
  upstream_identifier: string | null;
  version_label: string | null;
  upstream_commit_or_release: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  source_updated_at: string | null;
  last_checked_at: string | null;
  verification_status: VerificationStatus;
  access_status: AccessStatus;
  distribution_status: DistributionStatus;
  license_spdx_id: string | null;
  license_name: string;
  license_url: string | null;
  license_scope: string | null;
  license_verified_at: string | null;
  attribution_text: string | null;
  rights_notes: string | null;
  content_body: string | null;
  metadata_json: string;
  seo_title: string | null;
  seo_description: string | null;
  is_featured: number;

  // Joined fields
  category_name?: string;
  category_slug?: string;
  subcategory_name?: string;
  subcategory_slug?: string;
  source_name?: string;
  tags?: string[];
  parsed_metadata?: ResourceMetadata;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  rationale: string | null;
  editor_name: string;
  is_featured: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  resource_count?: number;
  resources?: Resource[];
}

export interface Submission {
  id: string;
  canonical_url: string;
  resource_type: string;
  suggested_category: string | null;
  explanation: string;
  submitter_contact: string | null;
  status: "pending_review" | "approved" | "rejected";
  review_notes: string | null;
  created_at: string;
}

export interface Report {
  id: string;
  resource_id: string | null;
  report_type: string;
  explanation: string;
  reporter_contact: string | null;
  status: "pending" | "resolved" | "dismissed";
  resolution_notes: string | null;
  created_at: string;
  resource_title?: string;
}

export interface AuditLogEntry {
  id: string;
  admin_user: string;
  action: string;
  target_type: string;
  target_id: string;
  details_json: string | null;
  created_at: string;
}
