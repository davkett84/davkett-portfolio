"use client";

import { useMemo, useState } from "react";

import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  Media,
} from "@once-ui-system/core";

import { home, about, person, baseURL, routes, work } from "@/resources";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

/**
 * ✅ HOME GALLERY (separada de /gallery)
 * /public/images/home/
 * Nombres: Home00001.jpg ... Home00027.jpg
 */
const homeGalleryImages = Array.from({ length: 27 }, (_, i) => {
  const n = String(i + 1).padStart(5, "0"); // 00001 → 00027
  return {
    src: `/images/home/Home${n}.jpg`,
    alt: `Home gallery image ${n}`,
  };
});

function HomeGallery() {
  const images = useMemo(() => homeGalleryImages, []);
  const [openSrc, setOpenSrc] = useState<string | null>(null);

  return (
    <>
      <style>{`
        /* WRAP */
        .homeGalleryWrap {
          width: 100%;
          padding: 0 40px;
          margin-top: 22px;
          box-sizing: border-box;
        }

        /* Grid editorial fijo: 3 columnas (más grande) */
        .homeGalleryGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 26px;
          width: 100%;
          align-items: stretch;
        }

        /* Tile: Apple-ish hover (zoom + soften + shadow) */
        .tile {
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transform: translateZ(0);
          transition: box-shadow 240ms ease, transform 240ms ease;
        }

        /* Media internamente renderiza img; aplicamos hover con selector global */
        .tile :global(img) {
          transition: transform 240ms ease, filter 240ms ease;
          will-change: transform, filter;
        }

        .tile:hover {
          box-shadow: 0 18px 55px rgba(0,0,0,0.14);
        }

        .tile:hover :global(img) {
          transform: scale(1.03);
          filter: saturate(1.05) contrast(1.02) brightness(1.02);
        }

        /* Tablet */
        @media (max-width: 980px) {
          .homeGalleryWrap { padding: 0 24px; }
          .homeGalleryGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .homeGalleryWrap { padding: 0 16px; }
          .homeGalleryGrid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }

        /* LIGHTBOX overlay */
        .lightboxOverlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.72);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 22px;
          box-sizing: border-box;
        }

        .lightboxInner {
          max-width: min(1400px, 96vw);
          max-height: 92vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .lightboxImg {
          max-width: 100%;
          max-height: 92vh;
          border-radius: 18px;
          box-shadow: 0 20px 70px rgba(0,0,0,0.35);
          background: rgba(255,255,255,0.04);
        }

        .lightboxHint {
          position: fixed;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.75);
          font-size: 12px;
          letter-spacing: 0.02em;
          user-select: none;
        }
      `}</style>

      <div className="homeGalleryWrap">
        <div className="homeGalleryGrid">
          {images.map((image, index) => (
            <div
              key={image.src}
              className="tile"
              role="button"
              tabIndex={0}
              onClick={() => setOpenSrc(image.src)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setOpenSrc(image.src);
              }}
            >
              <Media
                // ❗️NO usamos enlarge aquí porque enlarge te está mostrando el thumbnail grande.
                // En su lugar, abrimos nuestro lightbox con <img> real.
                priority={index < 9}
                sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 33vw"
                radius="m"
                aspectRatio="4 / 3"
                src={image.src}
                alt={image.alt}
              />
            </div>
          ))}
        </div>
      </div>

      {openSrc && (
        <div
          className="lightboxOverlay"
          onClick={() => setOpenSrc(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpenSrc(null);
          }}
          role="button"
          tabIndex={0}
        >
          <div className="lightboxInner">
            {/* Imagen completa real */}
            <img className="lightboxImg" src={openSrc} alt="Expanded view" />
          </div>
          <div className="lightboxHint">Tap / click anywhere to close</div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <>
      {/* ✅ Contenido “normal” (hero + blog + footer) sigue con maxWidth="m" */}
      <Column maxWidth="m" gap="l" paddingY="12" horizontal="center">
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={home.path}
          title={home.title}
          description={home.description}
          image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />

        {/* HERO (MINIMAL) */}
        <Column fillWidth horizontal="center" gap="s">
          <Column maxWidth="s" horizontal="center" align="center">
            {/* Si algún día quieres el badge, sigue soportado */}
            {home.featured.display && (
              <RevealFx
                fillWidth
                horizontal="center"
                paddingTop="8"
                paddingBottom="12"
                paddingLeft="12"
              >
                <Badge
                  background="brand-alpha-weak"
                  paddingX="12"
                  paddingY="4"
                  onBackground="neutral-strong"
                  textVariant="label-default-s"
                  arrow={false}
                  href={home.featured.href}
                >
                  <Row paddingY="2">{home.featured.title}</Row>
                </Badge>
              </RevealFx>
            )}

            {/* TITULO corto */}
            <RevealFx translateY="3" fillWidth horizontal="center" paddingBottom="6">
              <Heading wrap="balance" variant="display-strong-l">
                David Cárdenas
              </Heading>
            </RevealFx>

            {/* SUBTITULO minimal */}
            <RevealFx translateY="4" delay={0.12} fillWidth horizontal="center" paddingBottom="14">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l">
                Davkettz — Photographer & Filmmaker
              </Text>
            </RevealFx>

            {/* CTA (mismo estilo con flecha) */}
            <RevealFx paddingTop="6" delay={0.2} horizontal="center" paddingLeft="12">
              <Button href={work.path} variant="secondary" size="m" weight="default" arrowIcon>
                <Row gap="8" vertical="center" paddingRight="4">
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                  View Selected Work
                </Row>
              </Button>
            </RevealFx>
          </Column>
        </Column>
      </Column>

      {/* ✅ HOME GALLERY FULL-WIDTH (sale del contenedor maxWidth="m") */}
      <div style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}>
        <HomeGallery />
      </div>

      {/* ✅ El resto vuelve a estar contenido */}
      <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
        {/* BLOG SECTION */}
        {routes["/blog"] && (
          <Column fillWidth gap="24" marginBottom="l">
            <Row fillWidth paddingRight="64">
              <Line maxWidth={48} />
            </Row>

            <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
              <Row flex={1} paddingLeft="l" paddingTop="24">
                <Heading as="h2" variant="display-strong-xs" wrap="balance">
                  Latest from the blog
                </Heading>
              </Row>

              <Row flex={3} paddingX="20">
                <Posts range={[1, 2]} columns="2" />
              </Row>
            </Row>

            <Row fillWidth paddingLeft="64" horizontal="end">
              <Line maxWidth={48} />
            </Row>
          </Column>
        )}

        {/* FOOTER */}
        <Mailchimp />
      </Column>
    </>
  );
}
