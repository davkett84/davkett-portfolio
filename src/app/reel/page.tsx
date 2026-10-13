import { Column, Heading, Text } from "@once-ui-system/core";
import type { Metadata } from "next";

// Oculta de motores de búsqueda — solo accesible por link directo
export const metadata: Metadata = {
  title: "Video Work – David Cardenas",
  description: "Short-form video editing, cinematic reels and social content by David Cardenas.",
  robots: { index: false, follow: false },
};

// ─── AGREGA TUS VIDEOS AQUÍ ───────────────────────────────────────────────────
// Para YouTube: abre el video → Share → Embed → copia solo el ID (lo que viene
// después de "youtube.com/embed/"). Ejemplo: "dQw4w9WgXcQ"
// Para Vimeo: abre el video → Share → Embed → copia el ID numérico.
// Ejemplo: "123456789"
const videos: {
  id: string;
  platform: "youtube" | "vimeo";
  title: string;
  category: string;
}[] = [
  // ── REEMPLAZA ESTOS EJEMPLOS CON TUS VIDEOS REALES ──
  {
    id: "YOUTUBE_VIDEO_ID_1",
    platform: "youtube",
    title: "Personal Brand Reel",
    category: "Short-form · Personal Brand",
  },
  {
    id: "YOUTUBE_VIDEO_ID_2",
    platform: "youtube",
    title: "Cinematic Edit",
    category: "Short-form · Lifestyle",
  },
  {
    id: "YOUTUBE_VIDEO_ID_3",
    platform: "youtube",
    title: "Brand Content",
    category: "Short-form · Commercial",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function getEmbedUrl(id: string, platform: "youtube" | "vimeo") {
  if (platform === "youtube") {
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
  }
  return `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`;
}

export default function Reel() {
  return (
    <Column fillWidth horizontal="center" paddingTop="24" paddingBottom="80">
      {/* HEADER */}
      <Column fillWidth maxWidth="m" horizontal="center" gap="12" paddingBottom="64">
        <Text
          size="s"
          onBackground="neutral-weak"
          style={{
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontSize: "11px",
          }}
        >
          Video Work
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
          Short-form video editing, cinematic reels and social content — crafted for brands and personal storytelling.
        </Text>
      </Column>

      {/* VIDEO GRID */}
      <Column fillWidth maxWidth="l" gap="48" paddingX="24">
        {videos.map((video) => (
          <Column key={video.id} fillWidth gap="16">
            {/* EMBED */}
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%", // 16:9
                borderRadius: "14px",
                overflow: "hidden",
                background: "rgba(0,0,0,0.06)",
              }}
            >
              <iframe
                src={getEmbedUrl(video.id, video.platform)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>

            {/* LABEL */}
            <Column gap="4">
              <Text
                size="s"
                onBackground="neutral-weak"
                style={{
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontSize: "10px",
                }}
              >
                {video.category}
              </Text>
              <Heading
                as="h2"
                variant="heading-strong-s"
                onBackground="neutral-strong"
              >
                {video.title}
              </Heading>
            </Column>
          </Column>
        ))}
      </Column>

      {/* CONTACT CTA */}
      <Column
        fillWidth
        maxWidth="m"
        horizontal="center"
        gap="16"
        paddingTop="80"
        paddingX="24"
        style={{ textAlign: "center" }}
      >
        <Text size="s" onBackground="neutral-weak" style={{ lineHeight: "1.7" }}>
          Available for short-form video editing, social content production, and creative direction.
        </Text>
        <a
          href="mailto:info@davkett.com"
          style={{
            display: "inline-block",
            marginTop: "8px",
            padding: "12px 28px",
            borderRadius: "999px",
            border: "1px solid currentColor",
            fontSize: "13px",
            letterSpacing: "0.08em",
            textDecoration: "none",
            color: "inherit",
            transition: "opacity 200ms ease",
          }}
        >
          Get in touch
        </a>
      </Column>
    </Column>
  );
}
