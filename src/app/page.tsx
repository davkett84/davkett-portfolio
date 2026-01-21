import {
  Heading,
  Text,
  RevealFx,
  Column,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";

import { home, about, person, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import HomeGallery from "@/components/HomeGallery";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column fillWidth gap="l" horizontal="center">
      {/* HERO */}
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
              style={{
                fontFamily: "Canela, serif",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: "1.05",
                fontSize: "clamp(52px, 5vw, 76px)",
              }}
            >
              David Cardenas
            </Heading>
          </RevealFx>

          <RevealFx delay={0.08}>
            <Text
              size="s"
              onBackground="neutral-weak"
              style={{ letterSpacing: "0.02em" }}
            >
              Visual Storytelling
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
