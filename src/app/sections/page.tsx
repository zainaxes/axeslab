'use client';

import React, { useState, useMemo } from 'react';
import { PromptRegistryRow } from '@/components/PromptRegistryRow';
import { ALL_REAL_PROMPTS, PromptItem } from '@/lib/real-prompts';
import catalogData from '@/lib/generated-prompts.json';
import { PreFooter } from '@/components/PreFooter';
import { Search, ChevronDown } from 'lucide-react';

const SECTION_CATEGORIES = [
  'All',
  'Hero Sections',
  'Pricing & Features',
  'Footers & Marquee',
  'Forms & Auth',
];

// Convert catalog component specifications into unified PromptItems
const CATALOG_SECTIONS: PromptItem[] = (catalogData as any[])
  .filter((c) => {
    const isSectionCollection = c.route_collection === 'sections';
    const isSectionCat = [
      'Hero Section',
      'Pricing',
      'Features',
      'Marquee',
      'Footer Section',
      'Contact us',
      'Signup',
      'Sign in',
      'Waitlist',
      '404',
    ].includes(c.category);
    return isSectionCollection || isSectionCat;
  })
  .map((cat) => ({
    id: cat.id,
    slug: cat.slug,
    title: cat.title,
    category: cat.category,
    categorySlug: cat.categorySlug || cat.route_collection || 'sections',
    subcategory: cat.subcategories?.[0] || cat.category,
    subcategories: cat.subcategories || [cat.category],
    summary: cat.summary,
    contentBody: cat.raw_prompt_original || '',
    originalPrompt: cat.raw_prompt_original,
    rightsStatus: 'host_allowed' as const,
    license: 'MIT',
    llmTarget: 'Claude Opus / GPT-4',
    type: cat.type || 'UI Component',
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

export default function SectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(50);

  const sectionItems = useMemo(() => {
    // Combine curated UI components with verified motion section prompts
    const promptSections: PromptItem[] = ALL_REAL_PROMPTS.filter((item) => {
      const t = item.title.toLowerCase();
      const s = (item.summary || '').toLowerCase();
      return (
        t.includes('hero') ||
        t.includes('pricing') ||
        t.includes('section') ||
        s.includes('hero') ||
        s.includes('pricing') ||
        s.includes('section')
      );
    });

    const combined = [...CATALOG_SECTIONS, ...promptSections];

    return combined.filter((item) => {
      const cat = (item.category || '').toLowerCase();
      const sub = (item.subcategory || '').toLowerCase();
      const title = item.title.toLowerCase();
      const summary = (item.summary || '').toLowerCase();

      // Category tab filter
      let matchesCategory = true;
      if (selectedCategory === 'Hero Sections') {
        matchesCategory = cat.includes('hero') || sub.includes('hero') || title.includes('hero');
      } else if (selectedCategory === 'Pricing & Features') {
        matchesCategory =
          cat.includes('pricing') ||
          cat.includes('features') ||
          title.includes('pricing') ||
          title.includes('feature');
      } else if (selectedCategory === 'Footers & Marquee') {
        matchesCategory =
          cat.includes('footer') ||
          cat.includes('marquee') ||
          title.includes('footer') ||
          title.includes('marquee');
      } else if (selectedCategory === 'Forms & Auth') {
        matchesCategory =
          cat.includes('sign') ||
          cat.includes('contact') ||
          cat.includes('waitlist') ||
          cat.includes('404') ||
          title.includes('auth');
      }

      if (!matchesCategory) return false;

      const q = searchQuery.trim().toLowerCase();
      return (
        q === '' ||
        title.includes(q) ||
        summary.includes(q) ||
        cat.includes(q) ||
        sub.includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const displayedItems = sectionItems.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <section className="border-b border-rule bg-paper-2 pt-10 pb-6 px-4 sm:px-8">
        <div className="max-w-[var(--container)] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cool" />
            <span>UI blocks and modular sections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink">
            Hero sections, pricing grids, and features
          </h1>
          <p className="text-sm text-muted max-w-xl leading-relaxed">
            Atomic components and responsive layout blocks with Tailwind styling.
          </p>

          <div className="flex items-center border border-rule focus-within:border-accent rounded-pill bg-paper-3 overflow-hidden">
            <div className="pl-3.5 pr-2 text-muted">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search UI sections…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-2 py-2 text-xs sm:text-sm text-ink placeholder:text-muted outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {SECTION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-pill border transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-accent ${
                  selectedCategory === cat
                    ? 'bg-ink text-paper font-medium border-ink'
                    : 'bg-paper-3 text-muted hover:text-ink border-rule'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between text-xs text-muted pb-3 border-b border-rule">
          <span>Showing <strong className="text-ink font-medium">{displayedItems.length}</strong> of {sectionItems.length} section prompts</span>
          <span>Click row to inspect</span>
        </div>

        <div className="border border-rule rounded-card bg-paper-2 overflow-hidden mt-3">
          <div className="px-4 py-2 border-b border-rule bg-paper-3 flex items-center justify-between text-xs text-muted">
            <div className="flex items-center gap-3">
              <span className="w-7 text-right">No.</span>
              <span className="w-1.5"></span>
              <span>Section and layout</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden lg:inline-block">Tokens</span>
              <span className="w-20 text-center">Action</span>
            </div>
          </div>

          {displayedItems.length === 0 ? (
            <div className="py-16 text-center text-muted text-xs">
              No matching section prompts found.
            </div>
          ) : (
            displayedItems.map((item, idx) => (
              <PromptRegistryRow key={item.id} item={item} index={idx} />
            ))
          )}
        </div>

        {displayCount < sectionItems.length && (
          <div className="text-center pt-8 pb-4">
            <button
              onClick={() => setDisplayCount((prev) => prev + 50)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-paper-2 hover:bg-paper-3 border border-rule text-xs font-medium text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>Load more ({sectionItems.length - displayCount} remaining)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      <PreFooter />
    </div>
  );
}
