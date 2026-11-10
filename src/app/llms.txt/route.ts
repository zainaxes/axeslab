import { NextResponse } from "next/server";
import { getCategories, getResources } from "@/lib/queries";
import { CATALOG_COUNTS } from "@/lib/unified-catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = "https://axeslab.zainaxes.com";
  const categories = getCategories();
  const { resources } = getResources({ limit: 1000 });

  const subCounts = new Map<string, number>();
  const catCounts = new Map<string, number>();
  for (const r of resources) {
    if (r.primary_category_id) {
      catCounts.set(r.primary_category_id, (catCounts.get(r.primary_category_id) ?? 0) + 1);
    }
    if (r.subcategory_id) {
      subCounts.set(r.subcategory_id, (subCounts.get(r.subcategory_id) ?? 0) + 1);
    }
  }

  const activeCategoryLines = categories
    .filter(
      (c) =>
        (catCounts.get(c.id) ?? 0) > 0 ||
        Boolean(c.subcategories?.some((s) => (subCounts.get(s.id) ?? 0) > 0))
    )
    .map((c) => `- [${c.name}](${baseUrl}/${c.slug}): ${c.description || "Curated AI design prompts"}`)
    .join("\n");

  const body = `# Axes Lab

> Axes Lab is a curated AI motion, web UI, and interactive prompt engineering laboratory built by ZainAxes (${CATALOG_COUNTS.total} verified catalogue items: ${CATALOG_COUNTS.websiteUi} website UI prompts, ${CATALOG_COUNTS.motionTotal} motion & interactive prompts, and ${CATALOG_COUNTS.skills} agent skills).

## Primary Discovery Surfaces
- [All Catalogue (${CATALOG_COUNTS.total})](${baseUrl}/): Unified media-led gallery with instant prompt copy, preview theater, and live motion customizer
- [Categories Index](${baseUrl}/categories): Complete taxonomy directory across Website UI and Motion prompts with real item counts
- [Website UI Prompts (${CATALOG_COUNTS.websiteUi})](${baseUrl}/web-design): Hero sections, SaaS landing pages, portfolios, and full page prompts
- [Motion Prompts (${CATALOG_COUNTS.motionTotal})](${baseUrl}/prompts): Interactive motion, UI showcase, and product ad prompts with parameter customizer
- [Sections](${baseUrl}/sections): Component & section-level prompts (heroes, marquees, pricing, features, footers)
- [3D Websites](${baseUrl}/3d-websites): Interactive 3D, WebGL, and spatial web design prompts
- [Apps](${baseUrl}/apps): Web app, SaaS dashboard, and fintech product UI prompts
- [Backgrounds](${baseUrl}/backgrounds): Shaders, gradients, atmospheric layers, and backdrop effects
- [Agent Skills (${CATALOG_COUNTS.skills})](${baseUrl}/skills): Installable coding-agent skills via npx skills add
- [Templates](${baseUrl}/templates): Parameterized motion templates with live customization
- [Prompt Customizer Hub](${baseUrl}/customize): Real-time parameter & dial customizer for motion prompts
- [Restyle Workbench](${baseUrl}/restyle): Interactive CSS design-token restyler and Tailwind config exporter
- [Curated Collections](${baseUrl}/collections): Thematic groupings of verified prompts
- [Top Rated](${baseUrl}/top): Community-ranked prompts and agent skills
- [Explore Archive](${baseUrl}/explore): Full tabular browse and filter directory
- [MCP Integration](${baseUrl}/mcp): Connect Axes Lab to AI IDEs and coding agents via MCP

## Active Catalogue Taxonomies
${activeCategoryLines}

## Attribution, Policy & Documentation
- [About Axes Lab & ZainAxes](${baseUrl}/about): Mission, parent brand context, and platform principles
- [Resource Ownership & Licensing](${baseUrl}/licensing): Attribution standards, official creator sources, and rights classifications
- [Curation Methodology](${baseUrl}/methodology): Verification criteria and classification rules
- [Security & Safety](${baseUrl}/safety-and-security): Malware checking, sandboxing guidance, and reporting
- [Privacy Policy](${baseUrl}/privacy): Local storage usage, zero tracking guarantees, and data policy
- [Terms of Use](${baseUrl}/terms): Catalogue terms, acceptable use, and attribution requirements
- [Submit Resource](${baseUrl}/submit): Community submission intake for review
- [Contact & Corrections](${baseUrl}/contact): Broken link reporting and takedown requests

## Machine-Readable Endpoints
- [Sitemap XML](${baseUrl}/sitemap.xml)
- [Robots.txt](${baseUrl}/robots.txt)
- [Public Catalogue JSON Feed](${baseUrl}/api/public/resources)
- [MCP Endpoint](${baseUrl}/api/mcp)
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
