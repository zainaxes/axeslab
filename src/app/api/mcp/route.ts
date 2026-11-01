import { NextRequest, NextResponse } from 'next/server';
import promptsData from '@/lib/generated-prompts.json';
import catalogData from '../../../../data/catalog.json';
import axeskitTaxonomy from '../../../../data/axeskit_taxonomy.json';

interface CatalogPrompt {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  description?: string;
  preview_video_url?: string;
  videoUrl?: string;
  posterUrl?: string;
  raw_prompt_original?: string;
}

const typedCatalog = (catalogData as unknown) as CatalogPrompt[];
const rawPromptsArray = (promptsData as unknown) as CatalogPrompt[];
const typedTaxonomy = axeskitTaxonomy as Record<string, any>;

// Build slug -> prompt map
const promptMap: Record<string, string> = {};
rawPromptsArray.forEach((item) => {
  if (item.slug && item.raw_prompt_original) {
    promptMap[item.slug] = item.raw_prompt_original;
  }
});

// Unified Tool definitions for MCP (Axes Lab + AxesKit merged)
const TOOLS = [
  {
    name: 'axeslab_search_templates',
    description: 'Search Axes Lab curated UI templates and motion prompts by query, topic, or category (e.g. "hero", "bento", "pricing", "cards", "3D").',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Keyword to search across titles, descriptions, categories, and prompt code.',
        },
        category: {
          type: 'string',
          description: 'Filter strictly by category name or category slug (optional).',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of items to return (default 10).',
        },
      },
      required: [],
    },
  },
  {
    name: 'axeslab_get_prompt',
    description: 'Retrieve the complete, exact production-grade prompt and scaffold instructions for a specific Axes Lab component by its slug.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The exact slug of the component (e.g. "animated-feature-cards", "3d-interactive-cube", "cosmic-hero").',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'axeslab_list_categories',
    description: 'List all 34 design categories with active component counts available in Axes Lab.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'axeslab_generate_scaffold',
    description: 'Generate ready-to-run Next.js + Tailwind CSS + Lucide React code scaffold instructions based on an Axes Lab component slug.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The component slug to generate a scaffold for.',
        },
        framework: {
          type: 'string',
          description: 'Target framework: "nextjs" | "react" | "html". Defaults to "nextjs".',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'axeskit_list_asset_categories',
    description: 'List all design asset categories from AxesKit (icons, vector graphics, fonts, sound effects, lottie animations, UI kits, code snippets).',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'axeskit_get_design_guidelines',
    description: 'Retrieve AxesKit UI/UX design tokens, typography pairings, color systems, and stack recommendations.',
    inputSchema: {
      type: 'object',
      properties: {
        style: {
          type: 'string',
          description: 'Design style: "clean-saas" | "dark-luxury" | "cyberpunk" | "editorial" | "minimal".',
        },
      },
    },
  },
];

function handleSearchTemplates(params: any) {
  const query = (params?.query || '').toLowerCase().trim();
  const category = (params?.category || '').toLowerCase().trim();
  const limit = Math.min(Math.max(params?.limit || 10, 1), 50);

  let results = typedCatalog.filter((item) => {
    if (category) {
      const matchCat =
        (item.category || '').toLowerCase().includes(category) ||
        (item.categorySlug || '').toLowerCase().includes(category);
      if (!matchCat) return false;
    }
    if (query) {
      const matchQuery =
        (item.title || '').toLowerCase().includes(query) ||
        (item.description || '').toLowerCase().includes(query) ||
        (item.slug || '').toLowerCase().includes(query) ||
        (item.category || '').toLowerCase().includes(query);
      return matchQuery;
    }
    return true;
  });

  results = results.slice(0, limit);

  return {
    count: results.length,
    templates: results.map((item) => ({
      slug: item.slug,
      title: item.title,
      category: item.category,
      categorySlug: item.categorySlug,
      description: item.description,
      hasFullPrompt: Boolean(promptMap[item.slug]),
      previewVideo: item.videoUrl || item.preview_video_url,
      liveUrl: `https://axeslab.zainaxes.com/item/${item.slug}`,
    })),
  };
}

function handleGetPrompt(params: any) {
  const slug = (params?.slug || '').trim();
  if (!slug) {
    throw new Error('Missing required parameter: slug');
  }

  const catalogEntry = typedCatalog.find((c) => c.slug === slug);
  const promptText = promptMap[slug];

  if (!catalogEntry && !promptText) {
    throw new Error(`Template with slug "${slug}" not found in Axes Lab catalog.`);
  }

  return {
    slug,
    title: catalogEntry?.title || slug,
    category: catalogEntry?.category || 'General',
    description: catalogEntry?.description || '',
    videoUrl: catalogEntry?.videoUrl || catalogEntry?.preview_video_url,
    prompt: promptText || 'Prompt text not available for this entry.',
    liveUrl: `https://axeslab.zainaxes.com/item/${slug}`,
  };
}

