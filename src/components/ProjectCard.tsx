"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import React from "react";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images?: unknown; // allow runtime safety
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  compact?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images,
  title,
  content,
  description,
  avatars,
  link,
  compact = false,
}) => {
  // Normalize images so we never call .map on undefined/null/non-array
  const safeImages: string[] = Array.isArray(images)
    ? (images.filter(
        (x) => typeof x === "string" && x.trim().length > 0
      ) as string[])
    : [];

  const carouselItems = safeImages.map((image) => ({
    slide: image,
    alt: title,
  }));

  // Shared wrapper: locks card previews to a consistent ratio
  const previewWrapStyle: React.CSSProperties = {
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: compact
      ? "0 4px 14px rgba(0,0,0,0.15)"
      : "0 10px 32px rgba(0,0,0,0.08)",
    width: "100%",
    aspectRatio: "16 / 9",
    position: "relative",
    background: "rgba(0,0,0,0.03)",
  };

  ///////////////////////////////////////////////////////////////////////////
  // COMPACT MODE (related projects)
  // Use a single image (cleaner + avoids Carousel letterboxing issues)
  ///////////////////////////////////////////////////////////////////////////
  if (compact) {
    const first = carouselItems[0]?.slide;

    return (
      <SmartLink
        href={href}
        style={{
          display: "block",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Column fillWidth gap="8" style={{ maxWidth: "260px", cursor: "pointer" }}>
          {first && (
            <div style={previewWrapStyle}>
              <img
                src={first}
                alt={title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          )}

          <Heading
            as="h3"
            wrap="balance"
            variant="body-strong-m"
            style={{
              lineHeight: "1.25",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            {title}
          </Heading>
        </Column>
      </SmartLink>
    );
  }

  ///////////////////////////////////////////////////////////////////////////
  // FULL MODE (homepage + Work page)
  // Keep Carousel; wrap locks ratio for consistency
  ///////////////////////////////////////////////////////////////////////////

  return (
    <Column fillWidth gap="m">
      {carouselItems.length > 0 && (
        <div style={previewWrapStyle}>
          <Carousel
            sizes="(max-width: 960px) 100vw, 960px"
            items={carouselItems}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      )}

      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}

        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}

            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}

            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: 0, width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">Explore story</Text>
                </SmartLink>
              )}

              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: 0, width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">View project</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
