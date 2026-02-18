"use client";

import React from "react";
import { Background, Column, Flex, RevealFx, SpacingToken } from "@once-ui-system/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { effects } from "@/resources";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <Column
      background="page"
      fillWidth
      style={{ minHeight: "100vh", position: "relative" }}
      margin="0"
      padding="0"
      horizontal="center"
      suppressHydrationWarning
    >
      {/* Background layer (non-interactive, should NEVER block taps) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* If RevealFx causes iOS hit-testing issues, keep it INSIDE this non-interactive wrapper */}
        <RevealFx fill position="absolute" style={{ inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <Background
              mask={{
                x: effects.mask.x,
                y: effects.mask.y,
                radius: effects.mask.radius,
                cursor: effects.mask.cursor,
              }}
              gradient={{
                display: true,
                x: 50,
                y: 0,
                width: 160,
                height: 160,
                tilt: 0,
                colorStart: "var(--gradient-start)",
                colorEnd: "var(--gradient-end)",
              }}
              dots={{
                display: effects.dots.display,
                size: effects.dots.size as SpacingToken,
                color: effects.dots.color,
              }}
              grid={{
                display: effects.grid.display,
                color: effects.grid.color,
                width: effects.grid.width,
                height: effects.grid.height,
              }}
              lines={{
                display: effects.lines.display,
                size: effects.lines.size as SpacingToken,
                thickness: effects.lines.thickness,
                angle: effects.lines.angle,
                color: effects.lines.color,
              }}
            />
          </div>
        </RevealFx>
      </div>

      {/* Content layer */}
      <Column
        fillWidth
        style={{
          position: "relative",
          zIndex: 1,
          pointerEvents: "auto",
        }}
        horizontal="center"
      >
        <Header />

        <Flex fillWidth padding="l" horizontal="center" flex={1}>
          <Flex horizontal="center" fillWidth minHeight="0">
            {children}
          </Flex>
        </Flex>

        <Footer />
      </Column>
    </Column>
  );
}
