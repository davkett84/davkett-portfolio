import {
  Heading,
  Text,
  RevealFx,
  Column,
  Row,
  Schema,
  Meta,
  Line,
  Media,
} from "@once-ui-system/core";

import { home, about, person, baseURL, routes } from "@/resources";
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
          margin-top: 0; /* ✅ quitamos el espacio artificial */
        }

        .homeGalleryWrap {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 18px;
          box-sizing: border-box;
        }

        .homeGalleryGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          width: 100%;
        }

        @media (max-width: 980px) {
          .homeGalleryWrap { padding: 0 16px; }
          .homeGalleryGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }
        }

        @media (max-width: 560px) {
          .homeGalleryWrap { padding: 0 12px; }
          .homeGalleryGrid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }

        .homeGalleryGrid :global(.once-media) {
          aspect-ratio: 4 / 5;
          border-radius: 14px;
          overflow: hidden;
          transition: box-shadow 200ms ease, transform 200ms ease;
        }

        .homeGalleryGrid :global(.once-media img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 200ms ease, filter 200ms ease;
        }

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
    <Column fillWidth gap="l" horizontal="center">
      {/* HERO — editorial, compacto */}
      <Column
        maxWidth="m"
        horizontal="center"
        paddingTop="40"
        paddingBottom="24"
      >
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

        <div style={{ textAlign: "center" }}>
        <RevealFx>
  <Heading
    variant="display-strong-m"
    onBackground="neutral-strong"
  >
    David Cárdenas
  </Heading>
</RevealFx>

<RevealFx delay={0.08}>
  <Text
    size="s"
    onBackground="neutral-weak"
  >
    Photographer · Filmmaker
  </Text>
</RevealFx>

        </div>
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
