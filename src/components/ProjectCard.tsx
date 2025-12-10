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
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  compact?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  compact = false,
}) => {

  ///////////////////////////////////////////////////////////////////////////
  // 🔹 COMPACT MODE (for related projects)
  ///////////////////////////////////////////////////////////////////////////
  if (compact) {
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
          <Carousel
            sizes="(max-width: 300px) 100vw, 300px"
            items={images.map((image) => ({
              slide: image,
              alt: title,
            }))}
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}
          />

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
  // 🔹 FULL MODE (used in homepage + Work page)
  ///////////////////////////////////////////////////////////////////////////

  return (
    <Column fillWidth gap="m">
      <Carousel
        sizes="(max-width: 960px) 100vw, 960px"
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 32px rgba(0,0,0,0.08)",
        }}
      />

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
