"use client";

import { useState } from "react";
import { Media, MasonryGrid, Text } from "@once-ui-system/core";
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

        @media (max-width: 768px) {
          .gallery-wrapper { flex-direction: column; align-items: center; }
          .gallery-filter {
            display: flex;
            gap: 32px;
            margin: 0 0 24px 0;
            min-width: auto;
          }
          .gallery-filter-item { text-align: center; }
        }
      `}</style>

      <div className="gallery-wrapper">
        <div className="gallery-filter">
          {/* PORTRAITS */}
          <div
            className="gallery-filter-item"
            onClick={() => setActiveCategory("portraits")}
            style={{ cursor: "pointer", marginBottom: 16 }}
          >
            <Text
              style={{
                fontWeight: activeCategory === "portraits" ? 600 : 400,
                opacity: activeCategory === "portraits" ? 1 : 0.45,
                letterSpacing: "0.04em",
              }}
            >
              Portraits
            </Text>
            {activeCategory === "portraits" && (
              <div
                style={{
                  height: 1,
                  width: 28,
                  background: "currentColor",
                  margin: "6px auto 0",
                  opacity: 0.6,
                }}
              />
            )}
          </div>

          {/* COMMERCIAL */}
          <div
            className="gallery-filter-item"
            onClick={() => setActiveCategory("commercial")}
            style={{ cursor: "pointer" }}
          >
            <Text
              style={{
                fontWeight: activeCategory === "commercial" ? 600 : 400,
                opacity: activeCategory === "commercial" ? 1 : 0.45,
                letterSpacing: "0.04em",
              }}
            >
              Commercial
            </Text>
            {activeCategory === "commercial" && (
              <div
                style={{
                  height: 1,
                  width: 28,
                  background: "currentColor",
                  margin: "6px auto 0",
                  opacity: 0.6,
                }}
              />
            )}
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
