"use client";

import { useState } from "react";
import { Media, MasonryGrid } from "@once-ui-system/core";
import { gallery } from "@/resources";

type Category = "portraits" | "commercial";

const PORTRAITS_COUNT = 5;

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<Category>("portraits");

  const filteredImages = gallery.images.filter((_, index) => {
    if (activeCategory === "portraits") return index < PORTRAITS_COUNT;
    return index >= PORTRAITS_COUNT;
  });

  const setCategory = (cat: Category) => setActiveCategory(cat);

  return (
    <>
      <style>{`
        .gallery-wrapper { display: flex; width: 100%; position: relative; }
        .gallery-filter { min-width: 180px; margin-right: 56px; margin-top: 12px; position: relative; z-index: 2; }

        .gallery-filter-btn {
          appearance: none;
          -webkit-appearance: none;
          border: 0;
          background: transparent;
          padding: 0;
          margin: 0;
          cursor: pointer;
          text-align: left;

          font-family: var(--font-sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial);
          font-size: 14px;
          line-height: 1.2;
          letter-spacing: 0.04em;

          color: inherit;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          pointer-events: auto;
        }

        .gallery-filter-item { margin-bottom: 16px; }
        .gallery-filter-item:last-child { margin-bottom: 0; }

        .gallery-filter-label { display: inline-block; font-weight: 400; opacity: 0.7; }
        .gallery-filter-label.is-active { font-weight: 600; opacity: 1; }

        .gallery-filter-underline {
          height: 1px;
          width: 28px;
          background: currentColor;
          margin-top: 6px;
          opacity: 0.65;
        }

        @media (max-width: 768px) {
          .gallery-wrapper { flex-direction: column; align-items: center; }

          /* FIXED > STICKY (more reliable on iOS) */
          .gallery-filter {
            display: inline-flex;
            gap: 32px;
            min-width: auto;
            justify-content: center;
            align-items: center;

            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            top: calc(env(safe-area-inset-top, 0px) + 12px);

            z-index: 999999;
            pointer-events: auto;

            padding: 10px 16px;
            border-radius: 999px;

            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            background: rgba(0, 0, 0, 0.28);
            border: 1px solid rgba(255, 255, 255, 0.12);

            color: rgba(255, 255, 255, 0.95);
          }

          .gallery-filter-item { margin-bottom: 0; text-align: center; }
          .gallery-filter-btn { text-align: center; }
          .gallery-filter-underline { margin-left: auto; margin-right: auto; }

          /* Give space so fixed pill doesn't overlap content */
          .gallery-spacer { height: 64px; width: 100%; }
        }
      `}</style>

      <div className="gallery-wrapper">
        {/* spacer only matters on mobile */}
        <div className="gallery-spacer" />

        <div className="gallery-filter">
          <div className="gallery-filter-item">
            <button
              type="button"
              className="gallery-filter-btn"
              onPointerDown={() => setCategory("portraits")}
              onClick={() => setCategory("portraits")}
              aria-pressed={activeCategory === "portraits"}
            >
              <span
                className={
                  "gallery-filter-label" +
                  (activeCategory === "portraits" ? " is-active" : "")
                }
              >
                Portraits
              </span>
              {activeCategory === "portraits" && (
                <div className="gallery-filter-underline" />
              )}
            </button>
          </div>

          <div className="gallery-filter-item">
            <button
              type="button"
              className="gallery-filter-btn"
              onPointerDown={() => setCategory("commercial")}
              onClick={() => setCategory("commercial")}
              aria-pressed={activeCategory === "commercial"}
            >
              <span
                className={
                  "gallery-filter-label" +
                  (activeCategory === "commercial" ? " is-active" : "")
                }
              >
                Commercial
              </span>
              {activeCategory === "commercial" && (
                <div className="gallery-filter-underline" />
              )}
            </button>
          </div>
        </div>

        <MasonryGrid columns={2} s={{ columns: 1 }}>
          {filteredImages.map((image, index) => (
            <Media
              key={index}
              enlarge
              priority={index < 10}
              sizes="(max-width: 560px) 100vw, 50vw"
              radius="m"
              aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
              src={image.src}
              alt={image.alt}
            />
          ))}
        </MasonryGrid>
      </div>
    </>
  );
}
