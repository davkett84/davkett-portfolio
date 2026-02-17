"use client";

import { useState } from "react";
import { Media, MasonryGrid } from "@once-ui-system/core";
import { gallery } from "@/resources";

type Category = "portraits" | "commercial";

// 🔒 CORTE EXACTO
const PORTRAITS_COUNT = 5;

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<Category>("portraits");

  const filteredImages = gallery.images.filter((_, index) => {
    if (activeCategory === "portraits") return index < PORTRAITS_COUNT;
    return index >= PORTRAITS_COUNT;
  });

  return (
    <>
      <style>{`
        .gallery-wrapper { display: flex; width: 100%; }
        .gallery-filter { min-width: 180px; margin-right: 56px; margin-top: 12px; }

        /* Buttons reset + typography lock (fix iOS / theme drift) */
        .gallery-filter-btn {
          appearance: none;
          -webkit-appearance: none;
          border: 0;
          background: transparent;
          padding: 0;
          margin: 0;
          cursor: pointer;
          text-align: left;

          /* FORCE SANS */
          font-family: var(--font-sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial);
          font-size: 14px;
          line-height: 1.2;
          letter-spacing: 0.04em;

          color: inherit;
          -webkit-tap-highlight-color: transparent;
        }

        .gallery-filter-item { margin-bottom: 16px; }
        .gallery-filter-item:last-child { margin-bottom: 0; }

        .gallery-filter-label {
          display: inline-block;
          font-weight: 400;
          opacity: 0.7; /* not too washed out */
        }

        .gallery-filter-label.is-active {
          font-weight: 600;
          opacity: 1;
        }

        .gallery-filter-underline {
          height: 1px;
          width: 28px;
          background: currentColor;
          margin-top: 6px;
          opacity: 0.65;
        }

        @media (max-width: 768px) {
          .gallery-wrapper { flex-direction: column; align-items: center; }
          .gallery-filter {
            display: flex;
            gap: 32px;
            margin: 0 0 24px 0;
            min-width: auto;
            justify-content: center;
            align-items: center;
          }

          .gallery-filter-item { margin-bottom: 0; text-align: center; }

          .gallery-filter-btn { text-align: center; }
          .gallery-filter-underline { margin-left: auto; margin-right: auto; }
        }
      `}</style>

      <div className="gallery-wrapper">
        <div className="gallery-filter">
          {/* PORTRAITS */}
          <div className="gallery-filter-item">
            <button
              type="button"
              className="gallery-filter-btn"
              onClick={() => setActiveCategory("portraits")}
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

          {/* COMMERCIAL */}
          <div className="gallery-filter-item">
            <button
              type="button"
              className="gallery-filter-btn"
              onClick={() => setActiveCategory("commercial")}
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
