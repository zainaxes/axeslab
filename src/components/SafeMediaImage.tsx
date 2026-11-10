"use client";

import React, { useEffect, useRef, useState } from "react";
import { getProxiedMediaUrl } from "@/lib/video-utils";

interface SafeMediaImageProps {
  src?: string | null;
  alt: string;
  fallbackLabel?: string;
  className?: string;
  loading?: "eager" | "lazy";
}

export function SafeMediaImage({
  src,
  alt,
  fallbackLabel,
  className = "w-full h-full object-cover",
  loading = "lazy",
}: SafeMediaImageProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const resolvedSrc = src ? getProxiedMediaUrl(src) : "";

  useEffect(() => {
    setFailed(false);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, [resolvedSrc]);

  if (!resolvedSrc || failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-paper-2/60 p-3 text-center">
        <span className="text-[11px] font-mono text-muted line-clamp-2">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={resolvedSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
