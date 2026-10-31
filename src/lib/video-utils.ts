/**
 * Normalizes any YouTube URL or ID into an embeddable URL.
 * Supports:
 * - Full URLs: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * - Short URLs: https://youtu.be/dQw4w9WgXcQ
 * - Embed URLs: https://www.youtube.com/embed/dQw4w9WgXcQ
 * - Shorts: https://www.youtube.com/shorts/dQw4w9WgXcQ
 * - Direct IDs: dQw4w9WgXcQ
 */
export function getYouTubeEmbedUrl(input?: string | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // If already an embed url
  if (trimmed.includes("youtube.com/embed/")) {
    return trimmed;
  }

  // Check standard patterns
  const matchWatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (matchWatch && matchWatch[1]) {
    return `https://www.youtube.com/embed/${matchWatch[1]}?autoplay=0&rel=0`;
  }

  // Check shorts
  const matchShorts = trimmed.match(/youtube\.com\/shorts\/([^"&?\/\s]{11})/i);
  if (matchShorts && matchShorts[1]) {
    return `https://www.youtube.com/embed/${matchShorts[1]}?autoplay=0&rel=0`;
  }

  // If alphanumeric 11 characters ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}?autoplay=0&rel=0`;
  }

  return null;
}

export function isYouTubeUrl(input?: string | null): boolean {
  if (!input) return false;
  return getYouTubeEmbedUrl(input) !== null;
}
