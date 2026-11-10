import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { TEMPLATES } from '@/lib/templates-data';
import { Metadata } from 'next';
import TemplateCustomizerClient from './TemplateCustomizerClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tpl = TEMPLATES.find((t) => t.id === id || t.slug === id);
  if (!tpl) return { title: 'Template Not Found · Axes Lab' };
  return {
    title: `Customize: ${tpl.title} · Templates · Axes Lab`,
    description: tpl.description,
    alternates: {
      canonical: `https://axeslab.zainaxes.com/templates/${tpl.slug}/customize`,
    },
  };
}

export default async function TemplateCustomizerPage({ params }: PageProps) {
  const { id } = await params;
  const tpl = TEMPLATES.find((t) => t.id === id || t.slug === id);

  if (!tpl) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="mx-auto max-w-[var(--container)] px-4 sm:px-6 lg:px-8 py-12 text-xs font-mono text-muted">Loading template customizer...</div>}>
      <TemplateCustomizerClient template={tpl} />
    </Suspense>
  );
}

