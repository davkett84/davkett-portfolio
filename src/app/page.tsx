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
  Media,
} from "@once-ui-system/core";

import { home, about, person, baseURL, work } from "@/resources";
import { Mailchimp } from "@/components";

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
  return (
    <>
      <style>{`
        .homeGalleryWrap {
          width: 100%;
          padding: 0 40px;
          margin-top: 28px;
          box-sizing: border-box;
        }

        /* ✅ 3 columnas desktop (como quedamos) */
        .homeGalleryGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          width: 100%;
        }

        /* Tablet */
        @media (max-width: 980px) {
          .homeGalleryWrap { padding: 0 24px; }
          .homeGalleryGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
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

        /* ✅ Apple-ish hover */
        .homeTile {
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transform: translateZ(0);
          transition: box-shadow 240ms ease;
        }

        .homeTile :global(img) {
          transition: transform 240ms ease, filter 240ms ease;
          will-change: transform, filter;
        }

        .homeTile:hover {
          box-shadow: 0 18px 55px rgba(0,0,0,0.14);
        }

        .homeTile:hover :global(img) {
          transform: scale(1.03);
          filter: saturate(1.05) contrast(1.02) brightness(1.02);
        }
      `}</style>

      <div className="homeGalleryWrap">
        <div className="homeGalleryGrid">
          {homeGalleryImages.map((image, index) => (
            <div key={image.src} className="homeTile">
              <Media
                enlarge
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
    </>
  );
}

export default function Home() {
  return (
    <>
      {/* ✅ HERO minimal (casi sin texto) */}
      <Column maxWidth="m" gap="m" paddingY="10" horizontal="center">
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

        <Column fillWidth horizontal="center" align="center" gap="s">
          <RevealFx translateY="4" fillWidth horizontal="center">
            <Heading wrap="balance" variant="display-strong-l">
              David Cárdenas
            </Heading>
          </RevealFx>

          <RevealFx delay={0.1} fillWidth horizontal="center">
            <Text onBackground="neutral-weak" variant="heading-default-m">
              Photographer · Filmmaker
            </Text>
          </RevealFx>

          <RevealFx paddingTop="8" delay={0.2} horizontal="center">
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

      {/* ✅ HOME GALLERY FULL-WIDTH */}
      <div style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}>
        <HomeGallery />
      </div>

      {/* ✅ FOOTER / CONTACT debajo de la galería */}
      <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
        <Mailchimp />
      </Column>
    </>
  );
}
