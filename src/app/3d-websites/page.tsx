'use client';

import React, { useState, useMemo } from 'react';
import { PromptRegistryRow } from '@/components/PromptRegistryRow';
import { ALL_REAL_PROMPTS, PromptItem } from '@/lib/real-prompts';
import catalogData from '@/lib/generated-prompts.json';
import { PreFooter } from '@/components/PreFooter';
import { Search, ChevronDown } from 'lucide-react';

const CATALOG_3D: PromptItem[] = (catalogData as any[])
  .filter((c) => c.route_collection === '3d-websites' || c.category === '3D Website')
  .map((cat) => ({
    id: cat.id,
    slug: cat.slug,
    title: cat.title,
    category: cat.category,
    categorySlug: cat.categorySlug || '3d-websites',
    subcategory: cat.subcategories?.[0] || '3D WebGL',
    subcategories: cat.subcategories || ['3D WebGL'],
    summary: cat.summary,
    contentBody: cat.raw_prompt_original || '',
    originalPrompt: cat.raw_prompt_original,
    rightsStatus: 'host_allowed' as const,
    license: 'MIT',
    llmTarget: 'Claude Opus / GPT-4',
    type: cat.type || '3D Website',
    tokens: Math.round((cat.chars || cat.raw_prompt_original?.length || 0) / 4),
    views: 0,
    likes: 0,
    author: 'Axes Lab',
    handle: 'axeslab',
    tags: [cat.category, ...(cat.subcategories || [])],
    chars: cat.chars,
    posterUrl: cat.preview_poster_url,
    videoUrl: cat.preview_video_url,
    preview: cat.preview_video_url,
    poster: cat.preview_poster_url,
  }));

export default function ThreeDWebsitesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(50);

  const threeItems = useMemo(() => {
    const real3D: PromptItem[] = ALL_REAL_PROMPTS.filter((item) => {
      const c = item.category.toLowerCase();
      const t = item.title.toLowerCase();
      const s = (item.summary || '').toLowerCase();
      const b = (item.contentBody || '').toLowerCase();
      const is3D =
        c.includes('3d') ||
        t.includes('3d') ||
        t.includes('spline') ||
        t.includes('webgl') ||
        t.includes('canvas') ||
        s.includes('3d') ||
        s.includes('webgl') ||
        s.includes('spline') ||
        b.includes('three.js') ||
        b.includes('webgl') ||
        b.includes('spline');

      return is3D;
    });

    const combined = [...CATALOG_3D, ...real3D];

    return combined.filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      return (
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        (item.summary || '').toLowerCase().includes(q) ||
        (item.subcategory || '').toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const displayedItems = threeItems.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <section className="border-b border-rule bg-paper-2 pt-10 pb-6 px-4 sm:px-8">
        <div className="max-w-[var(--container)] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cool" />
            <span>Interactive 3D WebGL scenes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink">
            3D WebGL and interactive spatial websites
          </h1>
          <p className="text-sm text-muted max-w-xl leading-relaxed">
            Three.js, React Three Fiber, Spline integration, and WebGL physics engines.
          </p>

          <div className="flex items-center border border-rule focus-within:border-accent rounded-pill bg-paper-3 overflow-hidden">
            <div className="pl-3.5 pr-2 text-muted">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search 3D prompts…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-2 py-2 text-xs sm:text-sm text-ink placeholder:text-muted outline-none"
            />
          </div>
        </div>
      </section>

      <section className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between text-xs text-muted pb-3 border-b border-rule">
          <span>Showing <strong className="text-ink font-medium">{displayedItems.length}</strong> of {threeItems.length} 3D prompts</span>
          <span>Click row to inspect</span>
        </div>

        <div className="border border-rule rounded-card bg-paper-2 overflow-hidden mt-3">
          <div className="px-4 py-2 border-b border-rule bg-paper-3 flex items-center justify-between text-xs text-muted">
            <div className="flex items-center gap-3">
              <span className="w-7 text-right">No.</span>
              <span className="w-1.5"></span>
              <span>Scene and spatial specification</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden lg:inline-block">Tokens</span>
              <span className="w-20 text-center">Action</span>
            </div>
          </div>

          {displayedItems.length === 0 ? (
            <div className="py-16 text-center text-muted text-xs">
              No matching 3D prompts found.
            </div>
          ) : (
            displayedItems.map((item, idx) => (
              <PromptRegistryRow key={item.id} item={item} index={idx} />
            ))
          )}
        </div>

        {displayCount < threeItems.length && (
          <div className="text-center pt-8 pb-4">
            <button
              onClick={() => setDisplayCount((prev) => prev + 50)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-paper-2 hover:bg-paper-3 border border-rule text-xs font-medium text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>Load more ({threeItems.length - displayCount} remaining)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      <PreFooter />
    </div>
  );
}
