import rawPrompts from './generated-prompts.json' with { type: 'json' };
import { getProxiedMediaUrl, getCategoryFallbackPoster, isYouTubeUrl, getYouTubeThumbnailUrl } from './video-utils';

export interface PromptItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  summary: string;
  contentBody: string;
  posterUrl: string;
  videoUrl?: string;
  tier: string;
  chars: number;
  likes: number;
  tags: string[];
}

// Generate realistic deterministic like count from slug
function getDeterministicLikes(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 180) + 24;
}

export const ALL_REAL_PROMPTS: PromptItem[] = (rawPrompts as any[]).map((r) => {
  let meta: any = {};
  try {
    meta = r.metadata_json ? JSON.parse(r.metadata_json) : {};
  } catch {}

  const catName = r.category || r.category_name || meta.categoryName || 'General';
  const catSlug = r.categorySlug || r.category_slug || catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Exact poster: check r.preview_poster_url, meta.posterUrl, r.poster
  const rawPoster = r.preview_poster_url || meta.posterUrl || r.poster;
  // Exact video: check r.preview_video_url, meta.custom_video_url, meta.effectUrl, r.video
  const rawVideo = r.preview_video_url || meta.custom_video_url || meta.effectUrl || r.video || undefined;
  const isYT = isYouTubeUrl(rawVideo);

  const fallbackPoster = getCategoryFallbackPoster(catName, r.title);
  const resolvedPoster = rawPoster || (isYT ? getYouTubeThumbnailUrl(rawVideo) : null) || fallbackPoster;

  // The actual verbatim prompt content
  const promptBody = r.prompt_axes_lab || r.content_body || r.raw_prompt_original || r.prompt || '';

  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    category: catName,
    categorySlug: catSlug,
    summary: r.summary || `${r.title} — ${catName} prompt with visual preview and clean code specification.`,
    contentBody: promptBody,
    posterUrl: resolvedPoster ? getProxiedMediaUrl(resolvedPoster) : '',
    videoUrl: rawVideo ? getProxiedMediaUrl(rawVideo) : undefined,
    tier: r.tier || meta.tier || 'free',
    chars: r.chars || promptBody.length,
    likes: r.likes_count || getDeterministicLikes(r.slug),
    tags: [catName, 'Tailwind', 'React', 'Motion'],
  };
});

// Category counts
const countMap = new Map<string, { name: string; slug: string; count: number }>();
for (const p of ALL_REAL_PROMPTS) {
  if (!countMap.has(p.category)) {
    countMap.set(p.category, { name: p.category, slug: p.categorySlug, count: 0 });
  }
  countMap.get(p.category)!.count++;
}

export const ALL_PROMPT_CATEGORIES = Array.from(countMap.values()).sort((a, b) => b.count - a.count);
