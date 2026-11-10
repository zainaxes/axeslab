import { NextRequest, NextResponse } from 'next/server';
import axeskitTaxonomy from '../../../../data/axeskit_taxonomy.json';
import { ALL_UNIFIED_ITEMS, UnifiedCatalogItem } from '@/lib/unified-catalog';
import { TEMPLATES, TemplateItem } from '@/lib/templates-data';
import {
  DEFAULT_DIALS,
  customizeTemplate,
  withDetails,
} from '@/lib/customizer-engine';

export const dynamic = 'force-dynamic';

const SUPPORTED_PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05'] as const;
const SERVER_INFO = {
  name: 'axeslab-mcp',
  version: '3.0.0',
  title: 'Axes Lab & AxesKit MCP Server',
  description:
    'Access all 375+ Axes Lab website UI prompts, motion-design directives, templates, agent skills, and AxesKit design assets directly from any coding agent.',
};

const SERVER_INSTRUCTIONS =
  'When the user asks for an Axes Lab prompt, UI template, motion prompt, section, or design style by name (e.g. "Interactive Discovery", "Asme", "Bold Studio", "Claude motion designer showreel"), call axeslab_get_prompt (or prompts/get) with that name or slug. You can also search with axeslab_search_templates, browse categories with axeslab_list_categories, or generate framework implementation scaffolds with axeslab_generate_scaffold. Apply the returned prompt specifications faithfully.';

interface McpPromptEntry {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  resourceTypeLabel: string;
  description: string;
  prompt: string;
  hasCustomize: boolean;
  customizerType?: 'field_replacement' | 'additional_block';
  template?: string;
  fields?: UnifiedCatalogItem['fields'];
  isSkill: boolean;
  skillCommand?: string;
  skillRepo?: string;
  author: string;
  handle: string;
  sourceUrl?: string;
  previewVideo?: string;
  posterUrl?: string;
  tags: string[];
  liveUrl: string;
  customizeUrl?: string;
  chars: number;
  tokens: number;
}

function buildMcpCatalog(): McpPromptEntry[] {
  const map = new Map<string, McpPromptEntry>();

  for (const item of ALL_UNIFIED_ITEMS) {
    const promptBody =
      item.originalPrompt ||
      (item.isSkill
        ? [
            item.skillDescription || item.summary,
            item.skillCommand ? `Install command: ${item.skillCommand}` : '',
            item.skillRepo ? `Repository: ${item.skillRepo}` : '',
          ]
            .filter(Boolean)
            .join('\n\n')
        : item.summary);

    map.set(item.slug, {
      slug: item.slug,
      title: item.title,
      category: item.category,
      categorySlug: item.categorySlug,
      subcategory: item.subcategory,
      resourceTypeLabel: item.resourceTypeLabel,
      description: item.summary || `${item.title} (${item.category})`,
      prompt: promptBody,
      hasCustomize: item.hasCustomize,
      customizerType: item.customizerType,
      template: item.template,
      fields: item.fields,
      isSkill: item.isSkill,
      skillCommand: item.skillCommand,
      skillRepo: item.skillRepo,
      author: item.author,
      handle: item.handle,
      sourceUrl: item.sourceUrl,
      previewVideo: item.videoUrl || undefined,
      posterUrl: item.posterUrl || undefined,
      tags: item.tags,
      liveUrl: `https://axeslab.zainaxes.com/resource/${item.slug}`,
      customizeUrl: item.hasCustomize
        ? `https://axeslab.zainaxes.com/customize/${item.slug}`
        : undefined,
      chars: promptBody.length,
      tokens: item.tokens || Math.max(1, Math.round(promptBody.length / 4)),
    });
  }

  for (const tpl of TEMPLATES as TemplateItem[]) {
    const templateSlug = `template-${tpl.slug}`;
    const defaultPrompt = customizeTemplate(
      tpl.template,
      tpl.fields,
      Object.fromEntries(tpl.fields.map((f) => [f.key, f.default || ''])),
      DEFAULT_DIALS
    );

    const entry: McpPromptEntry = {
      slug: tpl.slug,
      title: `${tpl.title} (Template)`,
      category: 'Motion Templates',
      categorySlug: 'templates',
      subcategory: tpl.model,
      resourceTypeLabel: 'Template Blueprint',
      description: tpl.description,
      prompt: defaultPrompt,
      hasCustomize: true,
      customizerType: 'field_replacement',
      template: tpl.template,
      fields: tpl.fields,
      isSkill: false,
      author: 'Axes Lab',
      handle: 'axeslab',
      previewVideo: tpl.video,
      posterUrl: tpl.poster,
      tags: ['template', tpl.model, ...tpl.fields.map((f) => f.key)],
      liveUrl: `https://axeslab.zainaxes.com/templates/${tpl.slug}`,
      customizeUrl: `https://axeslab.zainaxes.com/templates/${tpl.slug}/customize`,
      chars: defaultPrompt.length,
      tokens: Math.max(1, Math.round(defaultPrompt.length / 4)),
    };

    if (!map.has(tpl.slug)) {
      map.set(tpl.slug, entry);
    } else {
      map.set(templateSlug, { ...entry, slug: templateSlug });
    }
  }

  return Array.from(map.values());
}

