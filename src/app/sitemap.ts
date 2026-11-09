import { MetadataRoute } from "next";
import { getCategories, getResources, getCollections } from "@/lib/queries";
import { ALL_REAL_PROMPTS } from "@/lib/real-prompts";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://axeslab.zainaxes.com";
  const now = new Date();

  // Static core routes
  const staticRoutes = [
    "",
    "/prompts",
    "/motion-ads",
    "/templates",
    "/customize",
    "/backgrounds",
    "/sections",
    "/3d-websites",
    "/apps",
    "/top",
    "/web-design",
    "/mcp",
    "/explore",
    "/collections",
    "/submit",
    "/about",
    "/methodology",
    "/licensing",
    "/safety-and-security",
    "/contact",
    "/changelog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Categories & Subcategories
  const categories = getCategories();
  const categoryRoutes: MetadataRoute.Sitemap = [];

  for (const cat of categories) {
    categoryRoutes.push({
      url: `${baseUrl}/${cat.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    });

    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        categoryRoutes.push({
          url: `${baseUrl}/${cat.slug}/${sub.slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  }

  // Collections
  const collections = getCollections();
  const collectionRoutes = collections.map((col) => ({
    url: `${baseUrl}/collections/${col.slug}`,
    lastModified: new Date(col.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Curated UI Resources
  const { resources } = getResources({ limit: 1000 });
  const resourceRoutes = resources.map((r) => ({
    url: `${baseUrl}/resource/${r.slug}`,
    lastModified: new Date(r.updated_at || r.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Discovered Motion Prompts
  const promptRoutes = ALL_REAL_PROMPTS.map((p) => ({
    url: `${baseUrl}/resource/${p.slug}`,
    lastModified: new Date(p.date ? `${p.date}T00:00:00.000Z` : now),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...collectionRoutes,
    ...resourceRoutes,
    ...promptRoutes,
  ];
}
