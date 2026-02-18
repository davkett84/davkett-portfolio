"use client";

import React, { useEffect, useState } from "react";
import {
  Background,
  Column,
  Flex,
  RevealFx,
  SpacingToken,
} from "@once-ui-system/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { effects } from "@/resources";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");

    const apply = () => setIsMobile(mq.matches);
    apply();

    // Safari iOS: addEventListener may fail on older versions
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

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
      {/* Background layer */}
      {isMobile ? (
        // MOBILE: CSS gradient only (never blocks taps)
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(1200px 700px at 50% 0%, var(--gradient-start), var(--gradient-end))",
          }}
        />
      ) : (
        // DESKTOP: Once UI background (keeps effects)
        <RevealFx
          fill
          position="absolute"
          style={{ pointerEvents: "none", zIndex: 0 }}
        >
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
        </RevealFx>
      )}

      {/* Content layer */}
      <Column fillWidth style={{ position: "relative", zIndex: 1 }} horizontal="center">
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
