import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/account/",
          "/api/private/",
          "/api/admin/",
          "/preview/",
          "/internal/",
        ],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin/", "/account/", "/api/admin/", "/preview/"],
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        disallow: ["/admin/", "/account/", "/api/admin/", "/preview/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/account/", "/api/admin/", "/preview/"],
      },
    ],
    sitemap: "https://axeslab.zainaxes.com/sitemap.xml",
  };
}