function handleListCategories() {
  const map: Record<string, { name: string; slug: string; count: number }> = {};

  typedCatalog.forEach((item) => {
    const slug = item.categorySlug;
    if (!map[slug]) {
      map[slug] = {
        name: item.category,
        slug: item.categorySlug,
        count: 0,
      };
    }
    map[slug].count++;
  });

  const categories = Object.values(map).sort((a, b) => b.count - a.count);

  return {
    totalCategories: categories.length,
    totalTemplates: typedCatalog.length,
    categories,
  };
}

function handleGenerateScaffold(params: any) {
  const slug = (params?.slug || '').trim();
  const framework = params?.framework || 'nextjs';

  const entry = typedCatalog.find((c) => c.slug === slug);
  const prompt = promptMap[slug];

  if (!entry && !prompt) {
    throw new Error(`Template "${slug}" not found.`);
  }

  return {
    slug,
    framework,
    requiredDependencies: ['lucide-react', 'clsx', 'tailwind-merge', 'motion/react'],
    instructions: `Implement the "${entry?.title || slug}" component into your ${framework} app. Follow the exact design specification below.`,
    spec: prompt || entry?.description,
    liveUrl: `https://axeslab.zainaxes.com/item/${slug}`,
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

function handleAxesKitDesignGuidelines(params: any) {
  const style = params?.style || 'dark-luxury';
  return {
    style,
    colorTokens: {
      background: '#050507',
      cardSurface: '#0B0B10',
      borderSubtle: 'rgba(255, 255, 255, 0.08)',
      primaryAccent: '#8B5CF6',
      emeraldHighlight: '#10B981',
      textPrimary: '#FAFAFA',
      textMuted: '#A1A1AA',
    },
    typography: {
      primary: 'Inter, -apple-system, sans-serif',
      headingAccent: 'Playfair Display, serif (italic)',
      code: 'JetBrains Mono, monospace',
    },
    motionRules: {
      timingCurve: 'cubic-bezier(0.16, 1, 0.3, 1)',
      standardDuration: '300ms',
      hoverTransform: 'translateY(-4px)',
    },
    axesKitUrl: 'https://axeskit.zainaxes.com',
    axesLabUrl: 'https://axeslab.zainaxes.com',
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jsonrpc, method, params, id } = body;

    const responseHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    const makeResponse = (result: any) =>
      NextResponse.json({ jsonrpc: '2.0', result, id: id ?? 1 }, { headers: responseHeaders });

    const makeError = (code: number, message: string) =>
      NextResponse.json(
        {
          jsonrpc: '2.0',
          error: { code, message },
          id: id ?? 1,
        },
        { status: 400, headers: responseHeaders }
      );

    switch (method) {
      case 'initialize':
        return makeResponse({
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
          },
          serverInfo: {
            name: 'axeslab & axeskit unified mcp server',
            version: '2.0.0',
            description: 'Axes Lab & AxesKit Unified HTTP MCP Server - Search & scaffold 130+ production UI templates, design tokens, and multi-asset libraries.',
          },
        });

      case 'notifications/initialized':
        return new NextResponse(null, { status: 204, headers: responseHeaders });

      case 'tools/list':
        return makeResponse({
          tools: TOOLS,
        });

      case 'tools/call': {
        const toolName = params?.name;
        const toolArguments = params?.arguments || {};

        let content: any = null;

        if (toolName === 'axeslab_search_templates') {
          content = handleSearchTemplates(toolArguments);
        } else if (toolName === 'axeslab_get_prompt') {
          content = handleGetPrompt(toolArguments);
        } else if (toolName === 'axeslab_list_categories') {
          content = handleListCategories();
        } else if (toolName === 'axeslab_generate_scaffold') {
          content = handleGenerateScaffold(toolArguments);
        } else if (toolName === 'axeskit_list_asset_categories') {
          content = handleAxesKitAssetCategories();
        } else if (toolName === 'axeskit_get_design_guidelines') {
          content = handleAxesKitDesignGuidelines(toolArguments);
        } else {
          return makeError(-32601, `Tool "${toolName}" not found on unified MCP server.`);
        }

        return makeResponse({
          content: [
            {
              type: 'text',
              text: typeof content === 'string' ? content : JSON.stringify(content, null, 2),
            },
          ],
        });
      }

      default:
        return makeError(-32601, `Method "${method}" is not supported.`);
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: { code: -32603, message: error.message || 'Internal MCP server error' },
        id: 1,
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      name: 'axeslab & axeskit unified mcp server',
      version: '2.0.0',
      description: 'Unified Streamable HTTP MCP Server covering Axes Lab prompts & AxesKit design assets.',
      docs: 'https://axeslab.zainaxes.com/mcp',
      tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
