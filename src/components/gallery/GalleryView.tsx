"use client";

import { useState } from "react";
import { Media, MasonryGrid, Flex, Text } from "@once-ui-system/core";
import { gallery } from "@/resources";

type Category = "portraits" | "corporate";

// Asignación local por índice (estable)
const portraitIndexes = [0, 1, 2, 3];
const corporateIndexes = [4, 5, 6, 7];

export default function GalleryView() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("portraits");

  const filteredImages = gallery.images.filter((_, index) => {
    if (activeCategory === "portraits") {
      return portraitIndexes.includes(index);
    }
    return corporateIndexes.includes(index);
  });

  return (
    <>
      {/* 🔹 LOCAL RESPONSIVE STYLES */}
      <style>{`
        .gallery-wrapper {
          display: flex;
        }

        .gallery-filter {
          min-width: 180px;
          margin-right: 56px;
          margin-top: 12px;
        }

        /* 📱 MOBILE */
        @media (max-width: 768px) {
          .gallery-wrapper {
            flex-direction: column;
            align-items: center;
          }

          .gallery-filter {
            display: flex;
            gap: 32px;
            margin: 0 0 24px 0;
            min-width: auto;
          }

          .gallery-filter-item {
            text-align: center;
          }
        }
      `}</style>

      <div className="gallery-wrapper">
        {/* FILTER */}
        <div className="gallery-filter">
          {/* PORTRAITS */}
          <div
            className="gallery-filter-item"
            onClick={() => setActiveCategory("portraits")}
            style={{ cursor: "pointer" }}
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

          {/* CORPORATE */}
          <div
            className="gallery-filter-item"
            onClick={() => setActiveCategory("corporate")}
            style={{ cursor: "pointer" }}
          >
            <Text
              style={{
                fontWeight: activeCategory === "corporate" ? 600 : 400,
                opacity: activeCategory === "corporate" ? 1 : 0.45,
                letterSpacing: "0.04em",
              }}
            >
              Corporate
            </Text>

            {activeCategory === "corporate" && (
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

        {/* GALLERY — NO TOCAR */}
        <MasonryGrid columns={2} s={{ columns: 1 }}>
          {filteredImages.map((image, index) => (
            <Media
              key={index}
              enlarge
              priority={index < 10}
              sizes="(max-width: 560px) 100vw, 50vw"
              radius="m"
              aspectRatio={
                image.orientation === "horizontal" ? "16 / 9" : "3 / 4"
              }
              src={image.src}
              alt={image.alt}
            />
          ))}
        </MasonryGrid>
      </div>
    </>
  );
}
