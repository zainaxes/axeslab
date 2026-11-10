"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { gsap, MOTION, useGSAP } from "@/lib/motion";

interface HeroSectionProps {
  totalPublished: number;
  onOpenSearch?: () => void;
}

export function HeroSection({ totalPublished, onOpenSearch }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduceMotion(mq.matches);
      if (videoRef.current) {
        if (mq.matches) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => {});
        }
      }
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-reveal]", {
          autoAlpha: 0,
          y: 14,
          duration: MOTION.durReveal,
          ease: MOTION.easeOut,
          stagger: 0.06,
          clearProps: "transform,opacity,visibility",
        });
      });
    },
    { scope: containerRef }
  );

  const handleBrowseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("catalog-discovery");
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[340px] sm:min-h-[380px] lg:min-h-[420px] flex items-center justify-center overflow-hidden bg-paper border-b border-rule"
    >
      {/* Full-bleed background video */}
      <div
        className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          autoPlay={!reduceMotion}
          loop
          muted
          playsInline
          preload="metadata"
          poster="/videos/hero-poster.jpg"
          className="w-full h-full object-cover opacity-55"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Subtle legibility vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-paper/75 via-paper/55 to-paper" />
      </div>

      {/* Centered, focused hero content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 text-center flex flex-col items-center gap-5">
        <p
          data-hero-reveal
          className="inline-flex items-center gap-2 rounded-pill border border-rule bg-paper-2/85 backdrop-blur-sm px-3 py-1 text-xs text-muted"
        >
          <span className="text-ink font-medium">Axes Lab</span>
          <span aria-hidden="true">·</span>
          <span className="num">{totalPublished} verified resources</span>
        </p>

        <h1
          data-hero-reveal
          className="text-3xl sm:text-5xl lg:text-[54px] font-display font-medium tracking-display text-ink leading-[1.06] max-w-3xl"
        >
          Make Lovable, Bolt, Cursor &amp; Claude build sites worth shipping.
        </h1>

        <p
          data-hero-reveal
          className="max-w-xl text-sm sm:text-base text-ink-2/90 leading-relaxed"
        >
          Discover {totalPublished} website prompts, motion directives, agent skills, and UI sections with live previews and copy-ready specifications.
        </p>

        <div
          data-hero-reveal
          className="flex flex-wrap items-center justify-center gap-3 pt-1"
        >
          <a
            href="#catalog-discovery"
            onClick={handleBrowseClick}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-pill bg-accent text-accent-ink text-sm font-medium hover:opacity-90 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span>Browse catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {onOpenSearch ? (
            <button
              type="button"
              onClick={onOpenSearch}
              className="inline-flex items-center gap-2.5 h-10 px-4 rounded-pill bg-paper-2/90 border border-rule hover:border-rule-2 text-sm text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <Search className="w-4 h-4 text-muted" />
              <span>Search library</span>
              <kbd className="font-mono text-[11px] text-muted px-1.5 py-0.5 rounded bg-paper-3 border border-rule">
                ⌘K
              </kbd>
            </button>
          ) : (
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-pill bg-paper-2/90 border border-rule hover:border-rule-2 text-sm text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>Browse categories</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
