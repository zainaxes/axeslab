"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { findUnifiedItemBySlug, findRealPromptBySlug, UnifiedCatalogItem } from "@/lib/unified-catalog";
import { ResourcePreviewTheater } from "./ResourcePreviewTheater";
import { PromptCustomizerModal } from "./PromptCustomizerModal";

export function PromptModal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const promptSlug = searchParams.get("prompt");

  const [activeItem, setActiveItem] = useState<UnifiedCatalogItem | null>(null);
  const [customizingSlug, setCustomizingSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!promptSlug) {
      setActiveItem(null);
      return;
    }
    const found = findUnifiedItemBySlug(promptSlug);
    setActiveItem(found || null);
  }, [promptSlug]);

  const closeModal = () => {
    setCustomizingSlug(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("prompt");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  useEffect(() => {
    if (!activeItem && !customizingSlug) return;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (customizingSlug) {
          setCustomizingSlug(null);
        } else {
          closeModal();
        }
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [activeItem, customizingSlug, pathname, searchParams]);

  if (customizingSlug) {
    const realItem = findRealPromptBySlug(customizingSlug);
    if (realItem) {
      return (
        <PromptCustomizerModal
          item={realItem}
          isOpen={true}
          onClose={() => setCustomizingSlug(null)}
        />
      );
    }
  }

  if (!activeItem) return null;

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] bg-paper/95 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${activeItem.title}`}
    >
      <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <ResourcePreviewTheater
          item={activeItem}
          onBack={closeModal}
          onOpenCustomizer={(item) => {
            if (item.origin === "motion-registry") {
              setCustomizingSlug(item.slug);
            }
          }}
        />
      </div>
    </div>
  );
}
