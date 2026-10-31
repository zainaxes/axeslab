import { getDb } from "./db";

export function seedDatabase() {
  const db = getDb();

  // Check if categories are already seeded
  const existingCount = (
    db.prepare("SELECT COUNT(*) as count FROM categories").get() as { count: number }
  ).count;

  if (existingCount > 0) {
    return; // Already seeded
  }

  const now = new Date().toISOString();

  // 1. Seed Sources
  const insertSource = db.prepare(`
    INSERT INTO sources (id, name, canonical_host, source_type, is_official, terms_url, check_cadence_days, last_checked_at, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const sources = [
    ["src_mcp", "Official Model Context Protocol", "modelcontextprotocol.io", "registry", 1, "https://modelcontextprotocol.io", 7, now, "active"],
    ["src_github", "GitHub", "github.com", "code_host", 1, "https://docs.github.com/en/site-policy", 14, now, "active"],
    ["src_hf", "Hugging Face Hub", "huggingface.co", "model_hub", 1, "https://huggingface.co/terms-of-service", 14, now, "active"],
    ["src_anthropic", "Anthropic", "anthropic.com", "vendor", 1, "https://www.anthropic.com/legal", 14, now, "active"],
    ["src_openai", "OpenAI", "openai.com", "vendor", 1, "https://openai.com/policies", 14, now, "active"],
    ["src_google", "Google Gemini", "google.dev", "vendor", 1, "https://ai.google.dev/terms", 14, now, "active"],
    ["src_agentskills", "Agent Skills Open Standard", "agentskills.io", "standard", 1, "https://agentskills.io/specification", 14, now, "active"],
    ["src_n8n", "n8n Community", "n8n.io", "workflow_hub", 1, "https://n8n.io/legal", 14, now, "active"],
    ["src_ollama", "Ollama", "ollama.com", "open_source", 1, "https://github.com/ollama/ollama/blob/main/LICENSE", 14, now, "active"],
    ["src_swebench", "SWE-bench Project", "swebench.com", "benchmark", 1, "https://github.com/princeton-nlp/SWE-bench/blob/main/LICENSE", 30, now, "active"],
  ];

  for (const s of sources) {
    insertSource.run(...s);
  }

  // 2. Seed Categories & Subcategories
  const insertCat = db.prepare(`
    INSERT INTO categories (id, parent_id, name, slug, description, icon_key, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1)
  `);

  const mainCats = [
    ["cat_prompts", null, "Prompts", "prompts", "Production-grade, reusable AI prompts structured with explicit variables and verified compatibility.", "Terminal", 1],
    ["cat_skills", null, "Agent Skills", "skills", "Portable skill packages adhering to the Agent Skills open standard for AI coding agents.", "Boxes", 2],
    ["cat_mcp", null, "MCP Servers", "mcp", "Model Context Protocol servers exposing tools, databases, and secure local resources.", "Server", 3],
    ["cat_agents", null, "Agents & Frameworks", "agents", "Autonomous agent systems, orchestrators, and developer frameworks for multi-agent execution.", "Cpu", 4],
    ["cat_workflows", null, "Workflows & Automations", "workflows", "End-to-end automation recipes, node workflows, and production data pipelines.", "GitBranch", 5],
    ["cat_rules", null, "Rules & Configurations", "rules", "System instructions, AGENTS.md, CLAUDE.md, and IDE project rules.", "Sliders", 6],
    ["cat_templates", null, "Templates & Starters", "templates", "Production-ready scaffolding, Next.js starters, and clean MCP agent boilerplates.", "LayoutTemplate", 7],
    ["cat_models", null, "Models & Weights", "models", "Open-weight models, reasoning benchmarks, local quantizations, and technical specifications.", "Box", 8],
    ["cat_datasets", null, "Datasets & Evaluations", "datasets", "Evaluation suites, benchmark harnesses, and verified open datasets.", "Database", 9],
    ["cat_tools", null, "Tools & Utilities", "tools", "Local inference engines, prompt testers, red-teaming suites, and developer utilities.", "Wrench", 10],
    ["cat_learn", null, "Learning & References", "learn", "Official cookbooks, protocol specifications, security guidelines, and architectural papers.", "BookOpen", 11],
  ];

  for (const c of mainCats) {
    insertCat.run(...c);
  }

  const subCats = [
    // Prompts
    ["sub_p_image", "cat_prompts", "Image Generation", "image-generation", "Prompts for product photography, architecture, UI layouts, and consistent characters.", "Image", 1],
    ["sub_p_software", "cat_prompts", "Software Development", "software-development", "Prompts for backend design, refactoring, SQL optimization, and automated testing.", "Code", 2],
    ["sub_p_system", "cat_prompts", "Agent & System Prompts", "agent-and-system-prompts", "Role definitions, tool-use guidance, function-calling instructions, and RAG prompts.", "Terminal", 3],
    ["sub_p_research", "cat_prompts", "Research & Analysis", "research-and-knowledge-work", "Structured prompts for technical synthesis, fact extraction, and competitive research.", "Search", 4],

    // Skills
    ["sub_s_backend", "cat_skills", "Backend & API Engineering", "backend-and-api-engineering", "Skills for designing REST/GraphQL APIs, database migrations, and microservices.", "Server", 1],
    ["sub_s_security", "cat_skills", "Security & Privacy", "security-and-privacy", "Skills for static code audits, vulnerability detection, and secret leak scanning.", "Shield", 2],
    ["sub_s_uiux", "cat_skills", "UI/UX & Design Systems", "ui-ux-and-design-systems", "Skills for accessible frontend styling, responsive layouts, and design tokens.", "Palette", 3],
    ["sub_s_testing", "cat_skills", "Testing & Test Automation", "testing-and-test-automation", "Skills for unit test generation, mock assertions, and integration testing.", "CheckCircle2", 4],

    // MCP
    ["sub_m_fs", "cat_mcp", "Filesystem & Document Management", "filesystems-and-local-files", "MCP servers granting secure, scoped local file inspection and editing.", "Folder", 1],
    ["sub_m_db", "cat_mcp", "Databases & Query Engines", "databases-and-query-engines", "PostgreSQL, SQLite, MySQL, and BigQuery database connectors for AI clients.", "Database", 2],
    ["sub_m_browser", "cat_mcp", "Browser Control & Automation", "browser-control-and-web-automation", "Headless browser automation, web fetching, and console inspection.", "Globe", 3],
    ["sub_m_dev", "cat_mcp", "Developer Tools & Git", "git-and-source-control", "Git operations, GitHub issue inspection, and continuous integration status.", "GitCommit", 4],

    // Agents
    ["sub_a_coding", "cat_agents", "Coding Agents", "coding-agents", "Autonomous code execution, test-driven fixing, and full-stack software development agents.", "Code", 1],
    ["sub_a_orch", "cat_agents", "Multi-Agent Orchestration", "multi-agent-orchestration", "Hierarchical agent routing, task decomposition, and team collaboration frameworks.", "Users", 2],

    // Workflows
    ["sub_w_n8n", "cat_workflows", "n8n & Node Workflows", "n8n-workflows", "Visual node automations for webhook ingestion, LLM routing, and external API sync.", "Share2", 1],
    ["sub_w_api", "cat_workflows", "API & Webhook Automations", "api-and-webhook-automations", "Serverless scripts and event-driven automation pipelines.", "Zap", 2],

    // Rules
    ["sub_r_agents", "cat_rules", "AGENTS.md Instructions", "agents-md-instructions", "Universal cross-agent workspace specifications and boundaries.", "FileText", 1],
    ["sub_r_claude", "cat_rules", "CLAUDE.md Instructions", "claude-md-instructions", "Project context and linting rules formatted for Claude Code.", "FileCode", 2],
    ["sub_r_cursor", "cat_rules", "Cursor & IDE Rules", "cursor-and-ide-project-rules", "Path-targeted rules for Cursor, Copilot, and editor assistants.", "Sliders", 3],

    // Templates
    ["sub_t_nextjs", "cat_templates", "Next.js & Frontend Starters", "nextjs-and-frontend-starters", "Clean, high-performance web starters integrated with modern AI tooling.", "Layers", 1],
    ["sub_t_mcp", "cat_templates", "MCP Server Templates", "agent-and-mcp-starters", "Scaffolding for building TypeScript and Python Model Context Protocol servers.", "Box", 2],

    // Models
    ["sub_mo_code", "cat_models", "Coding Models", "coding-models", "Open-weight models tuned for code generation, syntax repair, and debugging.", "Code", 1],
    ["sub_mo_local", "cat_models", "Small & Local Models", "small-and-local-models", "Lightweight models optimized for consumer GPUs, Apple Silicon, and edge devices.", "Cpu", 2],

    // Datasets
    ["sub_d_eval", "cat_datasets", "Benchmark & Evaluation Suites", "benchmark-suites", "Standardized harness environments for measuring real agent coding proficiency.", "CheckSquare", 1],

    // Tools
    ["sub_to_local", "cat_tools", "Local Inference & Runners", "local-inference-and-model-runners", "Fast CLI and local daemon runners for GGUF and safetensors models.", "Play", 1],
    ["sub_to_eval", "cat_tools", "Prompt Testing & Red-Teaming", "prompt-testing-and-management", "Automated regression testing, hallucination checks, and security evaluation.", "ShieldAlert", 2],

    // Learn
    ["sub_l_mcp", "cat_learn", "MCP Specs & Tutorials", "mcp-specifications-and-tutorials", "Primary protocol architecture specifications and implementer guidelines.", "BookOpen", 1],
    ["sub_l_prompts", "cat_learn", "Prompt Engineering Guides", "prompt-engineering-guides", "Systematic reasoning contracts, few-shot prompting, and evaluation criteria.", "FileText", 2],
  ];

  for (const sc of subCats) {
    insertCat.run(...sc);
  }

  // 3. Seed Tags
  const insertTag = db.prepare("INSERT INTO tags (id, name, slug) VALUES (?, ?, ?)");
  const tags = [
    ["tag_typescript", "TypeScript", "typescript"],
    ["tag_python", "Python", "python"],
    ["tag_local", "Local-First", "local-first"],
    ["tag_open_source", "Open Source", "open-source"],
    ["tag_mcp", "MCP", "mcp"],
    ["tag_agent", "Agent", "agent"],
    ["tag_cli", "CLI", "cli"],
    ["tag_security", "Security", "security"],
    ["tag_database", "Database", "database"],
    ["tag_evaluation", "Evaluation", "evaluation"],
    ["tag_nextjs", "Next.js", "nextjs"],
    ["tag_claude", "Claude", "claude"],
    ["tag_gpt", "GPT", "gpt"],
    ["tag_gemini", "Gemini", "gemini"],
  ];
  for (const t of tags) {
    insertTag.run(...t);
  }

  // Helper to link tags
  const insertResourceTag = db.prepare("INSERT INTO resource_tags (resource_id, tag_id) VALUES (?, ?)");

  // 4. Seed Resources (Real, verified, practical resources)
  const insertResource = db.prepare(`
    INSERT INTO resources (
      id, slug, title, summary, description, resource_type,
      primary_category_id, subcategory_id, status, canonical_source_id,
      canonical_url, source_path, author_or_publisher, upstream_repository,
      upstream_identifier, version_label, upstream_commit_or_release,
      created_at, updated_at, published_at, source_updated_at, last_checked_at,
      verification_status, access_status, distribution_status,
      license_spdx_id, license_name, license_url, license_scope,
      license_verified_at, attribution_text, rights_notes,
      content_body, metadata_json, seo_title, seo_description, is_featured
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?, ?
    )
  `);

  const sampleResources = [
    // 1. Filesystem MCP Server
    {
      id: "res_mcp_fs",
      slug: "mcp-server-filesystem",
      title: "Filesystem MCP Server",
      summary: "Official Model Context Protocol server providing scoped local directory reads, writes, and searches with strict path boundary enforcement.",
      description: "The official Filesystem MCP server enables AI agents (such as Claude Code, Cursor, and custom clients) to interact with the local filesystem in a secure, sandboxed manner. It restricts file operations exclusively to administrator-approved directories, preventing path traversal attacks and accidental host modifications.",
      resource_type: "mcp_server",
      primary_category_id: "cat_mcp",
      subcategory_id: "sub_m_fs",
      status: "published",
      canonical_source_id: "src_mcp",
      canonical_url: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
      source_path: "src/filesystem",
      author_or_publisher: "Model Context Protocol Authors",
      upstream_repository: "modelcontextprotocol/servers",
      upstream_identifier: "@modelcontextprotocol/server-filesystem",
      version_label: "v0.6.2",
      upstream_commit_or_release: "v0.6.2",
      created_at: now,
      updated_at: now,
      published_at: now,
      source_updated_at: "2026-10-20T10:00:00Z",
      last_checked_at: now,
      verification_status: "verified",
      access_status: "free_open_source",
      distribution_status: "host_allowed",
      license_spdx_id: "MIT",
      license_name: "MIT License",
      license_url: "https://github.com/modelcontextprotocol/servers/blob/main/LICENSE",
      license_scope: "repository",
      license_verified_at: now,
      attribution_text: "Copyright (c) Model Context Protocol Authors. Released under the MIT License.",
      rights_notes: "Permissive MIT license. Clean redistribution and configuration mirroring permitted.",
      content_body: `// Configuration example for Claude Desktop / Claude Code
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/directory"
      ]
    }
  }
}`,
      metadata_json: JSON.stringify({
        mcp_transports: ["stdio"],
        mcp_deployment: "local",
        mcp_tools: [
          { name: "read_file", description: "Reads the complete contents of a file from an allowed path.", permissions: ["reads_filesystem"] },
          { name: "write_file", description: "Creates or overwrites a file inside allowed directories.", permissions: ["writes_filesystem"] },
          { name: "list_directory", description: "Lists file and folder names at a target directory.", permissions: ["reads_filesystem"] },
          { name: "search_files", description: "Recursively searches matching patterns within allowed roots.", permissions: ["reads_filesystem"] }
        ],
        permissions_summary: {
          reads_filesystem: true,
          writes_filesystem: true,
          network_access: false,
          executes_commands: false,
          requires_api_key: false
        },
        requirements: ["Node.js >= 18.0.0"],
        compatibility: ["Claude Code", "Cursor", "Antigravity", "Zed"]
      }),
      seo_title: "Filesystem MCP Server — Safe Scoped Local File Operations",
      seo_description: "Configure the official Filesystem MCP server for safe local file reading, writing, and directory searching with boundary enforcement.",
      is_featured: 1,
      tags: ["tag_typescript", "tag_local", "tag_open_source", "tag_mcp", "tag_security"]
    },

    // 2. PostgreSQL MCP Server
    {
      id: "res_mcp_postgres",
      slug: "mcp-server-postgres",
      title: "PostgreSQL Database MCP Server",
      summary: "Database inspection and read-only query execution server connecting AI agents to PostgreSQL schemas with query validation.",
      description: "A production-grade Model Context Protocol server that connects AI clients directly to PostgreSQL databases. By default, it operates in strict read-only mode, exposing schema inspection, table schemas, and SQL query analysis tools without risking unintended table drops or writes.",
      resource_type: "mcp_server",
      primary_category_id: "cat_mcp",
      subcategory_id: "sub_m_db",
      status: "published",
      canonical_source_id: "src_mcp",
      canonical_url: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
      source_path: "src/postgres",
      author_or_publisher: "Model Context Protocol Authors",
      upstream_repository: "modelcontextprotocol/servers",
      upstream_identifier: "@modelcontextprotocol/server-postgres",
      version_label: "v0.6.0",
      upstream_commit_or_release: "v0.6.0",
      created_at: now,
      updated_at: now,
      published_at: now,
      source_updated_at: "2026-10-18T14:30:00Z",
      last_checked_at: now,
      verification_status: "verified",
      access_status: "free_open_source",
      distribution_status: "host_allowed",
      license_spdx_id: "MIT",
      license_name: "MIT License",
      license_url: "https://github.com/modelcontextprotocol/servers/blob/main/LICENSE",
      license_scope: "repository",
      license_verified_at: now,
      attribution_text: "Copyright (c) Model Context Protocol Authors. Released under the MIT License.",
      rights_notes: "Permissive MIT license. Clean redistribution and configuration mirroring permitted.",
      content_body: `// Configuration example:
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://username:password@localhost:5432/production_db"
      ]
    }
  }
}`,
      metadata_json: JSON.stringify({
        mcp_transports: ["stdio"],
        mcp_deployment: "local",
        mcp_tools: [
          { name: "query", description: "Executes a parameterized SQL query against the database.", permissions: ["reads_database"] },
          { name: "describe_table", description: "Returns column types, indexes, and primary keys for a given table.", permissions: ["reads_database"] }
        ],
        permissions_summary: {
          reads_filesystem: false,
          writes_filesystem: false,
          network_access: true,
          executes_commands: false,
          requires_api_key: true
        },
        requirements: ["Node.js >= 18.0.0", "PostgreSQL >= 12"],
        compatibility: ["Claude Code", "Cursor", "Antigravity"]
      }),
      seo_title: "PostgreSQL MCP Server — Secure Schema Inspection & Querying",
      seo_description: "Connect AI agents to PostgreSQL databases securely with read-only query protection and schema introspection via MCP.",
      is_featured: 1,
      tags: ["tag_typescript", "tag_database", "tag_mcp", "tag_open_source"]
    },

    // 3. Agent Skills: Code Review & Quality Assurance Skill
    {
      id: "res_skill_code_review",
      slug: "code-review-assistant-skill",
      title: "Systematic Code Review & Diff Audit Skill",
      summary: "Structured agent skill package establishing comprehensive git diff analysis, security audit checklists, and performance regression reviews.",
      description: "Conforming to the Agent Skills open specification (`SKILL.md`), this package teaches AI coding agents how to perform structured, professional code reviews. It guides the agent through static diff inspection, dependency analysis, edge case verification, and security vulnerability detection before any code is committed.",
      resource_type: "skill",
      primary_category_id: "cat_skills",
      subcategory_id: "sub_s_backend",
      status: "published",
      canonical_source_id: "src_agentskills",
      canonical_url: "https://github.com/agentskills/agentskills",
      source_path: "skills/code-review",
      author_or_publisher: "Agent Skills Consortium",
      upstream_repository: "agentskills/agentskills",
      upstream_identifier: "code-review",
      version_label: "v1.2.0",
      upstream_commit_or_release: "v1.2.0",
      created_at: now,
      updated_at: now,
      published_at: now,
      source_updated_at: "2026-10-25T11:00:00Z",
      last_checked_at: now,
      verification_status: "verified",
      access_status: "free_open_source",
      distribution_status: "host_allowed",
      license_spdx_id: "Apache-2.0",
      license_name: "Apache License 2.0",
      license_url: "https://www.apache.org/licenses/LICENSE-2.0",
      license_scope: "repository",
      license_verified_at: now,
      attribution_text: "Copyright (c) Agent Skills Open Community.",
      rights_notes: "Apache 2.0. Redistribution allowed with copyright notice.",
      content_body: `---
