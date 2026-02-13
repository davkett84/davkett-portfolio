"use client";

import { usePathname } from "next/navigation";
import { Fade, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, work, gallery } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

export const Header = () => {
  const pathname = usePathname() ?? "";

  const workLabel =
    (work as any)?.label ??
    (routes as any)?.["/work"]?.label ??
    (routes as any)?.["/work"]?.name ??
    "Work";

  const galleryLabel =
    (gallery as any)?.label ??
    (routes as any)?.["/gallery"]?.label ??
    (routes as any)?.["/gallery"]?.name ??
    "Gallery";

  return (
    <>
      {/* simple top fade only (no responsive hide) */}
      <Fade fillWidth position="fixed" height="80" zIndex={9} />

      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{ position: "fixed" }}
      >
        {/* CENTER NAV */}
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s">
              {/* HOME */}
              {routes["/"] && (
                <>
                  <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                </>
              )}

              {/* WORK */}
              {routes["/work"] && (
                <>
                  <ToggleButton
                    prefixIcon="grid"
                    href="/work"
                    label={workLabel}
                    selected={pathname.startsWith("/work")}
                  />
                </>
              )}

              {/* GALLERY */}
              {routes["/gallery"] && (
                <>
                  <ToggleButton
                    prefixIcon="gallery"
                    href="/gallery"
                    label={galleryLabel}
                    selected={pathname.startsWith("/gallery")}
                  />
                </>
              )}

              {/* CONTACT */}
              {routes["/about"] && (
                <>
                  <ToggleButton
                    prefixIcon="person"
                    href="/about"
                    label="Contact"
                    selected={pathname === "/about"}
                  />
                </>
              )}

              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
      </Row>
    </>
  );
};
