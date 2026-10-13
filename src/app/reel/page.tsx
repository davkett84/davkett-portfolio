import { Column, Heading, Text } from "@once-ui-system/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Work – David Cardenas",
  description: "Short-form video editing, cinematic reels and social content by David Cardenas.",
  robots: { index: false, follow: false },
};

// Videos cortos — 9:16 vertical, grid de 3 columnas en desktop
const shortVideos: { id: string; title: string; category: string }[] = [
  {
    id: "d5VcEEJslQE",
    title: "Luxury Apartment Tour",
    category: "Short · Real Estate",
  },
  {
    id: "RXZGRY8uvLw",
    title: "Personal Brand Edit",
    category: "Short · Personal Brand",
  },
  {
    id: "1oNwpz5QvUo",
    title: "Personal Brand Edit",
    category: "Short · Personal Brand",
  },
  {
    id: "-SiWSdOwA30",
    title: "Personal Brand Edit",
    category: "Short · Personal Brand",
  },
  {
    id: "dwdhPhboNQ0",
    title: "Yoga Session",
    category: "Short · Personal Brand",
  },
  // Agrega aquí los 2 videos de yoga pendientes cuando estén listos:
  // { id: "YOUTUBE_ID", title: "Yoga Session", category: "Short · Personal Brand" },
  // { id: "YOUTUBE_ID", title: "Yoga Session", category: "Short · Personal Brand" },
];

// Documental largo — 16:9 horizontal
const documentary = {
  id: "ei_KUxeyxTg",
  title: "Equannabis — Roots of a New Industry",
  category: "Documentary · Brand Film",
};

export default function Reel() {
  return (
    <Column fillWidth horizontal="center" paddingTop="24" paddingBottom="80">

      {/* HEADER */}
      <Column fillWidth maxWidth="m" horizontal="center" gap="12" paddingBottom="64">
        <Text
          size="s"
          onBackground="neutral-weak"
          style={{ letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "11px" }}
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
          Short-form content, personal brand edits and documentary film —
          crafted for creators, coaches and brands.
        </Text>
      </Column>

      {/* SHORT-FORM GRID — 3 columnas desktop, 2 mobile */}
      <Column fillWidth maxWidth="l" paddingX="24" gap="48">
        <Text
          size="s"
          onBackground="neutral-weak"
          style={{ letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "11px" }}
        >
          Short-form
        </Text>

        <div
          className="reel-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <style>{`
            @media (max-width: 768px) {
              .reel-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 480px) {
              .reel-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {shortVideos.map((v) => (
            <div key={v.id} className="reel-grid-item" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* 9:16 aspect ratio */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "177.78%",
                  borderRadius: "14px",
                  overflow: "hidden",
                  background: "rgba(0,0,0,0.06)",
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "100%", height: "100%",
                    border: 0,
                  }}
                />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5 }}>
                  {v.category}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: "14px", fontWeight: 500 }}>
                  {v.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Column>

      {/* DOCUMENTAL — 16:9 full width */}
      <Column fillWidth maxWidth="l" paddingX="24" paddingTop="80" gap="24">
        <Text
          size="s"
          onBackground="neutral-weak"
          style={{ letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "11px" }}
        >
          Documentary
        </Text>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%",
              borderRadius: "14px",
              overflow: "hidden",
              background: "rgba(0,0,0,0.06)",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${documentary.id}?rel=0&modestbranding=1`}
              title={documentary.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%", height: "100%",
                border: 0,
              }}
            />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5 }}>
              {documentary.category}
            </p>
            <p style={{ margin: "4px 0 0", fontSize: "18px", fontWeight: 500 }}>
              {documentary.title}
            </p>
          </div>
        </div>
      </Column>

      {/* CTA */}
      <Column
        fillWidth maxWidth="m" horizontal="center" gap="16"
        paddingTop="80" paddingX="24"
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
