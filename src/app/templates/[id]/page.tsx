import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TEMPLATES } from '@/lib/templates-data';
import { ArrowLeft, SlidersHorizontal, Copy, ExternalLink, Sparkles } from 'lucide-react';
import { Metadata } from 'next';
import TemplateDetailClient from './TemplateDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tpl = TEMPLATES.find((t) => t.id === id || t.slug === id);
  if (!tpl) return { title: 'Template Not Found · Axes Lab' };
  return {
    title: `${tpl.title} · Templates · Axes Lab`,
    description: tpl.description,
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { id } = await params;
  const tpl = TEMPLATES.find((t) => t.id === id || t.slug === id);

  if (!tpl) {
    notFound();
  }

  return <TemplateDetailClient template={tpl} />;
}