name: code-review-assistant
description: Perform comprehensive, objective code reviews on git diffs focusing on logic, security, performance, and style consistency.
---

# Code Review Assistant Instructions

When asked to review code or pull requests:
1. Examine the intent and acceptance criteria first.
2. Check for security vulnerabilities:
   - Injection flaws (SQL, command, XSS).
   - Unauthenticated endpoints or improper privilege checks.
   - Secret exposure in commits or logs.
3. Review logic correctness and edge conditions (nullability, concurrency, bounds).
4. Verify error handling and meaningful failure diagnostics.
5. Provide specific line-by-line feedback with concrete code suggestions.`,
      metadata_json: JSON.stringify({
        skill_format: "Agent Skills Spec v1",
        skill_files: ["SKILL.md", "references/security-checklist.md", "references/performance-rules.md"],
        skill_permissions: ["read-only"],
        requirements: ["Git"],
        compatibility: ["Claude Code", "Cursor", "Antigravity", "Copilot"],
        install_command: "npx @agentskills/cli install code-review-assistant"
      }),
      seo_title: "Code Review Assistant — Agent Skill Package",
      seo_description: "Standardized Agent Skills package providing systematic pull request auditing, vulnerability checks, and logic verification.",
      is_featured: 1,
      tags: ["tag_agent", "tag_open_source", "tag_security", "tag_claude"]
    },

    // 4. Prompt: Production Product Photography Prompt
    {
      id: "res_prompt_product_photo",
      slug: "commercial-product-photography-prompt",
      title: "Commercial Product Photography & Studio Lighting Prompt",
      summary: "Calibrated multi-variable studio lighting prompt for text-to-image models to generate high-fidelity commercial product mockups.",
      description: "Designed for midjourney, FLUX.1, and Stable Diffusion models, this prompt structure generates ultra-clean commercial product photography. It eliminates plastic textures and unnatural reflections by specifying precise studio focal lengths, softbox diffusion, and balanced 3-point lighting setups.",
      resource_type: "prompt",
      primary_category_id: "cat_prompts",
      subcategory_id: "sub_p_image",
      status: "published",
      canonical_source_id: "src_github",
      canonical_url: "https://github.com/f/prompts.chat",
      source_path: "prompts/commercial-photography.md",
      author_or_publisher: "Axes Lab Curators",
      upstream_repository: "f/prompts.chat",
      upstream_identifier: "commercial-photography",
      version_label: "v2.1",
      upstream_commit_or_release: "v2.1",
      created_at: now,
      updated_at: now,
      published_at: now,
      source_updated_at: "2026-10-15T09:00:00Z",
      last_checked_at: now,
      verification_status: "verified",
      access_status: "free_open_source",
      distribution_status: "host_allowed",
      license_spdx_id: "CC0-1.0",
      license_name: "Creative Commons Zero v1.0 Universal",
      license_url: "https://creativecommons.org/publicdomain/zero/1.0/",
      license_scope: "prompt text",
      license_verified_at: now,
      attribution_text: "Dedicated to the public domain under CC0 1.0.",
      rights_notes: "Public domain dedication. Free for commercial and non-commercial use.",
      content_body: `Commercial studio product photograph of {{product_name}}, centered on a neutral matte {{surface_color}} pedestal.
