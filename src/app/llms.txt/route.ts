import { NextResponse } from "next/server";
import { getCategories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const categories = getCategories();
  const baseUrl = "https://axeslab.zainaxes.com";

  const categoryLines = categories
    .map((c) => `- [${c.name}](${baseUrl}/${c.slug}): ${c.description || ""}`)
    .join("\n");

  const body = `# Axes Lab

> Discover the tools behind AI. An independent library of AI prompts, agent skills, MCP servers, workflows and open-source resources.

## Browse the library
- [All resources](${baseUrl}/explore)
${categoryLines}
- [Curated collections](${baseUrl}/collections)

## Trust and policy
- [Curation methodology](${baseUrl}/methodology)
- [Licensing and redistribution](${baseUrl}/licensing)
- [Security and safety policy](${baseUrl}/safety-and-security)
- [About Axes Lab](${baseUrl}/about)
- [Contact and corrections](${baseUrl}/contact)

## Machine-readable catalogue
- [Public catalogue feed](${baseUrl}/api/public/resources)
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
