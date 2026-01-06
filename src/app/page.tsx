import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
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
 * HOME GALLERY
 * /public/images/home/Home00001.jpg → Home00027.jpg
 */
const homeGalleryImages = Array.from({ length: 27 }, (_, i) => {
  const n = String(i + 1).padStart(5, "0");
  return {
    src: `/images/home/Home${n}.jpg`,
    alt: `Home gallery image ${n}`,
  };
});

function HomeGallery() {
  return (
    <>
      <style>{`
        .homeGallerySection {
          width: 100%;
          margin-top: 20px;
        }

        /* CENTRADO REAL */
        .homeGalleryWrap {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 18px;
          box-sizing: border-box;
        }

        /* GRID 3 COLUMNAS */
        .homeGalleryGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          width: 100%;
        }

        /* Tablet */
        @media (max-width: 980px) {
          .homeGalleryWrap { padding: 0 16px; }
          .homeGalleryGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .homeGalleryWrap { padding: 0 12px; }
          .homeGalleryGrid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }

        /**
         * ✅ CLAVE:
         * Forzamos 4:5 SOLO visualmente en el grid,
         * pero sin usar aspectRatio prop (para que el lightbox abra la imagen real).
         */
        .homeGalleryGrid :global(.once-media) {
          aspect-ratio: 4 / 5;
          border-radius: 14px;
          overflow: hidden;

          transition: box-shadow 200ms ease, transform 200ms ease;
          will-change: transform;
        }

        /* La imagen se recorta SOLO en thumbnail */
        .homeGalleryGrid :global(.once-media img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 200ms ease, filter 200ms ease;
          will-change: transform, filter;
        }

        /* Hover Apple-ish */
        .homeGalleryGrid :global(.once-media:hover) {
          transform: scale(1.02);
          box-shadow: 0 14px 42px rgba(0,0,0,0.14);
        }

        .homeGalleryGrid :global(.once-media:hover img) {
          transform: scale(1.03);
          filter: saturate(1.04) contrast(1.02);
        }
      `}</style>

      <div className="homeGallerySection">
        <div className="homeGalleryWrap">
          <div className="homeGalleryGrid">
            {homeGalleryImages.map((image, index) => (
              <Media
                key={image.src}
                enlarge
                priority={index < 6}
                sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 33vw"
                radius="m"
                /* ✅ IMPORTANTE: NO aspectRatio aquí */
                src={image.src}
                alt={image.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    // ✅ CAMBIO: padding top para que el Header sticky/fixed se vea (sin tocar layout ni galería)
    <Column fillWidth gap="xl" horizontal="center" style={{ paddingTop: 88 }}>
      {/* HERO */}
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

        <Column fillWidth horizontal="center" align="center" gap="m">
          <RevealFx>
            <Heading variant="display-strong-l">David Cárdenas</Heading>
          </RevealFx>

          <RevealFx delay={0.1}>
            <Text onBackground="neutral-weak">Photographer · Filmmaker</Text>
          </RevealFx>

          <RevealFx delay={0.2}>
            <Button href={work.path} variant="secondary" arrowIcon>
              <Row gap="8" vertical="center">
                <Avatar src={person.avatar} size="s" />
                View Selected Work
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      {/* GALLERY */}
      <HomeGallery />

      {/* BLOG + FOOTER */}
      <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
        {routes["/blog"] && (
          <Column fillWidth gap="24" marginBottom="l">
            <Row fillWidth paddingRight="64">
              <Line maxWidth={48} />
            </Row>

            <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
              <Row flex={1} paddingLeft="l">
                <Heading as="h2" variant="display-strong-xs">
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

        <Mailchimp />
      </Column>
    </Column>
  );
}
