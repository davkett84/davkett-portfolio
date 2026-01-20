import Link from "next/link";
import { getPosts } from "@/utils/utils";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  compact?: boolean;
}

export function Projects({ range, exclude, compact = false }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  if (exclude?.length) {
    allProjects = allProjects.filter((p) => !exclude.includes(p.slug));
  }

  const sorted = allProjects.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  const displayed = range
    ? sorted.slice(range[0] - 1, range[1] ?? sorted.length)
    : sorted;

  // COMPACT (related projects) — tu ProjectCard original
  if (compact) {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          margin: "32px auto 72px",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 24,
            overflowX: "auto",
            justifyContent: "center",
            paddingBottom: 8,
            scrollbarWidth: "none",
          }}
        >
          {displayed.map((post) => (
            <div
              key={post.slug}
              style={{ minWidth: 260, maxWidth: 260, flexShrink: 0 }}
            >
              <ProjectCard
                compact
                priority={false}
                href={`/work/${post.slug}`}
                images={post.metadata.images || []}
                title={post.metadata.title}
                description={post.metadata.summary}
                content={post.content}
                avatars={[]}
                link={post.metadata.link || ""}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // NORMAL — Danny-style tiles
  return (
    <div style={{ width: "100%" }}>
      <style>{`
        .workGridWrap {
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 18px;
          box-sizing: border-box;
        }

        .workGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          width: 100%;
        }

        @media (max-width: 980px) {
          .workGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 380px) {
          .workGrid { grid-template-columns: 1fr; }
        }

        .workLink {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .workTile {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9; /* (Luego lo cambiamos a horizontal tipo Danny) */
          border-radius: 14px;
          overflow: hidden;
          background: rgba(0,0,0,0.06);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          transition: transform 200ms ease, box-shadow 200ms ease;
        }

        .workMedia {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .workMedia img,
        .workMedia video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.01);
          transition: transform 220ms ease, filter 220ms ease;
          filter: none;
        }

        .workLink:hover .workTile {
          transform: scale(1.01);
          box-shadow: 0 14px 42px rgba(0,0,0,0.14);
        }

        /* Hover: blanco y negro + un poco más oscuro para leer texto */
        .workLink:hover .workMedia img,
        .workLink:hover .workMedia video {
          transform: scale(1.03);
          filter: grayscale(1) contrast(1.05) brightness(0.72);
        }

        .workOverlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 18px;
          opacity: 0;
          transition: opacity 220ms ease;
          pointer-events: none;
          background: rgba(0,0,0,0.12);
        }

        .workLink:hover .workOverlay {
          opacity: 1;
        }

        .workTitle {
          font-family: Canela, serif;
          font-weight: 500;
          letter-spacing: 0.02em;
          line-height: 1.1;
          color: rgba(255,255,255,0.92);
          font-size: 18px;
          text-transform: uppercase;
        }

        .workSubtitle {
          margin-top: 10px;
          color: rgba(255,255,255,0.70);
          font-size: 12px;
          letter-spacing: 0.10em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="workGridWrap">
        <div className="workGrid">
          {displayed.map((post) => {
            const md: any = post.metadata;

            const subtitle =
              typeof md.subtitle === "string" && md.subtitle ? md.subtitle : "";

            const previewType: "video" | "image" =
              md.previewType === "video" || md.previewType === "image"
                ? md.previewType
                : "image";

            const fallbackImage =
              Array.isArray(md.images) && md.images[0] ? md.images[0] : "";

            const previewImage =
              typeof md.previewImage === "string" && md.previewImage
                ? md.previewImage
                : fallbackImage;

            const previewVideoLow =
              typeof md.previewVideoLow === "string" && md.previewVideoLow
                ? md.previewVideoLow
                : "";

            return (
              <Link key={post.slug} href={`/work/${post.slug}`} className="workLink">
                <div className="workTile">
                  <div className="workMedia">
                    {previewType === "video" && previewVideoLow ? (
                      <video
                        src={previewVideoLow}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img src={previewImage} alt={md.title || "Project"} />
                    )}
                  </div>

                  <div className="workOverlay">
                    <div>
                      <div className="workTitle">{md.title}</div>
                      {subtitle ? (
                        <div className="workSubtitle">{subtitle}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
