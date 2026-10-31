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
