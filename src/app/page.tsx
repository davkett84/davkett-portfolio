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
 * Coloca tus 27 mejores fotos aquí:
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
          margin-top: 32px;
        }

        /* Grid editorial fijo: 3 columnas */
        .homeGalleryGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          width: 100%;
        }

        /* Tablet */
        @media (max-width: 980px) {
          .homeGalleryGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .homeGalleryGrid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>

      <div className="homeGalleryWrap">
        <div className="homeGalleryGrid">
          {homeGalleryImages.map((image, index) => (
            <Media
              key={image.src}
              enlarge
              priority={index < 9}
              sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 33vw"
              radius="m"
              /* Ratio constante para que el grid se vea elegante y consistente */
              aspectRatio="4 / 3"
              src={image.src}
              alt={image.alt}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
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

      {/* HERO */}
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
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

          {/* HEADLINE */}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              Visual stories shaped by simplicity and intention.
            </Heading>
          </RevealFx>

          {/* SUBLINE */}
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="center"
            paddingBottom="32"
          >
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              I’m David — a photographer and filmmaker based in Hawai‘i.
              I create portraits, documentaries, and visual stories crafted through
              minimalism, natural light, and quiet emotion.
            </Text>
          </RevealFx>

          {/* CTA */}
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
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

      {/* ✅ HOME GALLERY (27 images, 3 columns) */}
      <HomeGallery />

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
  );
}
