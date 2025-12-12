"use client";

import { useState } from "react";
import { Media, MasonryGrid, Flex, Text } from "@once-ui-system/core";
import { gallery } from "@/resources";

type Category = "portraits" | "corporate";

export default function GalleryView() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("portraits");

  const filteredImages = gallery.images.filter((image: any) => {
    // Si no tiene category, no filtramos (compatibilidad total)
    if (!image.category) return true;
    return image.category === activeCategory;
  });

  return (
    <Flex>
      {/* LEFT FILTER — sin props raras */}
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

      {/* GALLERY — CÓDIGO ORIGINAL, SIN TOCAR */}
      <MasonryGrid columns={2} s={{ columns: 1 }}>
        {filteredImages.map((image: any, index: number) => (
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