const MCP_CATALOG = buildMcpCatalog();
const typedTaxonomy = axeskitTaxonomy as Record<string, any>;

function normalizeAlnum(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function findPromptMatches(rawQuery: string, limit = 10): Array<{ item: McpPromptEntry; score: number }> {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];
  const qNorm = normalizeAlnum(q);
  const qWords = q.split(/[\s\-_/]+/).filter((w) => w.length >= 2);

  const scored: Array<{ item: McpPromptEntry; score: number }> = [];

  for (const item of MCP_CATALOG) {
    const slugLower = item.slug.toLowerCase();
    const titleLower = item.title.toLowerCase();
    const titleClean = titleLower.replace(/\s*\(template\)$/, '');
    const titleNorm = normalizeAlnum(titleClean);
    const slugNorm = normalizeAlnum(slugLower);
    const catLower = item.category.toLowerCase();
    const subLower = item.subcategory.toLowerCase();
    const tagsLower = item.tags.join(' ').toLowerCase();

    let score = 0;

    if (slugLower === q) score = 1000;
    else if (titleLower === q || titleClean === q) score = 960;
    else if (qNorm && (slugNorm === qNorm || titleNorm === qNorm)) score = 920;
    else if (titleClean.startsWith(q) || slugLower.startsWith(q)) score = 840;
    else if (titleClean.includes(q)) score = 760;
    else if (slugLower.includes(q.replace(/\s+/g, '-'))) score = 720;
    else if (qNorm && (titleNorm.includes(qNorm) || slugNorm.includes(qNorm))) score = 680;
    else if (qWords.length > 0) {
      const metaHaystack = `${titleLower} ${slugLower} ${catLower} ${subLower} ${tagsLower} ${item.handle.toLowerCase()}`;
      const matchedWords = qWords.filter((w) => metaHaystack.includes(w));
      if (matchedWords.length === qWords.length) {
        score = 540 + matchedWords.length * 10;
      } else if (matchedWords.length > 0) {
        score = 200 + Math.round((matchedWords.length / qWords.length) * 180);
      } else if (item.prompt.toLowerCase().includes(q)) {
        score = 120;
      }
    }

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit);
}

