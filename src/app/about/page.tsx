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
    <Column maxWidth="m">
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
        paddingTop="l"
        paddingBottom="l"
      >
        {/* NAME */}
        <Heading
          variant="display-strong-xl"
          style={{ textAlign: "center" }}
        >
          {person.name}
        </Heading>

        {/* STATEMENT */}
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          style={{ maxWidth: 560, textAlign: "center" }}
        >
          Photographer and filmmaker based in Hawai‘i, creating visual work across
          sports, performance-driven projects, and creative brands.
        </Text>

        {/* EMAIL CTA (ICON + TEXT, CENTERED, BEFORE IMAGE) */}
        {social
          .filter((item) => item.name.toLowerCase() === "email")
          .map(
            (item) =>
              item.link && (
                <Button
                  key={item.name}
                  href={item.link}
                  prefixIcon={item.icon}
                  label="Email"
                  size="m"
                  variant="secondary"
                  style={{
                    marginTop: 16,
                    marginBottom: 24,
                    paddingInline: 18,
                    paddingBlock: 10,
                  }}
                />
              ),
          )}

        {/* HERO IMAGE */}
        <Row
          fillWidth
          horizontal="center"
          style={{ maxWidth: 880 }}
        >
          <Media
            src="/images/about/about-hero.jpg"
            alt="David Cárdenas"
            radius="l"
            aspectRatio="16 / 9"
            sizes="(max-width: 768px) 92vw, 880px"
          />
        </Row>
      </Column>
    </Column>
  );
}
