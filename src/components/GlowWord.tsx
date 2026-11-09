import React from "react";

interface GlowWordProps {
  text: string;
  className?: string;
  glowClassName?: string;
}

export function GlowWord({ text, className = "", glowClassName = "" }: GlowWordProps) {
  return (
    <span className={`relative inline-block font-medium text-ink ${className}`}>
      {text}
    </span>
  );
}