const TOOLS = [
  {
    name: 'axeslab_get_prompt',
    description:
      'Retrieve the complete, verbatim prompt and implementation specification for any Axes Lab website UI prompt, motion directive, template, or agent skill by its name or slug (e.g. "Interactive Discovery", "Asme", "Bold Studio", "Claude motion designer showreel").',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description:
            'Prompt name, title, or slug (e.g. "Interactive Discovery", "Asme", "Bold Studio"). Also accepts slug parameter.',
        },
        slug: {
          type: 'string',
          description: 'Optional exact slug (e.g. "interactive-discovery", "asme").',
        },
        query: {
          type: 'string',
          description: 'Optional fallback keyword query if exact name/slug is unknown.',
        },
        brand: {
          type: 'string',
          description: 'Optional brand/project name to inject for customizable motion prompts.',
        },
        notes: {
          type: 'string',
          description: 'Optional extra direction/notes for customizable motion prompts.',
        },
      },
      required: [],
    },
  },
  {
    name: 'axeslab_search_templates',
    description:
      'Search all 375+ Axes Lab UI prompts, motion graphics directives, 3D websites, UI sections, apps, backgrounds, templates, and agent skills by name, keyword, or category.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description:
            'Keyword or prompt name to search across titles, slugs, categories, tags, and prompt specifications.',
        },
        category: {
          type: 'string',
          description:
            'Filter by category or group name/slug (e.g. "Hero Section", "SaaS", "Kinetic Type", "3D Website", "Skills").',
        },
        limit: {
          type: 'number',
          description: 'Maximum results to return (default 15, max 50).',
        },
      },
      required: [],
    },
  },
  {
    name: 'axeslab_list_categories',
    description:
      'List all active Axes Lab categories across website UI prompts, motion prompts, templates, and agent skills with exact item counts.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'axeslab_generate_scaffold',
    description:
      'Generate ready-to-build framework implementation guidance alongside the full verbatim Axes Lab specification for a prompt name or slug.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Prompt slug or name (e.g. "interactive-discovery" or "Asme").',
        },
        name: {
          type: 'string',
          description: 'Alternative prompt name parameter.',
        },
        framework: {
          type: 'string',
          description: 'Target framework: "nextjs" | "react" | "html" | "vite". Defaults to "nextjs".',
        },
      },
      required: [],
    },
  },
  {
    name: 'axeskit_list_asset_categories',
    description:
      'List design asset taxonomy categories from AxesKit (icons, vector graphics, fonts, sound effects, lottie animations, UI kits, code snippets).',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'axeskit_get_design_guidelines',
    description:
      'Retrieve Axes Lab Console / AxesKit UI design tokens, typography pairings, color systems, and motion principles.',
    inputSchema: {
      type: 'object',
      properties: {
        style: {
          type: 'string',
          description: 'Preset: "console" (default) | "clean-saas" | "editorial" | "minimal".',
        },
      },
    },
  },
];

function applyOptionalCustomization(
  entry: McpPromptEntry,
  args: Record<string, any>
): string | undefined {
  const brand = typeof args?.brand === 'string' ? args.brand.trim() : '';
  const notes = typeof args?.notes === 'string' ? args.notes.trim() : '';
  if (!entry.hasCustomize || (!brand && !notes)) return undefined;

  if (entry.customizerType === 'field_replacement' && entry.template && entry.fields) {
    const values: Record<string, string> = {};
    for (const f of entry.fields) {
      values[f.key] = f.default || '';
    }
    if (brand) {
      const conceptField = entry.fields.find((f) => f.key === 'concept' || f.key === 'about');
      if (conceptField) {
        values[conceptField.key] = notes ? `${brand} — ${notes}` : brand;
      }
    }
    const base = customizeTemplate(entry.template, entry.fields, values, DEFAULT_DIALS);
    return notes && !entry.fields.some((f) => f.key === 'concept')
      ? `${base}\n\nAdditional notes: ${notes}`
      : base;
  }

  return withDetails(
    entry.prompt,
    {
      about: brand || '',
      format: '',
      length: '',
      colours: '',
      typeface: '',
      notes,
    },
    DEFAULT_DIALS
  );
}

function handleSearchTemplates(params: Record<string, any>) {
  const query = String(params?.query || '').trim();
  const category = String(params?.category || '').trim().toLowerCase();
  const limit = Math.min(Math.max(Number(params?.limit) || 15, 1), 50);

  let pool = MCP_CATALOG;

  if (category) {
    pool = pool.filter(
      (item) =>
        item.category.toLowerCase().includes(category) ||
        item.categorySlug.toLowerCase().includes(category) ||
        item.subcategory.toLowerCase().includes(category) ||
        item.tags.some((t) => t.toLowerCase().includes(category))
    );
  }

  let items: McpPromptEntry[];
  if (query) {
    const ranked = findPromptMatches(query, 80)
      .map((m) => m.item)
      .filter((item) =>
        !category
          ? true
          : item.category.toLowerCase().includes(category) ||
            item.categorySlug.toLowerCase().includes(category) ||
            item.subcategory.toLowerCase().includes(category) ||
            item.tags.some((t) => t.toLowerCase().includes(category))
      );
    items = ranked.slice(0, limit);
  } else {
    items = pool.slice(0, limit);
  }

  return {
    totalCatalogItems: MCP_CATALOG.length,
    returnedCount: items.length,
    templates: items.map((item) => ({
      slug: item.slug,
      title: item.title,
      type: item.resourceTypeLabel,
      category: item.category,
      subcategory: item.subcategory,
      author: `@${item.handle}`,
      customizable: item.hasCustomize,
      description: item.description,
      previewVideo: item.previewVideo,
      liveUrl: item.liveUrl,
      customizeUrl: item.customizeUrl,
      skillCommand: item.skillCommand,
    })),
  };
}

