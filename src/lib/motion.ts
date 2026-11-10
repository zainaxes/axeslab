"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Axes Lab Motion Identity (LottieFiles Motion Design + Apple HIG precision)
 * Personality: Premium / Corporate
 * - Zero overshoot, crisp deceleration on entrances, instant exit/feedback
 * - Strictly transform + opacity only
 */
export const MOTION = {
  easeOut: "power3.out",
  easeIn: "power2.in",
  easeInOut: "power2.inOut",
  durMicro: 0.14,
  durCard: 0.3,
  durPanel: 0.34,
  durReveal: 0.48,
  staggerMicro: 0.035,
  staggerMaxBudget: 0.36,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, useGSAP };
