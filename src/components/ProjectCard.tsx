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
  compact?: boolean; // 🔥 NEW
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
  return (
    <Column
      fillWidth
      gap={compact ? "s" : "m"}
      style={{
        maxWidth: compact ? "260px" : "100%",

        /* 🔥🔥🔥 Apple TV Hover Effect — only active in compact mode */
        transition: compact ? "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s" : "",
        transformStyle: "preserve-3d",
        cursor: compact ? "pointer" : "default",
      }}
      className={compact ? "apple-card" : ""}
    >
      <style>{`
        /* Only for compact mode */
        .apple-card:hover {
          transform: translateY(-6px) scale(1.06) rotateX(1deg) rotateY(1deg);
          box-shadow:
            0 20px 40px rgba(0,0,0,0.18),
            0 0 20px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .apple-card:hover {
            transform: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <Carousel
        sizes={compact ? "(max-width: 300px) 100vw, 300px" : "(max-width: 960px) 100vw, 960px"}
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
        style={{
          borderRadius: compact ? "14px" : "16px",
          overflow: "hidden",
          boxShadow: compact
            ? "0 4px 12px rgba(0,0,0,0.10)"
            : "0 10px 32px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.3s",
        }}
      />

      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX={compact ? "0" : "s"}
        paddingTop={compact ? "8" : "12"}
        paddingBottom={compact ? "8" : "24"}
        gap={compact ? "8" : "l"}
      >
        {title && (
          <Flex flex={5}>
            <Heading
              as="h2"
              wrap="balance"
              variant={compact ? "body-strong-m" : "heading-strong-xl"}
            >
              {title}
            </Heading>
          </Flex>
        )}

        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap={compact ? "8" : "16"}>
            {!compact && avatars?.length > 0 && (
              <AvatarGroup avatars={avatars} size="m" reverse />
            )}

            {description?.trim() && (
              <Text
                wrap="balance"
                variant={compact ? "body-default-xs" : "body-default-s"}
                onBackground="neutral-weak"
              >
                {description}
              </Text>
            )}

            {!compact && (
              <Flex gap="16" wrap>
                {content?.trim() && (
                  <SmartLink suffixIcon="arrowRight" href={href}>
                    <Text variant="body-default-s">Explore story</Text>
                  </SmartLink>
                )}

                {link && (
                  <SmartLink suffixIcon="arrowUpRightFromSquare" href={link}>
                    <Text variant="body-default-s">View project</Text>
                  </SmartLink>
                )}
              </Flex>
            )}
          </Column>
        )}
      </Flex>
    </Column>
  );
};