function handleGetPrompt(params: Record<string, any>) {
  const lookup = String(params?.slug || params?.name || params?.query || '').trim();
  if (!lookup) {
    return {
      found: false as const,
      error: 'Provide a prompt name, title, or slug (e.g. "Interactive Discovery" or "asme").',
      availableCount: MCP_CATALOG.length,
      examples: MCP_CATALOG.slice(0, 8).map((i) => ({ title: i.title, slug: i.slug })),
    };
  }

  const matches = findPromptMatches(lookup, 6);
  const top = matches[0];

  if (!top || top.score < 200) {
    return {
      found: false as const,
      query: lookup,
      message: `No close match found for "${lookup}". Call axeslab_search_templates with broader keywords.`,
      suggestions: matches.map((m) => ({
        slug: m.item.slug,
        title: m.item.title,
        category: m.item.category,
      })),
    };
  }

  const entry = top.item;
  const customizedPrompt = applyOptionalCustomization(entry, params);

  return {
    found: true as const,
    matchedBy: top.score >= 900 ? 'exact' : top.score >= 540 ? 'title_match' : 'fuzzy_match',
    slug: entry.slug,
    title: entry.title,
    type: entry.resourceTypeLabel,
    category: entry.category,
    subcategory: entry.subcategory,
    author: entry.author,
    handle: `@${entry.handle}`,
    sourceUrl: entry.sourceUrl,
    liveUrl: entry.liveUrl,
    customizeUrl: entry.customizeUrl,
    videoUrl: entry.previewVideo,
    skillCommand: entry.skillCommand,
    skillRepo: entry.skillRepo,
    chars: entry.chars,
    tokens: entry.tokens,
    prompt: entry.prompt,
    ...(customizedPrompt ? { customizedPrompt } : {}),
    ...(top.score < 900 && matches.length > 1
      ? {
          otherPossibleMatches: matches.slice(1, 5).map((m) => ({
            slug: m.item.slug,
            title: m.item.title,
            category: m.item.category,
          })),
        }
      : {}),
  };
}

function handleListCategories() {
  const counts = new Map<string, { name: string; slug: string; count: number }>();

  for (const item of MCP_CATALOG) {
    const key = item.categorySlug || item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = counts.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(key, { name: item.category, slug: key, count: 1 });
    }
  }

  const categories = Array.from(counts.values()).sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  );

  return {
    totalCategories: categories.length,
    totalPrompts: MCP_CATALOG.length,
    categoriesUrl: 'https://axeslab.zainaxes.com/categories',
    categories,
  };
}

function handleGenerateScaffold(params: Record<string, any>) {
  const lookup = String(params?.slug || params?.name || params?.query || '').trim();
  const framework = String(params?.framework || 'nextjs').trim() || 'nextjs';

  const result = handleGetPrompt({ ...params, slug: lookup });
  if (!result.found) return result;

  return {
    slug: result.slug,
    title: result.title,
    framework,
    category: result.category,
    recommendedDependencies: ['lucide-react', 'clsx', 'tailwind-merge'],
    instructions: `Implement "${result.title}" in your ${framework} project following the exact Axes Lab prompt specification below.`,
    spec: result.customizedPrompt || result.prompt,
    liveUrl: result.liveUrl,
    customizeUrl: result.customizeUrl,
  };
}

function handleAxesKitAssetCategories() {
  return {
    ecosystem: 'AxesKit Assets & Tools',
    liveUrl: 'https://axeskit.zainaxes.com',
    categories: Object.entries(typedTaxonomy).map(([key, val]: [string, any]) => ({
      slug: key,
      name: val.name || key,
      subcategoriesCount: val.daughters?.length || 0,
      subcategories: val.daughters?.map((d: any) => d.slug) || [],
    })),
  };
}

