import {
  Button,
  Column,
  Heading,
  Media,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  return (
    <Column maxWidth="m" fillWidth paddingX="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* HERO */}
      <Column
        fillWidth
        horizontal="center"
        vertical="center"
        gap="s"
        paddingTop="xl"
        paddingBottom="l"
      >
        <Text
          size="s"
          onBackground="neutral-weak"
          style={{
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontSize: "11px",
          }}
        >
          About
        </Text>

        <Heading
          variant="display-strong-m"
          style={{
            textAlign: "center",
            fontFamily: "Canela, serif",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: "1.05",
            fontSize: "clamp(36px, 4vw, 56px)",
          }}
        >
          David Cardenas
        </Heading>

        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          style={{ maxWidth: 520, textAlign: "center", lineHeight: "1.7" }}
        >
          Director, photographer and filmmaker based in Hawaii.
          Originally from Ecuador — available worldwide.
        </Text>

        {social
          .filter((item) => item.name.toLowerCase() === "email")
          .map((item) =>
            item.link ? (
              <Button
                key={item.name}
                href={item.link}
                prefixIcon={item.icon}
                label="Get in touch"
                size="m"
                variant="secondary"
                style={{ marginTop: 16, marginBottom: 32 }}
              />
            ) : null
          )}

        <Row fillWidth horizontal="center" style={{ maxWidth: 880 }}>
          <Media
            src="/images/about/about-hero.jpg"
            alt="David Cardenas"
            radius="l"
            aspectRatio="16 / 9"
            sizes="(max-width: 768px) 92vw, 880px"
          />
        </Row>
      </Column>

      {/* BIO */}
      <Column
        fillWidth
        gap="24"
        paddingTop="xl"
        paddingBottom="xl"
        style={{ maxWidth: 640, margin: "0 auto" }}
      >
        <Text variant="body-default-l" onBackground="neutral-strong" style={{ lineHeight: "1.8" }}>
          I'm a photographer and filmmaker with a background in digital marketing
          and brand strategy. Over the last few years I've transitioned fully into
          visual media — shooting weddings, portraits, brand campaigns, documentary
          projects, and performance sports across Hawaii and internationally.
        </Text>

        <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: "1.8" }}>
          My work sits at the intersection of storytelling and craft. Whether I'm
          covering an endurance race, documenting a brand, or capturing athletes
          in motion — I look for the frame that holds something real.
        </Text>
      </Column>

      {/* CAPABILITIES */}
      <Column
        fillWidth
        gap="0"
        paddingTop="xl"
        paddingBottom="xl"
        style={{
          borderTop: "1px solid var(--neutral-alpha-weak)",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        <Text
          size="s"
          onBackground="neutral-weak"
          style={{
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontSize: "11px",
            marginBottom: 24,
          }}
        >
          What I do
        </Text>

        {[
          {
            title: "Documentary & Brand Film",
            desc: "Short-form documentary, brand stories, and commercial video production for companies with something real to say.",
          },
          {
            title: "Performance & Sports",
            desc: "Athletes in motion, endurance races, and high-stakes sporting events. Fast, precise, and cinematic.",
          },
          {
            title: "Weddings & Portraits",
            desc: "Natural light, cinematic approach. Available across Hawaii and for destination projects worldwide.",
          },
          {
            title: "Commercial Photography",
            desc: "Product, lifestyle, and brand campaigns for companies and entrepreneurs.",
          },
        ].map((item) => (
          <Row
            key={item.title}
            fillWidth
            gap="16"
            paddingY="20"
            style={{ borderBottom: "1px solid var(--neutral-alpha-weak)" }}
          >
            <Column gap="4" flex={1}>
              <Text variant="body-strong-m" onBackground="neutral-strong">
                {item.title}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {item.desc}
              </Text>
            </Column>
          </Row>
        ))}
      </Column>

      {/* GEAR */}
      <Column
        fillWidth
        gap="16"
        paddingTop="xl"
        paddingBottom="xl"
        style={{
          borderTop: "1px solid var(--neutral-alpha-weak)",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        <Text
          size="s"
          onBackground="neutral-weak"
          style={{
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontSize: "11px",
            marginBottom: 8,
          }}
        >
          Equipment
        </Text>
        <Text variant="body-default-m" onBackground="neutral-weak" style={{ lineHeight: "1.8" }}>
          Sony FX3 (video) · Sony A7 III (photo) · Adobe Lightroom ·
          Adobe Photoshop · DaVinci Resolve
        </Text>
      </Column>

      {/* CTA FINAL */}
      <Column
        fillWidth
        horizontal="center"
        gap="16"
        paddingTop="xl"
        paddingBottom="80"
        style={{ textAlign: "center" }}
      >
        <Heading
          variant="display-strong-s"
          style={{ fontFamily: "Canela, serif", fontWeight: 500 }}
        >
          Let's make something together.
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Based in Hawaii · Available worldwide.
        </Text>
        {social
          .filter((item) => item.name.toLowerCase() === "email")
          .map((item) =>
            item.link ? (
              <Button
                key={item.name}
                href={item.link}
                prefixIcon={item.icon}
                label="info@davkett.com"
                size="l"
                variant="primary"
                style={{ marginTop: 8 }}
              />
            ) : null
          )}
      </Column>
    </Column>
  );
} 