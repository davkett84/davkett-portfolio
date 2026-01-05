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
 * ============================
 * HOME GALLERY (CLIENT ONLY)
 * ============================
 */
function HomeGallery() {
  "use client";

  import { useState } from "react";

  const images = Array.from({ length: 27 }, (_, i) => {
    const n = String(i + 1).padStart(5, "0");
    return {
      src: `/images/home/Home${n}.jpg`,
      alt: `Home image ${n}`,
    };
  });

  const [openSrc, setOpenSrc] = useState<string | null>(null);

  return (
    <>
      <style>{`
        .homeGalleryWrap {
          width: 100%;
          padding: 0 40px;
          margin-top: 24px;
          box-sizing: border-box;
        }

        .homeGalleryGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 26px;
        }

        .tile {
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 240ms ease;
        }

        .tile img {
          transition: transform 240ms ease, filter 240ms ease;
        }

        .tile:hover {
          box-shadow: 0 18px 55px rgba(0,0,0,0.14);
        }

        .tile:hover img {
          transform: scale(1.03);
          filter: saturate(1.05) contrast(1.02);
        }

        @media (max-width: 980px) {
          .homeGalleryWrap { padding: 0 24px; }
          .homeGalleryGrid { grid-template-columns: repeat(2, 1fr); gap: 18px; }
        }

        @media (max-width: 560px) {
          .homeGalleryWrap { padding: 0 16px; }
          .homeGalleryGrid { grid-template-columns: 1fr; gap: 14px; }
        }

        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .lightbox img {
          max-width: 96vw;
          max-height: 92vh;
          border-radius: 18px;
          box-shadow: 0 20px 70px rgba(0,0,0,0.35);
        }
      `}</style>

      <div className="homeGalleryWrap">
        <div className="homeGalleryGrid">
          {images.map((img, i) => (
            <div key={img.src} className="tile" onClick={() => setOpenSrc(img.src)}>
              <Media
                priority={i < 9}
                sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 33vw"
                radius="m"
                aspectRatio="4 / 3"
                src={img.src}
                alt={img.alt}
              />
            </div>
          ))}
        </div>
      </div>

      {openSrc && (
        <div className="lightbox" onClick={() => setOpenSrc(null)}>
          <img src={openSrc} alt="Expanded view" />
        </div>
      )}
    </>
  );
}

/**
 * ============================
 * PAGE
 * ============================
 */
export default function Home() {
  return (
    <>
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

        {/* HERO — MINIMAL */}
        <Column fillWidth horizontal="center" gap="s">
          <Column maxWidth="s" horizontal="center" align="center">
            <RevealFx>
              <Heading variant="display-strong-l">David Cárdenas</Heading>
            </RevealFx>

            <RevealFx delay={0.15}>
              <Text onBackground="neutral-weak" variant="heading-default-l">
                Davkettz — Photographer & Filmmaker
              </Text>
            </RevealFx>

            <RevealFx delay={0.25}>
              <Button href={work.path} variant="secondary" arrowIcon>
                <Row gap="8" vertical="center">
                  <Avatar src={person.avatar} size="m" />
                  View Selected Work
                </Row>
              </Button>
            </RevealFx>
          </Column>
        </Column>
      </Column>

      {/* HOME GALLERY FULL WIDTH */}
      <div style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}>
        <HomeGallery />
      </div>

      {/* FOOTER */}
      <Column maxWidth="m" paddingY="12" horizontal="center">
        <Mailchimp />
      </Column>
    </>
  );
}
