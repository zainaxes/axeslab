/**
 * Normalizes any YouTube URL or ID into an embeddable URL and extracts video ID.
 */
export function getYouTubeVideoId(input?: string | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Extract from embed URL
  const matchEmbed = trimmed.match(/youtube\.com\/embed\/([^"&?\/\s]{11})/i);
  if (matchEmbed && matchEmbed[1]) return matchEmbed[1];

  // Extract from watch or short URL
  const matchWatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (matchWatch && matchWatch[1]) return matchWatch[1];

  // Extract from shorts
  const matchShorts = trimmed.match(/youtube\.com\/shorts\/([^"&?\/\s]{11})/i);
  if (matchShorts && matchShorts[1]) return matchShorts[1];

  // Direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function getYouTubeEmbedUrl(input?: string | null, autoplay = false): string | null {
  const id = getYouTubeVideoId(input);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&rel=0`;
}

export function getYouTubeThumbnailUrl(input?: string | null): string | null {
  const id = getYouTubeVideoId(input);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export function isYouTubeUrl(input?: string | null): boolean {
  if (!input) return false;
  return getYouTubeVideoId(input) !== null;
}

/**
 * Returns a proxied media URL if the source is from external origins that have strict CORS/CORP policies,
 * ensuring browsers can load previews and videos without cross-origin blocks.
 */
export function getProxiedMediaUrl(url?: string | null): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // YouTube thumbnails or embeds don't need proxying
  if (isYouTubeUrl(trimmed) || trimmed.includes("youtube.com") || trimmed.includes("youtu.be")) {
    return trimmed;
  }

  // If already proxied or relative local file, return as is
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    // Proxy domains known for strict CORP (Cross-Origin-Resource-Policy: same-origin)
    if (parsed.hostname === "meez.design" || parsed.hostname.endsWith(".meez.design")) {
      return `/api/media-proxy?url=${encodeURIComponent(trimmed)}`;
    }
  } catch {
    // Return original if invalid URL format
  }

  return trimmed;
}

/**
 * High-aesthetic category poster fallback for items without explicit media assets.
 */
export function getCategoryFallbackPoster(categoryName?: string | null, title?: string | null): string {
  const cat = (categoryName || "General").toLowerCase();

  if (cat.includes("3d") || cat.includes("planet") || cat.includes("space")) {
    return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
  }
  if (cat.includes("ai") || cat.includes("cyber") || cat.includes("intelligence") || cat.includes("bot")) {
    return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80";
  }
  if (cat.includes("saas") || cat.includes("platform") || cat.includes("dashboard") || cat.includes("analytics")) {
    return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";
  }
  if (cat.includes("real estate") || cat.includes("property") || cat.includes("lodge") || cat.includes("building")) {
    return "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";
  }
  if (cat.includes("fintech") || cat.includes("finance") || cat.includes("crypto") || cat.includes("trading")) {
    return "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80";
  }
  if (cat.includes("ecommerce") || cat.includes("store") || cat.includes("product") || cat.includes("shop")) {
    return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80";
  }
  if (cat.includes("health") || cat.includes("wellness") || cat.includes("medical") || cat.includes("care")) {
    return "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80";
  }
  if (cat.includes("hero") || cat.includes("landing")) {
    return "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80";
  }
  if (cat.includes("creative") || cat.includes("portfolio") || cat.includes("studio") || cat.includes("design")) {
    return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80";
  }

  // Default deep dark cybernetic abstract poster
  return "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80";
}

