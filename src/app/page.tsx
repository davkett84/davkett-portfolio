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
  return (
    <>
      <style>{`
        .homeGalleryWrap {
          width: 100%;
          padding: 0 40px;
          margin-top: 36px;
          box-sizing: border-box;
        }

        /* ✅ 3 columnas en desktop */
        .homeGalleryGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          width: 100%;
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

        /* ✅ Apple-ish hover */
        .homeTile {
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transform: translateZ(0);
          transition: box-shadow 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .homeTile :global(img) {
          transition: transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1),
                      filter 420ms cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: transform, filter;
        }

        .homeTile:hover {
          box-shadow: 0 18px 55px rgba(0,0,0,0.14);
        }

        .homeTile:hover :global(img) {
          transform: scale(1.03);
          filter: saturate(1.05) contrast(1.02) brightness(1.02) blur(0.2px);
        }

        /* Link que cubre toda la tarjeta sin estilos raros */
        .homeTileLink {
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;
          color: inherit;
        }
      `}</style>

      <div className="homeGalleryWrap">
        <div className="homeGalleryGrid">
          {homeGalleryImages.map((image, index) => (
            <div key={image.src} className="homeTile">
              {/* ✅ FIX: abrir la imagen completa (no zoom del thumbnail) */}
              <a
                className="homeTileLink"
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open full image ${index + 1}`}
              >
                <Media
                  /* 🔥 Quitamos enlarge porque causaba “zoom del thumbnail” */
                  priority={index < 9}
                  sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 33vw"
                  radius="m"
                  aspectRatio="4 / 3"
                  src={image.src}
                  alt={image.alt}
                />
              </a>
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
      {/* ✅ Contenido “normal” (hero + blog + footer) sigue con maxWidth="m" */}
      <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
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

        {/* HERO (minimal) */}
        <Column fillWidth horizontal="center" gap="m">
          <Column maxWidth="s" horizontal="center" align="center">
            {home.featured.display && (
              <RevealFx
                fillWidth
                horizontal="center"
                paddingTop="16"
                paddingBottom="24"
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

            {/* ✅ Headline corto */}
            <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="10">
              <Heading wrap="balance" variant="display-strong-l">
                Davkettz
              </Heading>
            </RevealFx>

            {/* ✅ Subline mínimo (si lo quieres 0 texto, bórralo) */}
            <RevealFx translateY="6" delay={0.15} fillWidth horizontal="center" paddingBottom="20">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l">
                Photography & Film
              </Text>
            </RevealFx>

            {/* CTA compacto */}
            <RevealFx paddingTop="8" delay={0.25} horizontal="center" paddingLeft="12">
              <Button href={work.path} variant="secondary" size="m" weight="default" arrowIcon>
                <Row gap="8" vertical="center" paddingRight="4">
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                  Work
                </Row>
              </Button>
            </RevealFx>
          </Column>
        </Column>
      </Column>

      {/* ✅ HOME GALLERY FULL-WIDTH */}
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
