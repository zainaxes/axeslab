'use client';

import React from 'react';
import Link from 'next/link';

export function PreFooter() {
  return (
    <section className="max-w-[var(--container)] mx-auto my-16 px-4 sm:px-8">
      <div className="rounded-card bg-paper-2 border border-rule p-8 sm:p-12 text-center">
        
        {/* Brand Mark */}
        <div className="w-10 h-10 rounded-pill bg-paper-3 border border-rule-2 mx-auto mb-4 flex items-center justify-center p-2">
          <img
            src="/logo-white.png"
            alt="Axes Lab Mark"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Headline */}
        <h2 className="text-xl sm:text-2xl font-display font-medium text-ink max-w-xl mx-auto leading-snug">
          Production AI design systems and agent skills
        </h2>

        {/* Subtitle */}
        <p className="mt-2.5 text-xs sm:text-sm text-muted max-w-lg mx-auto leading-relaxed">
          Open specifications, verbatim system directives, and Model Context Protocol tooling. 100% free and unlocked.
        </p>

        {/* Action Button */}
        <div className="mt-6">
          <Link
            href="/mcp"
            className="inline-flex items-center gap-2 bg-accent text-accent-ink hover:opacity-90 active:opacity-100 font-sans font-medium text-xs px-5 py-2.5 rounded-pill transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span>Connect MCP server</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
