import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  compact?: boolean; // Only used in Related Projects
}

export function Projects({ range, exclude, compact = false }: ProjectsProps) {
  // Load all MDX project files
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude current project
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  // Sort by date
  const sortedProjects = allProjects.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  // Apply range
  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  /////////////////////////////////////////////////////////////////////////////
  // 🔹 COMPACT MODE (for Related Projects)
  /////////////////////////////////////////////////////////////////////////////
  if (compact) {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          margin: "32px auto 72px",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            justifyContent: "center",
            paddingBottom: "8px",
            scrollbarWidth: "none",
          }}
        >
          {displayedProjects.map((post) => (
            <div
              key={post.slug}
              style={{
                minWidth: "260px",
                maxWidth: "260px",
                flexShrink: 0,
              }}
            >
              <ProjectCard
                compact={true}
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

  /////////////////////////////////////////////////////////////////////////////
  // 🔹 NORMAL MODE (Homepage + Work page)
  /////////////////////////////////////////////////////////////////////////////
  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
