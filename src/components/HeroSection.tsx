"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Search, Sparkles, ArrowRight, ShieldCheck, Layers } from "lucide-react";

interface HeroSectionProps {
  totalPublished: number;
}

export function HeroSection({ totalPublished }: HeroSectionProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Attempt auto-play with mute fallback (handles iOS / Safari battery saver policies)
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setVideoLoaded(true))
          .catch(() => {
            // Autoplay blocked: video element remains visible with poster fallback
            setVideoLoaded(true);
          });
      }
    }
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#06060A] text-white">
      {/* 1. Fullscreen Responsive Background Video */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          onPlaying={() => setVideoLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoLoaded ? "opacity-65 scale-100" : "opacity-30 scale-105"
          }`}
        >
          {/* 1. User local file: Place your Pexels 27980029 download here as /videos/abstract-blue-lines-dots.mp4 */}
          <source src="/videos/abstract-blue-lines-dots.mp4" type="video/mp4" />
          {/* 2. High-speed Live CDN Cybernetic Energy / Blue Motion Stream */}
          <source src="https://meez.design/web/media/bg-videos/ms-energy.mp4" type="video/mp4" />
          {/* 3. Deep Neural Motion Network Fallback */}
          <source src="https://heydesign.ai/api/design-prompt-media/v1/effects/deep-neural-interface.mp4" type="video/mp4" />
          {/* 4. Alternate 3D Cyber loop */}
          <source src="https://meez.design/web/media/bg-videos/ms-3d.mp4" type="video/mp4" />
        </video>

        {/* 2. Cybernetic Vignette & Readability Gradient Layers */}
        {/* Radial center clear focus */}
        <div className="absolute inset-0 bg-radial-[at_center_center] from-black/50 via-[#06060A]/75 to-[#06060A] pointer-events-none" />
        
        {/* Vertical top and bottom fading gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060A]/80 via-transparent to-[#06060A] pointer-events-none" />
        
        {/* Micro-dot grid mesh */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* 3. High-Contrast Centerpiece Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center space-y-8 flex flex-col items-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-500/30 bg-sky-950/40 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-sky-300 shadow-[0_0_24px_rgba(14,165,233,0.25)] backdrop-blur-xl">
          <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-ping" />
          <span>INDEPENDENT AI RESOURCE LIBRARY</span>
          <span className="text-sky-500/40">•</span>
          <span className="text-white/90">AXES LAB</span>
        </div>

        {/* High-Impact Heading */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]">
            Discover the tools <br />
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-white bg-clip-text text-transparent">
              behind AI.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl font-normal text-zinc-300/90 leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            A verified, open catalog of production-grade prompts, agent skills, MCP servers, workflows, and open-source models. Clean, developer-first, and freely accessible.
          </p>
        </div>

        {/* Responsive Search Box */}
        <div className="w-full max-w-2xl pt-2">
          <Link
            href="/explore"
            className="group relative flex h-16 w-full items-center justify-between rounded-2xl border border-white/20 bg-black/75 px-6 shadow-[0_12px_48px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300 hover:border-sky-400/50 hover:bg-black/90 hover:shadow-[0_16px_60px_rgba(14,165,233,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <div className="flex items-center gap-4 text-sm sm:text-base font-medium text-zinc-300 group-hover:text-white">
              <Search className="h-5 w-5 text-sky-400 transition-transform group-hover:scale-110" />
              <span>Search {totalPublished.toLocaleString()} verified AI resources...</span>
            </div>

            <div className="flex items-center gap-2.5">
              <kbd className="hidden sm:inline-flex items-center rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-xs font-bold text-zinc-200 shadow-xs">
                ⌘K
              </kbd>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition-transform duration-200 group-hover:scale-105 group-hover:bg-sky-300">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* Badges / Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono font-medium text-zinc-300">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>100% Tested & Verified</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <Layers className="h-4 w-4 text-sky-400" />
            <span>Open Source & Free Access</span>
          </div>

          <a
            href="https://axeslab.zainaxes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-950/30 px-4 py-2 text-sky-200 backdrop-blur-md transition-colors hover:bg-sky-900/40"
          >
            <span>axeslab.zainaxes.com</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </a>
        </div>
      </div>
    </section>
  );
}
