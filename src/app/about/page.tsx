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
          Originally from Ecuador — now telling stories from the Pacific.
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
      <Column fillWidth gap="24" paddingTop="xl" paddingBottom="xl" style={{ maxWidth: 640, margin: "0 auto" }}>

        <Text variant="body-default-l" onBackground="neutral-strong" style={{ lineHeight: "1.8" }}>
          I studied Commercial Engineering in Ecuador and spent several years working
          in digital marketing — building campaigns, leading content strategy, and
          learning how brands communicate. But photography was always the thing I came
          back to.
        </Text>

        <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: "1.8" }}>
          Over the last few years I've made that the center of my work. I've shot
          weddings, portraits, brand campaigns, motorsport events, and documentary
          projects — always looking for the frame that holds something real.
        </Text>

        <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: "1.8" }}>
          Now I'm moving deeper into film. I have a Sony FX3 and professional
          lighting and audio gear, and I'm focused on producing short documentaries
          and brand films for companies that have a story worth telling. Hawaii gives
          me an extraordinary backdrop — but I work worldwide.
        </Text>
      </Column>

      {/* CAPABILITIES */}
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
          What I do
        </Text>

        {[
          { title: "Documentary & Brand Film", desc: "Short-form documentary, brand stories, and commercial video production." },
          { title: "Weddings & Portraits", desc: "Natural light, cinematic approach. Available across Hawaii and destination." },
          { title: "Motorsport & Sports", desc: "High-speed, high-stakes. Coverage of endurance races and automotive events." },
          { title: "Commercial Photography", desc: "Product, lifestyle, and brand campaigns for companies and entrepreneurs." },
        ].map((item) => (
          <Row
            key={item.title}
            fillWidth
            gap="16"
            paddingY="16"
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
          Sony FX3 · Sony Alpha series · Professional lighting & audio ·
          Adobe Premiere Pro · Lightroom · Capture One
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
        <Heading variant="display-strong-s" style={{ fontFamily: "Canela, serif", fontWeight: 500 }}>
          Let's make something together.
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Available for projects in Hawaii and worldwide.
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