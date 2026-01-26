"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Media } from "@once-ui-system/core";

type Props = {
  images: string[];
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeSrc = useMemo(() => {
    if (activeIndex === null) return null;
    return images[activeIndex] ?? null;
  }, [activeIndex, images]);

  const close = () => setActiveIndex(null);

  const prev = () => {
    if (activeIndex === null) return;
    setActiveIndex((i) => (i === 0 ? images.length - 1 : (i ?? 0) - 1));
  };

  const next = () => {
    if (activeIndex === null) return;
    setActiveIndex((i) => (i === images.length - 1 ? 0 : (i ?? 0) + 1));
  };

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
  }, [activeIndex, images.length]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {images.map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(idx)}
            aria-label="Open image"
            style={{ all: "unset", cursor: "zoom-in", display: "block" }}
          >
           <div
  style={{
    width: "100%",
    aspectRatio: "4 / 5", // 👈 elige el ratio
    overflow: "hidden",
    borderRadius: "12px",
  }}
>
  <Media
    src={src}
    radius="none"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
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
          onClick={close}
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
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(1200px, 100%)",
              maxHeight: "90vh",
            }}
          >
            <button
              type="button"
              onClick={close}
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
              onClick={prev}
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
              onClick={next}
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
    borderRadius: "16px",
    overflow: "hidden",
    background: "rgba(0,0,0,0.15)",
  }}
>
  <img
    src={activeSrc}
    alt=""
    style={{
      width: "100%",
      height: "auto",
      maxHeight: "90vh",
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
