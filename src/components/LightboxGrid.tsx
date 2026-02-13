"use client";

import React, { useEffect, useMemo, useState } from "react";

type Props = {
  images?: unknown; // can be array OR JSON string from MDX
  columns?: number;
  gap?: number;
  radius?: "none" | "s" | "m" | "l" | "xl";
};

export default function LightboxGrid({
  images,
  columns = 2,
  gap = 24,
  radius = "m",
}: Props) {
  // ✅ Support MDX passing images as JSON string
  let parsedImages: unknown = images;

  if (typeof images === "string") {
    try {
      parsedImages = JSON.parse(images);
    } catch {
      parsedImages = [];
    }
  }

  const safeImages: string[] = Array.isArray(parsedImages)
    ? (parsedImages.filter((x) => typeof x === "string" && x.trim().length > 0) as string[])
    : [];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    if (activeIndex < 0 || activeIndex >= safeImages.length) setActiveIndex(null);
  }, [activeIndex, safeImages.length]);

  const activeSrc = useMemo(() => {
    if (activeIndex === null) return null;
    return safeImages[activeIndex] ?? null;
  }, [activeIndex, safeImages]);

  const close = () => setActiveIndex(null);

  const prev = () => {
    if (activeIndex === null) return;
    if (safeImages.length === 0) return;
    setActiveIndex((i) => (i === 0 ? safeImages.length - 1 : (i ?? 0) - 1));
  };

  const next = () => {
    if (activeIndex === null) return;
    if (safeImages.length === 0) return;
    setActiveIndex((i) => (i === safeImages.length - 1 ? 0 : (i ?? 0) + 1));
  };

  // ✅ Lock body scroll while modal is open
  useEffect(() => {
    if (!activeSrc) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [activeSrc]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, safeImages.length]);

  if (safeImages.length === 0) return null;

  const radiusPx =
    radius === "none" ? 0 : radius === "s" ? 10 : radius === "m" ? 14 : radius === "l" ? 18 : 22;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {safeImages.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            type="button"
            aria-label="Open image"
            onClick={() => setActiveIndex(idx)}
            style={{
              appearance: "none",
              border: "none",
              padding: 0,
              margin: 0,
              background: "transparent",
              cursor: "zoom-in",
              display: "block",
              width: "100%",
              textAlign: "left",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                overflow: "hidden",
                borderRadius: radiusPx,
              }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </button>
        ))}
      </div>

      {activeSrc && (
        <div
          role="dialog"
          aria-modal="true"
          onMouseDown={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(1200px, 100%)",
              maxHeight: "90vh",
            }}
          >
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                close();
              }}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "-12px",
                right: "-12px",
                width: "40px",
                height: "40px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(0,0,0,0.45)",
                color: "white",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              style={{
                position: "absolute",
                left: "-12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "44px",
                height: "44px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(0,0,0,0.45)",
                color: "white",
                cursor: "pointer",
              }}
            >
              ‹
            </button>

            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              style={{
                position: "absolute",
                right: "-12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "44px",
                height: "44px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(0,0,0,0.45)",
                color: "white",
                cursor: "pointer",
              }}
            >
              ›
            </button>

            <div
              style={{
                width: "100%",
                maxHeight: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 18,
                overflow: "hidden",
                background: "rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={activeSrc}
                alt=""
                style={{
                  maxWidth: "100%",
                  maxHeight: "90vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
