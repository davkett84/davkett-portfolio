import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;

  // existing
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;

  // NEW (for Danny-style Work)
  subtitle?: string;
  previewType?: "image" | "video";
  previewImage?: string;
  previewVideoLow?: string;
  previewVideoHigh?: string;
  mainVideo?: string;
  btsImages?: string[];
};

function getMDXFiles(dir: string) {
  // ✅ If the directory doesn't exist (e.g., you removed blog posts), return no files.
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  // ✅ If a file is missing, return an empty stub instead of crashing the build.
  if (!fs.existsSync(filePath)) {
    return {
      metadata: {
        title: "",
        publishedAt: "",
        summary: "",
        image: "",
        images: [],
        tag: "",
        team: [],
        link: "",
        subtitle: "",
        previewType: "image",
        previewImage: "",
        previewVideoLow: "",
        previewVideoHigh: "",
        mainVideo: "",
        btsImages: [],
      } as Metadata,
      content: "",
    };
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt || "",
    summary: data.summary || "",

    image: data.image || "",
    images: Array.isArray(data.images) ? data.images : [],
    tag: typeof data.tag === "string" ? data.tag : "",
    team: Array.isArray(data.team) ? data.team : [],
    link: data.link || "",

    // pass-through extras (no se pierden)
    subtitle: typeof data.subtitle === "string" ? data.subtitle : "",
    previewType:
      data.previewType === "video" || data.previewType === "image"
        ? data.previewType
        : "image",
    previewImage: typeof data.previewImage === "string" ? data.previewImage : "",
    previewVideoLow: typeof data.previewVideoLow === "string" ? data.previewVideoLow : "",
    previewVideoHigh: typeof data.previewVideoHigh === "string" ? data.previewVideoHigh : "",
    mainVideo: typeof data.mainVideo === "string" ? data.mainVideo : "",
    btsImages: Array.isArray(data.btsImages) ? data.btsImages : [],
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles
    .map((file) => {
      const filePath = path.join(dir, file);
      const { metadata, content } = readMDXFile(filePath);
      const slug = path.basename(file, path.extname(file));

      // ✅ Skip empty stubs (in case a file was missing)
      if (!slug) return null;

      return {
        metadata,
        slug,
        content,
      };
    })
    .filter(Boolean) as Array<{ metadata: Metadata; slug: string; content: string }>;
}

export function getPosts(customPath: string[] = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
