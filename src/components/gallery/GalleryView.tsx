"use client";

import { useState } from "react";
import { Media, MasonryGrid, Flex, Text } from "@once-ui-system/core";
import { gallery } from "@/resources";

type Category = "portraits" | "corporate";

// 🔒 Type guard local (NO toca types globales)
function hasCategory(
  image: { src: string; alt: string; orientation: string }
): image is { src: string; alt: string; orientation: string; category?: Category } {
  return "category" in image;
}

export default function GalleryView() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("portraits");

  const filteredImages = gallery.images.filter((image) => {
    if (!hasCategory(image)) return true; // fallback seguro
    return image.category === activeCategory;
  });

  return (
    <Flex gap="xl" alignItems="flex-start">
      {/* FILTER */}
      <Flex direction="column" gap="s" style={{ minWidth: 160 }}>
        <Text
          onClick={() => setActiveCategory("portraits")}
          style={{
            cursor: "pointer",
            fontWeight: activeCategory === "portraits" ? 600 : 400,
            opacity: activeCategory === "portraits" ? 1 : 0.5,
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
      </Flex>

      {/* GALLERY (MISMO CÓDIGO ORIGINAL) */}
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
