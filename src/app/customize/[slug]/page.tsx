import React from 'react';
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
  };
}

export default async function IndividualPromptCustomizerPage({ params }: PageProps) {
  const { slug } = await params;
  const item = ALL_REAL_PROMPTS.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  return <PromptCustomizerClient item={item} />;
}

