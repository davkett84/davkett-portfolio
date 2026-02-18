"use client";

import React, { useEffect, useState } from "react";
import { Background, Column, Flex, SpacingToken } from "@once-ui-system/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { effects } from "@/resources";

function useIsMobile(breakpointPx = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const update = () => setIsMobile(mq.matches);

    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, [breakpointPx]);

  return isMobile;
}

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile(768);

  return (
    <Column
      fillWidth
      style={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        isolation: "isolate",

        // ✅ IMPORTANT: let layout's body::before gradient show through
        background: "transparent",
      }}
      margin="0"
      padding="0"
      horizontal="center"
      suppressHydrationWarning
    >
      {/* Background layer (desktop only) */}
      {!isMobile && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
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
        </div>
      )}

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
