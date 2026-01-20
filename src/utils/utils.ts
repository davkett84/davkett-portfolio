import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

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
  if (!fs.existsSync(dir)) notFound();
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) notFound();

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

  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