function handleAxesKitDesignGuidelines(params: Record<string, any>) {
  const style = String(params?.style || 'console');
  return {
    style,
    system: 'Axes Lab Console Design System',
    colorTokens: {
      paper: 'oklch(17% 0.008 250)',
      paper2: 'oklch(21% 0.009 250)',
      paper3: 'oklch(13.5% 0.007 250)',
      ink: 'oklch(95% 0.005 250)',
      ink2: 'oklch(83% 0.008 250)',
      muted: 'oklch(71% 0.01 250)',
      rule: 'oklch(31% 0.01 250)',
      accent: 'oklch(82% 0.15 80)',
      cool: 'oklch(77% 0.12 245)',
    },
    typography: {
      display: '"Host Grotesk", ui-sans-serif, system-ui, sans-serif',
      body: '"Host Grotesk", ui-sans-serif, system-ui, sans-serif',
      mono: '"Atkinson Hyperlegible Mono", ui-monospace, monospace',
    },
    motionRules: {
      library: 'GSAP / CSS transform & opacity only',
      easeOut: 'power3.out / cubic-bezier(0.16, 1, 0.3, 1)',
      reducedMotion: 'Always respect prefers-reduced-motion: reduce',
    },
    axesLabUrl: 'https://axeslab.zainaxes.com',
    axesKitUrl: 'https://axeskit.zainaxes.com',
  };
}

function corsHeaders(sessionId?: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Accept, Authorization, Mcp-Session-Id, Last-Event-ID, MCP-Protocol-Version',
    'Access-Control-Expose-Headers': 'Mcp-Session-Id, MCP-Protocol-Version',
  };
  if (sessionId) {
    headers['Mcp-Session-Id'] = sessionId;
  }
  return headers;
}

function processRpcMessage(
  rpc: Record<string, any>
): { response: Record<string, any> | null; sessionId?: string } {
  const { method, params, id } = rpc;
  const hasId = id !== undefined && id !== null;

  const ok = (result: any) => ({ jsonrpc: '2.0', result, id });
  const err = (code: number, message: string) => ({
    jsonrpc: '2.0',
    error: { code, message },
    id: hasId ? id : null,
  });

  // Notifications without an id require no JSON-RPC response
  if (!hasId || (typeof method === 'string' && method.startsWith('notifications/'))) {
    return { response: null };
  }

  switch (method) {
    case 'initialize': {
      const requested = params?.protocolVersion;
      const negotiated = SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
        ? requested
        : '2024-11-05';
      const sessionId =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `axeslab-${Date.now()}`;

      return {
        sessionId,
        response: ok({
          protocolVersion: negotiated,
          capabilities: {
            tools: { listChanged: false },
            prompts: { listChanged: false },
            resources: { listChanged: false },
          },
          serverInfo: SERVER_INFO,
          instructions: SERVER_INSTRUCTIONS,
        }),
      };
    }

    case 'ping':
      return { response: ok({}) };

    case 'tools/list':
      return { response: ok({ tools: TOOLS }) };

    case 'tools/call': {
      const toolName = params?.name;
      const toolArgs = params?.arguments || {};
      let content: any = null;

      if (toolName === 'axeslab_search_templates') {
        content = handleSearchTemplates(toolArgs);
      } else if (toolName === 'axeslab_get_prompt') {
        content = handleGetPrompt(toolArgs);
      } else if (toolName === 'axeslab_list_categories') {
        content = handleListCategories();
      } else if (toolName === 'axeslab_generate_scaffold') {
        content = handleGenerateScaffold(toolArgs);
      } else if (toolName === 'axeskit_list_asset_categories') {
        content = handleAxesKitAssetCategories();
      } else if (toolName === 'axeskit_get_design_guidelines') {
        content = handleAxesKitDesignGuidelines(toolArgs);
      } else {
        return {
          response: err(-32601, `Tool "${toolName}" not found on Axes Lab MCP server.`),
        };
      }

      return {
        response: ok({
          content: [
            {
              type: 'text',
              text: typeof content === 'string' ? content : JSON.stringify(content, null, 2),
            },
          ],
        }),
      };
    }

    case 'prompts/list': {
      return {
        response: ok({
          prompts: MCP_CATALOG.map((item) => ({
            name: item.slug,
            title: item.title,
            description: `${item.category} · ${item.description}`,
            ...(item.hasCustomize
              ? {
                  arguments: [
                    {
                      name: 'brand',
                      description: 'Optional brand or product name to personalize the prompt',
                      required: false,
                    },
                    {
                      name: 'notes',
                      description: 'Optional extra visual or layout instructions',
                      required: false,
                    },
                  ],
                }
              : {}),
          })),
        }),
      };
    }

    case 'prompts/get': {
      const promptName = String(params?.name || '').trim();
      if (!promptName) {
        return { response: err(-32602, 'Missing required parameter: name') };
      }
      const promptArgs = params?.arguments || {};
      const match = findPromptMatches(promptName, 1)[0];
      if (!match || match.score < 200) {
        return {
          response: err(-32602, `Prompt "${promptName}" was not found in Axes Lab.`),
        };
      }

      const entry = match.item;
      const custom = applyOptionalCustomization(entry, promptArgs);
      const finalPrompt = custom || entry.prompt;

      return {
        response: ok({
          description: `${entry.title} (${entry.category}) — ${entry.liveUrl}`,
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Apply the following Axes Lab prompt specification ("${entry.title}", ${entry.liveUrl}):\n\n${finalPrompt}`,
              },
            },
          ],
        }),
      };
    }

    case 'resources/list': {
      return {
        response: ok({
          resources: MCP_CATALOG.map((item) => ({
            uri: `axeslab://prompt/${item.slug}`,
            name: item.title,
            description: `${item.category} · ${item.description}`,
            mimeType: 'text/plain',
          })),
        }),
      };
    }

    case 'resources/read': {
      const uri = String(params?.uri || '').trim();
      const slugFromUri = uri.replace(/^axeslab:\/\/prompt\//i, '').trim();
      const match = findPromptMatches(slugFromUri, 1)[0];
      if (!match || match.score < 500) {
        return { response: err(-32602, `Resource not found: ${uri}`) };
      }

      return {
        response: ok({
          contents: [
            {
              uri,
              mimeType: 'text/plain',
              text: match.item.prompt,
            },
          ],
        }),
      };
    }

    default:
      return { response: err(-32601, `Method "${method}" is not supported.`) };
  }
}