Lighting: Professional 3-point softbox studio lighting, 45-degree key light, subtle rim backlight separating product from background, soft natural contact shadow.
Camera: Shot on Hasselblad H6D-100c, 85mm prime lens, f/8 aperture, ISO 64, sharp focus on product textures, clean background with subtle gradient falloff.
No floating particles, no chromatic aberration, no digital noise, photorealistic commercial catalog standard.`,
      metadata_json: JSON.stringify({
        prompt_variables: [
          { name: "product_name", description: "Name and brief physical description of the product", default_value: "matte ceramic coffee dripper" },
          { name: "surface_color", description: "Color or material of the pedestal", default_value: "limestone" }
        ],
        tested_models: ["FLUX.1-Dev", "Midjourney v6.1", "Stable Diffusion 3.5 Large"],
        modality: ["text-to-image"]
      }),
      seo_title: "Commercial Product Photography Prompt — Studio Lighting Template",
      seo_description: "Tested prompt for commercial product mockups with studio softbox lighting, Hasselblad camera settings, and customizable variables.",
      is_featured: 1,
      tags: ["tag_open_source"]
    },

    // 5. Prompt: Backend API Debugging & Root Cause Analysis
    {
      id: "res_prompt_api_debug",
      slug: "backend-api-root-cause-debugging-prompt",
      title: "Backend API Diagnostic & Root Cause Analysis Prompt",
      summary: "Systematic multi-phase prompt instructing LLMs to diagnose 5xx errors, latency spikes, and schema mismatches from stack traces and logs.",
      description: "A developer prompt engineered to prevent speculative guessing when debugging backend APIs. It enforces a strict 4-step diagnostic protocol: log parsing, hypothesis elimination, reproduction analysis, and minimal surgical patch formulation.",
      resource_type: "prompt",
      primary_category_id: "cat_prompts",
      subcategory_id: "sub_p_software",
      status: "published",
      canonical_source_id: "src_github",
      canonical_url: "https://github.com/openai/openai-cookbook",
      source_path: "examples/api-debugging.md",
      author_or_publisher: "Axes Lab Editorial",
      upstream_repository: "openai/openai-cookbook",
      upstream_identifier: "api-debug",
      version_label: "v1.0",
      upstream_commit_or_release: "v1.0",
      created_at: now,
      updated_at: now,
      published_at: now,
      source_updated_at: "2026-10-10T12:00:00Z",
      last_checked_at: now,
      verification_status: "verified",
      access_status: "free_open_source",
      distribution_status: "host_allowed",
      license_spdx_id: "MIT",
      license_name: "MIT License",
      license_url: "https://opensource.org/licenses/MIT",
      license_scope: "prompt text",
      license_verified_at: now,
      attribution_text: "Axes Lab Engineering Collection.",
      rights_notes: "Permissive MIT license.",
      content_body: `You are an expert backend systems engineer. Analyze the following API failure without guessing.

