import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ALL_REAL_PROMPTS } from '@/lib/real-prompts';
import { Metadata } from 'next';
import PromptCustomizerClient from './PromptCustomizerClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = ALL_REAL_PROMPTS.find((p) => p.slug === slug);
  if (!item) return { title: 'Prompt Not Found · Axes Lab' };
  return {
    title: `Customize: ${item.title} · Axes Lab`,
    description: `Customize the motion prompt for ${item.title} by @${item.handle}.`,
    alternates: {
      canonical: `https://axeslab.zainaxes.com/customize/${item.slug}`,
    },
  };
}

export default async function IndividualPromptCustomizerPage({ params }: PageProps) {
  const { slug } = await params;
  const item = ALL_REAL_PROMPTS.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="mx-auto max-w-[var(--container)] px-4 sm:px-6 lg:px-8 py-12 text-xs font-mono text-muted">Loading customizer...</div>}>
      <PromptCustomizerClient item={item} />
    </Suspense>
  );
}

