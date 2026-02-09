import {
  Avatar,
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
import styles from "@/components/about/about.module.scss";
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
        align="center"
        gap="m"
        paddingTop="xl"
        paddingBottom="xl"
      >
        {/* AVATAR */}
        <Avatar src={person.avatar} size="s" />

        {/* NAME */}
        <Heading variant="display-strong-xl" className={styles.textAlign}>
          {person.name}
        </Heading>

        {/* ROLE */}
        <Text
          variant="display-default-xs"
          onBackground="neutral-weak"
          className={styles.textAlign}
        >
          {person.role}
        </Text>

        {/* STATEMENT */}
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          className={styles.textAlign}
          style={{ maxWidth: 560 }}
        >
          Photographer and filmmaker based in Hawai‘i, creating visual work across
          sports, performance-driven projects, and creative brands.
        </Text>

        {/* HERO IMAGE */}
        <Row
          fillWidth
          horizontal="center"
          marginTop="24"
          style={{ maxWidth: 720 }}
        >
          <Media
            src="/images/about/about-hero.jpg"
            alt="David Cárdenas portrait"
            radius="l"
            aspectRatio="16 / 9"
            sizes="(max-width: 768px) 92vw, 720px"
          />
        </Row>

        {/* EMAIL CTA */}
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
                  size="s"
                  variant="secondary"
                  style={{ marginTop: 24 }}
                />
              ),
          )}
      </Column>
    </Column>
  );
}
