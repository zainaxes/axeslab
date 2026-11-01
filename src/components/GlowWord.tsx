import React from "react";

interface GlowWordProps {
  text: string;
  className?: string;
  glowClassName?: string;
}

export function GlowWord({ text, className = "", glowClassName = "" }: GlowWordProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Layer 1: Blurred Ambient Duplicate Behind */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 select-none font-serif italic bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent blur-xl opacity-75 ${glowClassName}`}
      >
        {text}
      </span>
      {/* Layer 2: Crisp Foreground Text */}
      <span className="relative font-serif italic bg-gradient-to-r from-white via-violet-200 to-indigo-200 bg-clip-text text-transparent pr-1.5 inline-block">
        {text}
      </span>
    </span>
  );
}
