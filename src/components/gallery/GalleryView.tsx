"use client";

import { useState } from "react";
import { Media, MasonryGrid, Flex, Text } from "@once-ui-system/core";
import { gallery } from "@/resources";

type Category = "portraits" | "corporate";

// 👉 Asignación LOCAL por índice (NO toca content.tsx)
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
    <Flex>
      {/* FILTER */}
      <div style={{ minWidth: 160, marginRight: 32 }}>
        <Text
          onClick={() => setActiveCategory("portraits")}
          style={{
            cursor: "pointer",
            fontWeight: activeCategory === "portraits" ? 600 : 400,
            opacity: activeCategory === "portraits" ? 1 : 0.5,
            marginBottom: 12,
          }}
        >
          Portraits
        </Text>

        <Text
          onClick={() => setActiveCategory("corporate")}
          style={{
            cursor: "pointer",
            fontWeight: activeCategory === "corporate" ? 600 : 400,
            opacity: activeCategory === "corporate" ? 1 : 0.5,
          }}
        >
          Corporate
        </Text>
      </div>

      {/* GALLERY — CÓDIGO ORIGINAL */}
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
    </Flex>
  );
}
