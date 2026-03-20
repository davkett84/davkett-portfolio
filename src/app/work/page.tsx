import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column fillWidth horizontal="center" paddingTop="24">
      <Column fillWidth maxWidth="m" horizontal="center" gap="12" paddingBottom="64">
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={work.path}
          title={work.title}
          description={work.description}
          image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />

        <Text
          size="s"
          onBackground="neutral-weak"
          style={{
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontSize: "11px",
          }}
        >
          Selected Work
        </Text>

        <Heading
          variant="display-strong-m"
          align="center"
          onBackground="neutral-strong"
          style={{
            fontFamily: "Canela, serif",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: "1.05",
            fontSize: "clamp(40px, 4vw, 60px)",
          }}
        >
          David Cardenas
        </Heading>

        <Text
          size="s"
          onBackground="neutral-weak"
          align="center"
          style={{ maxWidth: "420px", lineHeight: "1.7" }}
        >
          Documentary, brands, motorsport & lifestyle — stories told through film and photography.
        </Text>
      </Column>

      <Column fillWidth>
        <Projects />
      </Column>
    </Column>
  );
}