export async function POST(req: NextRequest) {
  const incomingSession = req.headers.get('mcp-session-id');

  try {
    const body = await req.json();

    if (Array.isArray(body)) {
      let generatedSession: string | undefined;
      const responses: Record<string, any>[] = [];

      for (const item of body) {
        const res = processRpcMessage(item);
        if (res.sessionId) generatedSession = res.sessionId;
        if (res.response) responses.push(res.response);
      }

      const headers = corsHeaders(generatedSession || incomingSession);
      if (responses.length === 0) {
        return new NextResponse(null, { status: 202, headers });
      }
      return NextResponse.json(responses, { headers });
    }

    const result = processRpcMessage(body);
    const headers = corsHeaders(result.sessionId || incomingSession);

    if (!result.response) {
      return new NextResponse(null, { status: 202, headers });
    }

    return NextResponse.json(result.response, { headers });
  } catch (error: any) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: { code: -32700, message: error?.message || 'Invalid JSON-RPC payload' },
        id: null,
      },
      { status: 400, headers: corsHeaders(incomingSession) }
    );
  }
}

export async function GET(req: NextRequest) {
  const accept = req.headers.get('accept') || '';

  // Per MCP Streamable HTTP spec: return 405 when client attempts background SSE GET stream on stateless JSON endpoint
  if (accept.includes('text/event-stream') && !accept.includes('text/html') && !accept.includes('application/json')) {
    return new NextResponse('Streamable HTTP POST endpoint only.', {
      status: 405,
      headers: {
        Allow: 'POST, OPTIONS, DELETE',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  return NextResponse.json(
    {
      ...SERVER_INFO,
      endpoint: 'https://axeslab.zainaxes.com/api/mcp',
      transport: 'Streamable HTTP (stateless JSON-RPC 2.0)',
      totalPrompts: MCP_CATALOG.length,
      installCommand: 'npx add-mcp https://axeslab.zainaxes.com/api/mcp --name axeslab',
      claudeCodeCommand:
        'claude mcp add --transport http axeslab https://axeslab.zainaxes.com/api/mcp',
      docs: 'https://axeslab.zainaxes.com/mcp',
      capabilities: ['tools', 'prompts', 'resources'],
      tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
    },
    {
      headers: corsHeaders(null),
    }
  );
}

export async function DELETE() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(null),
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(null),
  });
}