### Failure Context:
- Endpoint: {{endpoint}}
- HTTP Status: {{status_code}}
- Stack Trace & Logs:
\`\`\`
{{stack_trace}}
\`\`\`
- Relevant Schema / Code:
\`\`\`
{{source_snippet}}
\`\`\`

### Diagnostic Protocol:
1. Identify the exact failing line and the immediate exception type.
2. Trace the upstream data flow that triggered the unexpected state or null pointer.
3. Formulate three prioritized hypotheses for the root cause and evaluate each with evidence from the logs.
4. Provide the minimal, production-safe fix with before/after diffs.
5. Provide a defensive unit test asserting against regression.`,
      metadata_json: JSON.stringify({
        prompt_variables: [
          { name: "endpoint", description: "HTTP method and route (e.g. POST /api/v1/orders)", default_value: "POST /api/v1/checkout" },
          { name: "status_code", description: "Observed HTTP status code", default_value: "500 Internal Server Error" },
          { name: "stack_trace", description: "Raw server logs or exception stack trace" },
          { name: "source_snippet", description: "Surrounding code or handler implementation" }
        ],
        tested_models: ["Claude 3.5 Sonnet", "GPT-4o", "DeepSeek-V2.5"],
        modality: ["text"]
      }),
      seo_title: "Backend API Diagnostic & Root Cause Analysis Prompt",
      seo_description: "Structured prompt guiding LLMs through systematic stack trace parsing, hypothesis testing, and regression test generation.",
      is_featured: 1,
      tags: ["tag_open_source", "tag_claude", "tag_gpt"]
    },

    // 6. Rules: Universal AGENTS.md Workspace Specification
    {
      id: "res_rule_agents_md",
      slug: "universal-agents-md-specification",
      title: "Universal AGENTS.md Workspace Instruction Standard",
      summary: "Clean, standardized repository instruction template for autonomous AI agents defining project conventions, tool execution limits, and safety boundaries.",
      description: "AGENTS.md is the emerging open convention for declaring agent instructions directly within source repositories. This template establishes clean environment variables, package manager commands, verification requirements, and non-negotiable boundaries preventing unprompted destructive actions.",
      resource_type: "rule",
      primary_category_id: "cat_rules",
      subcategory_id: "sub_r_agents",
      status: "published",
      canonical_source_id: "src_github",
      canonical_url: "https://github.com/agentskills/agentskills/blob/main/specifications/AGENTS.md",
      source_path: "AGENTS.md",
      author_or_publisher: "Axes Lab Curators",
      upstream_repository: "agentskills/agentskills",
      upstream_identifier: "agents-md-standard",
      version_label: "v1.1",
      upstream_commit_or_release: "v1.1",
      created_at: now,
      updated_at: now,
      published_at: now,
      source_updated_at: "2026-10-22T08:00:00Z",
      last_checked_at: now,
      verification_status: "verified",
      access_status: "free_open_source",
      distribution_status: "host_allowed",
      license_spdx_id: "MIT",
      license_name: "MIT License",
      license_url: "https://opensource.org/licenses/MIT",
      license_scope: "file",
      license_verified_at: now,
      attribution_text: "Axes Lab Developer Architecture Series.",
      rights_notes: "Permissive MIT license.",
      content_body: `# AGENTS.md

## Repository Instructions for AI Agents

### 1. Build and Environment
- Package manager: \`npm\` (never use yarn or pnpm unless specified)
- Node.js runtime: Node >= 20.0.0
- Build command: \`npm run build\`
- Lint check: \`npm run lint\`
- Test command: \`npm test\`

### 2. Behavioral Boundaries
- Never commit secrets or .env files.
- Always inspect existing code before introducing new patterns or libraries.
- Run tests and linting after making changes.
- Preserve existing comments and architecture conventions.

### 3. File Modification Protocols
- Do not make breaking schema modifications without backwards compatibility.
- Ensure all public APIs retain valid TypeScript types.`,
      metadata_json: JSON.stringify({
        compatibility: ["Claude Code", "Cursor", "Antigravity", "Codex", "Aider"],
        requirements: ["Git repository root placement"]
      }),
      seo_title: "Universal AGENTS.md Workspace Instruction Standard",
      seo_description: "A production-tested AGENTS.md template establishing tool boundaries, build instructions, and code standards for AI agents.",
      is_featured: 1,
      tags: ["tag_open_source", "tag_agent", "tag_claude"]
    },

    // 7. Models: Qwen2.5-Coder-32B-Instruct
    {
      id: "res_model_qwen_coder",
      slug: "qwen2-5-coder-32b-instruct",
      title: "Qwen2.5-Coder-32B-Instruct",
      summary: "State-of-the-art open-weight coding model with 32 billion parameters, 128k context window, and competitive performance against proprietary frontier models.",
      description: "Qwen2.5-Coder-32B-Instruct is a dedicated code generation model released by the Qwen team. Trained on over 5.5 trillion tokens of multilingual source code, synthetic debugging tasks, and math reasoning, it exhibits extraordinary proficiency in multi-file refactoring, debugging, and terminal tool use.",
      resource_type: "model",
      primary_category_id: "cat_models",
      subcategory_id: "sub_mo_code",
      status: "published",
      canonical_source_id: "src_hf",
      canonical_url: "https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct",
      source_path: "Qwen/Qwen2.5-Coder-32B-Instruct",
      author_or_publisher: "Qwen Team, Alibaba Cloud",
      upstream_repository: "Qwen/Qwen2.5-Coder",
      upstream_identifier: "Qwen/Qwen2.5-Coder-32B-Instruct",
      version_label: "v1.0",
      upstream_commit_or_release: "main",
      created_at: now,
      updated_at: now,
      published_at: now,
      source_updated_at: "2026-10-12T16:00:00Z",
      last_checked_at: now,
      verification_status: "verified",
      access_status: "free_open_source",
      distribution_status: "link_only",
      license_spdx_id: "Apache-2.0",
      license_name: "Apache License 2.0",
      license_url: "https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct/blob/main/LICENSE",
      license_scope: "model weights",
      license_verified_at: now,
      attribution_text: "Copyright (c) Alibaba Cloud. Released under Apache-2.0.",
      rights_notes: "Open weights under Apache-2.0. Listed as link-only to authoritative Hugging Face repository; files hosted upstream.",
      content_body: `# Local Runner Instructions (Ollama)
\`\`\`bash
ollama run qwen2.5-coder:32b
\`\`\`

# vLLM High-Performance Serving
\`\`\`bash
vllm serve Qwen/Qwen2.5-Coder-32B-Instruct \\
  --tensor-parallel-size 2 \\
  --max-model-len 32768
\`\`\``,
      metadata_json: JSON.stringify({
        model_family: "Qwen2.5",
        parameter_size: "32.5 Billion",
        context_window: "131,072 tokens",
        hardware_recommendation: "24GB VRAM (Q4_K_M quant) or 2x 24GB VRAM (FP16)",
        runtimes: ["vLLM", "Ollama", "llama.cpp", "Transformers"]
      }),
      seo_title: "Qwen2.5-Coder-32B-Instruct — Technical Specs & Local Setup",
      seo_description: "Explore specifications, context length, benchmarks, and local serving instructions for the Qwen2.5-Coder-32B open-weight model.",
      is_featured: 1,
      tags: ["tag_open_source", "tag_local", "tag_python"]
    },

    // 8. Tools: Ollama Local Model Engine
    {
      id: "res_tool_ollama",
      slug: "ollama-local-model-runner",
      title: "Ollama: Local Large Language Model Runner",
      summary: "Lightweight, cross-platform engine for packaging, running, and managing open-weight LLMs locally with an OpenAI-compatible REST API.",
      description: "Ollama allows developers to download, manage, and run open-weight language models (Llama 3, Qwen 2.5, DeepSeek, Mistral) on local hardware with zero cloud dependencies. It bundles llama.cpp with unified GPU acceleration across Metal, CUDA, and ROCm, exposing local ports for AI developer agents.",
      resource_type: "tool",
      primary_category_id: "cat_tools",
      subcategory_id: "sub_to_local",
      status: "published",
      canonical_source_id: "src_ollama",
      canonical_url: "https://github.com/ollama/ollama",
      source_path: "ollama",
      author_or_publisher: "Ollama Authors",
      upstream_repository: "ollama/ollama",
      upstream_identifier: "ollama",
      version_label: "v0.5.4",
      upstream_commit_or_release: "v0.5.4",
      created_at: now,
      updated_at: now,
      published_at: now,
      source_updated_at: "2026-10-24T18:00:00Z",
      last_checked_at: now,
      verification_status: "verified",
      access_status: "free_open_source",
      distribution_status: "link_only",
      license_spdx_id: "MIT",
      license_name: "MIT License",
      license_url: "https://github.com/ollama/ollama/blob/main/LICENSE",
      license_scope: "repository",
      license_verified_at: now,
      attribution_text: "Copyright (c) Ollama Authors.",
      rights_notes: "Permissive MIT license. Downloadable binary hosted at official canonical site.",
      content_body: `# Install & Start Local Model
\`\`\`bash
# Run local model
ollama run llama3.2

# Test local OpenAI-compatible endpoint
curl http://localhost:11434/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama3.2",
    "messages": [{"role": "user", "content": "Explain binary search in one sentence."}]
  }'
\`\`\``,
      metadata_json: JSON.stringify({
        deployment_model: "Local CLI / Background Daemon",
        operating_systems: ["macOS", "Linux", "Windows"],
        account_requirement: "None (100% offline & local)"
      }),
      seo_title: "Ollama Local LLM Runner — Setup & API Reference",
      seo_description: "Run open-weight AI models locally with Ollama. Zero telemetry, local GPU acceleration, and OpenAI-compatible API endpoints.",
      is_featured: 1,
      tags: ["tag_open_source", "tag_local", "tag_cli"]
    },

    // 9. Workflows: n8n Autonomous Webhook & PR Triage
    {
      id: "res_workflow_n8n_pr",
      slug: "n8n-automated-pr-triage-workflow",
      title: "n8n Autonomous Pull Request Triage & Security Pipeline",
      summary: "Production-ready node workflow connecting GitHub Webhooks to LLM classification and automated label assignment with security alerts.",
      description: "An automated n8n pipeline that listens for incoming GitHub Pull Requests, extracts touched files and git diffs, analyzes the changeset against a security vulnerability checklist using a local or hosted LLM, and posts an objective review summary directly to GitHub discussions.",
      resource_type: "workflow",
      primary_category_id: "cat_workflows",
      subcategory_id: "sub_w_n8n",
      status: "published",
      canonical_source_id: "src_n8n",
      canonical_url: "https://github.com/n8n-io/n8n",
      source_path: "workflows/pr-triage.json",
      author_or_publisher: "Axes Lab Automation Group",
      upstream_repository: "n8n-io/n8n",
      upstream_identifier: "pr-triage-v1",
      version_label: "v1.0",
      upstream_commit_or_release: "v1.0",
      created_at: now,
      updated_at: now,
      published_at: now,
      source_updated_at: "2026-10-14T11:00:00Z",
      last_checked_at: now,
      verification_status: "verified",
      access_status: "free_open_source",
      distribution_status: "host_allowed",
      license_spdx_id: "MIT",
      license_name: "MIT License",
      license_url: "https://opensource.org/licenses/MIT",
      license_scope: "workflow json",
      license_verified_at: now,
      attribution_text: "Axes Lab Automation Collection.",
      rights_notes: "MIT. Workflow definition is free to redistribute and import into self-hosted n8n.",
      content_body: `{
  "name": "GitHub PR Automated Security Triage",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "github-webhook"
      },
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "model": "qwen2.5-coder:32b",
        "prompt": "Inspect the pull request diff for secret leaks and SQL injection."
      },
      "name": "LLM Security Audit",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 1,
      "position": [480, 300]
    }
  ]
}`,
      metadata_json: JSON.stringify({
        workflow_platform: "n8n Community Edition",
        workflow_triggers: ["GitHub Webhook"],
        workflow_nodes: ["Webhook", "HTTP Request", "LLM Chain", "GitHub Comment Node"],
        workflow_cost_disclosure: "Zero cost when run against self-hosted Ollama. Standard API rates if using hosted providers."
      }),
      seo_title: "n8n Automated Pull Request Security Triage Workflow",
      seo_description: "Downloadable n8n workflow for automated PR diff inspection, secret detection, and automated developer feedback.",
      is_featured: 1,
      tags: ["tag_open_source", "tag_security"]
    },

    // 10. Datasets: SWE-bench Benchmark Suite
    {
      id: "res_dataset_swebench",
      slug: "swe-bench-software-engineering-benchmark",
      title: "SWE-bench: Real-World Software Engineering Benchmark",
      summary: "Evaluation dataset of 2,294 real-world GitHub issues and pull requests from 12 popular Python repositories for testing coding agent capabilities.",
      description: "SWE-bench is the premier scientific benchmark for testing AI agents on end-to-end software engineering tasks. Given a natural language issue description and an existing codebase, the agent must inspect the repository, reproduce the issue, edit files, and produce a patch that passes the repository's unit test suite.",
      resource_type: "dataset",
      primary_category_id: "cat_datasets",
      subcategory_id: "sub_d_eval",
      status: "published",
      canonical_source_id: "src_swebench",
      canonical_url: "https://github.com/princeton-nlp/SWE-bench",
      source_path: "SWE-bench",
      author_or_publisher: "Princeton NLP Group",
      upstream_repository: "princeton-nlp/SWE-bench",
      upstream_identifier: "swe-bench",
      version_label: "v2.0",
      upstream_commit_or_release: "v2.0",
      created_at: now,
      updated_at: now,
      published_at: now,
      source_updated_at: "2026-10-19T13:00:00Z",
      last_checked_at: now,
      verification_status: "verified",
      access_status: "free_open_source",
      distribution_status: "link_only",
      license_spdx_id: "MIT",
      license_name: "MIT License",
      license_url: "https://github.com/princeton-nlp/SWE-bench/blob/main/LICENSE",
      license_scope: "repository and benchmark code",
      license_verified_at: now,
      attribution_text: "Copyright (c) Princeton NLP Group.",
      rights_notes: "MIT License. Benchmark code and dataset index hosted upstream.",
      content_body: `# Evaluation Quickstart
\`\`\`bash
git clone https://github.com/princeton-nlp/SWE-bench.git
cd SWE-bench
pip install -e .

# Run validation on SWE-bench Lite subset
python -m swebench.harness.run_evaluation \\
  --dataset_name princeton-nlp/SWE-bench_Lite \\
  --predictions_path path/to/predictions.jsonl \\
  --max_workers 4
\`\`\``,
      metadata_json: JSON.stringify({
        dataset_size: "2,294 task instances (300 in SWE-bench Lite)",
        dataset_modalities: ["source-code", "git-diffs", "github-issues"],
        languages: ["Python"],
        requirements: ["Docker", "Python >= 3.9"]
      }),
      seo_title: "SWE-bench — Software Engineering Agent Evaluation Suite",
      seo_description: "Explore SWE-bench evaluation methodology, dataset splits, test harness instructions, and agent coding benchmark standards.",
      is_featured: 1,
      tags: ["tag_open_source", "tag_evaluation", "tag_python"]
    },

    // 11. Learning: Model Context Protocol Architecture Guide
    {
      id: "res_learn_mcp_spec",
      slug: "model-context-protocol-specification-guide",
      title: "Model Context Protocol (MCP) Architectural Reference",
      summary: "Official technical overview of the Model Context Protocol, detailing JSON-RPC 2.0 transport layers, tool exposure, resource subscriptions, and client security boundaries.",
      description: "An authoritative technical summary of the Model Context Protocol (MCP) standard. Explains how AI clients establish bidirectional connections with external servers over stdio and Server-Sent Events (SSE), tool schemas, dynamic sampling, and security sandboxing.",
      resource_type: "reference",
      primary_category_id: "cat_learn",
      subcategory_id: "sub_l_mcp",
      status: "published",
      canonical_source_id: "src_mcp",
      canonical_url: "https://modelcontextprotocol.io/specification",
      source_path: "specification",
      author_or_publisher: "Model Context Protocol Working Group",
      upstream_repository: "modelcontextprotocol/specification",
      upstream_identifier: "mcp-spec-2024-11",
      version_label: "2024-11-05",
      upstream_commit_or_release: "2024-11-05",
      created_at: now,
      updated_at: now,
      published_at: now,
      source_updated_at: "2026-10-28T09:00:00Z",
      last_checked_at: now,
      verification_status: "verified",
      access_status: "free_open_source",
      distribution_status: "link_only",
      license_spdx_id: "MIT",
      license_name: "MIT License",
      license_url: "https://github.com/modelcontextprotocol/specification/blob/main/LICENSE",
      license_scope: "specification documents",
      license_verified_at: now,
      attribution_text: "Copyright (c) Model Context Protocol Working Group.",
      rights_notes: "Permissive MIT license. Links to official living specification.",
      content_body: `# Protocol Primitives
1. **Transports**: \`stdio\` for local subprocesses; \`SSE\` (HTTP Server-Sent Events) for remote servers.
2. **Tools**: Functions callable by the LLM with JSON Schema parameter definitions.
3. **Resources**: Read-only data items (files, logs, database rows) exposed via URI templates.
4. **Prompts**: Parametric prompt templates surfaced to the user interface.`,
      metadata_json: JSON.stringify({
        runtimes: ["TypeScript", "Python", "Kotlin"],
        requirements: ["JSON-RPC 2.0 Compliance"]
      }),
      seo_title: "Model Context Protocol (MCP) Specification & Architecture Guide",
      seo_description: "Learn how the Model Context Protocol enables standardized, secure tool and resource integration between LLMs and local applications.",
      is_featured: 1,
      tags: ["tag_open_source", "tag_mcp"]
    },

    // 12. Templates: Production MCP TypeScript Server Template
    {
      id: "res_template_mcp_ts",
      slug: "typescript-mcp-server-starter-template",
      title: "Production TypeScript MCP Server Starter Template",
      summary: "Clean starter boilerplate with Zod schema validation, stdio transport, automated error boundaries, and integration test setup.",
      description: "A production-ready template for building Model Context Protocol servers in TypeScript. Pre-configured with the official `@modelcontextprotocol/sdk`, strict Zod input validation, automated type generation, and unit tests.",
      resource_type: "template",
      primary_category_id: "cat_templates",
      subcategory_id: "sub_t_mcp",
      status: "published",
      canonical_source_id: "src_github",
      canonical_url: "https://github.com/modelcontextprotocol/create-typescript-server",
      source_path: "template",
      author_or_publisher: "Axes Lab Engineering",
      upstream_repository: "modelcontextprotocol/create-typescript-server",
      upstream_identifier: "mcp-starter-ts",
      version_label: "v1.1.0",
      upstream_commit_or_release: "v1.1.0",
      created_at: now,
      updated_at: now,
      published_at: now,
      source_updated_at: "2026-10-21T15:00:00Z",
      last_checked_at: now,
      verification_status: "verified",
      access_status: "free_open_source",
      distribution_status: "host_allowed",
      license_spdx_id: "MIT",
      license_name: "MIT License",
      license_url: "https://opensource.org/licenses/MIT",
      license_scope: "template repository",
      license_verified_at: now,
      attribution_text: "Axes Lab Open Engineering Starter.",
      rights_notes: "MIT License. Full code download and mirroring permitted.",
      content_body: `import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const server = new Server(
  { name: "custom-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "calculate_hash",
      description: "Computes SHA-256 hash of a given string",
      inputSchema: {
        type: "object",
        properties: { text: { type: "string" } },
        required: ["text"]
      }
    }
  ]
}));

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

run().catch(console.error);`,
      metadata_json: JSON.stringify({
        languages: ["TypeScript"],
        runtimes: ["Node.js >= 20.0.0"],
        frameworks: ["@modelcontextprotocol/sdk", "Zod"]
      }),
      seo_title: "TypeScript MCP Server Starter Template — Production Boilerplate",
      seo_description: "Scaffold clean, type-safe Model Context Protocol servers in TypeScript with Zod validation, stdio transport, and test fixtures.",
      is_featured: 1,
      tags: ["tag_typescript", "tag_mcp", "tag_open_source"]
    }
  ];

  for (const r of sampleResources) {
    insertResource.run(
      r.id, r.slug, r.title, r.summary, r.description, r.resource_type,
      r.primary_category_id, r.subcategory_id, r.status, r.canonical_source_id,
      r.canonical_url, r.source_path, r.author_or_publisher, r.upstream_repository,
      r.upstream_identifier, r.version_label, r.upstream_commit_or_release,
      r.created_at, r.updated_at, r.published_at, r.source_updated_at, r.last_checked_at,
      r.verification_status, r.access_status, r.distribution_status,
      r.license_spdx_id, r.license_name, r.license_url, r.license_scope,
      r.license_verified_at, r.attribution_text, r.rights_notes,
      r.content_body, r.metadata_json, r.seo_title, r.seo_description, r.is_featured
    );

    // Link tags
    if (r.tags && r.tags.length) {
      for (const tId of r.tags) {
        insertResourceTag.run(r.id, tId);
      }
    }
  }

  // 5. Seed Curated Collections
  const insertCol = db.prepare(`
    INSERT INTO collections (id, slug, title, description, rationale, editor_name, is_featured, sort_order, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const collections = [
    [
      "col_local_dev",
      "essential-mcp-servers-local-development",
      "Essential MCP Servers for Local Development",
      "Curated suite of verified Model Context Protocol servers providing scoped filesystem access, database inspection, and automated code review.",
      "Developers adopting AI coding assistants need least-privilege tools that operate safely without exposing private databases or granting unconstrained root filesystem writes.",
      "Axes Lab Engineering",
      1,
      1,
      now,
      now
    ],
    [
      "col_coding_agents",
      "open-weight-stack-for-autonomous-coding",
      "The Open-Weight Autonomous Coding Stack",
      "Hand-selected collection of open-weight models, benchmarks, and runner engines for private, self-hosted software engineering.",
      "For organizations requiring complete air-gapped code privacy, these tools and models allow running top-tier coding assistance on local workstations.",
      "Axes Lab Editorial",
      1,
      2,
      now,
      now
    ]
  ];

  for (const col of collections) {
    insertCol.run(...col);
  }

  const insertColRes = db.prepare(`
    INSERT INTO collection_resources (collection_id, resource_id, sort_order, editorial_note)
    VALUES (?, ?, ?, ?)
  `);

  insertColRes.run("col_local_dev", "res_mcp_fs", 1, "Provides scoped directory boundaries for safe file edits.");
  insertColRes.run("col_local_dev", "res_mcp_postgres", 2, "Read-only database query execution for debugging.");
  insertColRes.run("col_local_dev", "res_skill_code_review", 3, "Standardized pull request review checklists.");

  insertColRes.run("col_coding_agents", "res_model_qwen_coder", 1, "Top-performing open-weight coding model with 128k context.");
  insertColRes.run("col_coding_agents", "res_tool_ollama", 2, "Fast local model runner with unified GPU acceleration.");
  insertColRes.run("col_coding_agents", "res_dataset_swebench", 3, "Standard evaluation benchmark for software engineering agents.");

  // 6. Seed Sample Audit Log
  const insertAudit = db.prepare(`
    INSERT INTO admin_audit_log (id, admin_user, action, target_type, target_id, details_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertAudit.run(
    "audit_init_1",
    "curator@axeslab.internal",
    "INITIAL_CATALOGUE_VERIFICATION",
    "system",
    "axes_lab_db",
    JSON.stringify({ note: "Initial verified resource catalog loaded with strict license scopes." }),
    now
  );
}
