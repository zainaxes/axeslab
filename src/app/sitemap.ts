import { MetadataRoute } from "next";
import { getCategories, getResources, getCollections } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://axeslab.org";
  const now = new Date();

  // Static core routes
  const staticRoutes = [
    "",
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

  // Resources
  const { resources } = getResources({ limit: 1000 });
  const resourceRoutes = resources.map((r) => ({
    url: `${baseUrl}/resource/${r.slug}`,
    lastModified: new Date(r.updated_at || r.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...collectionRoutes, ...resourceRoutes];
}
