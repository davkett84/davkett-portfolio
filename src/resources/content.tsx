import {
  About,
  Blog,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
} from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "David",
  lastName: "Cardenas",
  name: "David Cardenas",
  role: "Photographer · Filmmaker",
  avatar: "/images/avatar.jpg",
  email: "info@davkett.com",
  location: "Pacific/Honolulu",
  languages: ["English", "Spanish"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Let’s Work Together</>,
  description: (
    <>
      Have a project, collaboration, or photography inquiry?
      <br /> Feel free to reach out — I’d love to hear from you.
    </>
  ),
};

const social: Social = [
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://instagram.com/davkettz",
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@davkett",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}`,
  description: "Photographer · Filmmaker based in Hawaii. Available worldwide.",
  headline: <>Stories told through light and stillness.</>,
  featured: {
    display: false,
    title: null,
    href: "",
  },
  subline: (
    <>
      I’m David, a photographer and filmmaker based in Hawaii. I create natural-light
      portraits, destination weddings, and visual storytelling for brands and resorts —
      with a calm, cinematic approach.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Learn more about ${person.name}, a photographer and filmmaker based in Hawaii.`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: { display: true },
  calendar: { display: false, link: "" },
  intro: {
    display: true,
    title: "About Me",
    description: <>Photographer · Filmmaker based in Hawaii.</>,
  },
  work: { display: false, title: "", experiences: [] },
  studies: { display: false, title: "", institutions: [] },
  technical: { display: false, title: "", skills: [] },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing",
  description: `Posts by ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Selected work by ${person.name}.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A curated photo collection by ${person.name}`,
  images: [
    // 🔹 PORTRAITS (01–05)
    {
      src: "/images/gallery/Portrait 01.jpg",
      alt: "Editorial solo portrait with strong gaze and natural light",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Portrait 02.jpg",
      alt: "Family lifestyle photography walking together naturally",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Portrait 03.jpg",
      alt: "Intimate engagement portrait with emotional closeness",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Portrait 04.jpg",
      alt: "Lifestyle solo portrait with architectural environment",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Portrait 05.jpg",
      alt: "Editorial wedding portrait with calm and subtle mood",
      orientation: "vertical",
    },

    // 🔹 COMMERCIAL (01–11)
    {
      src: "/images/gallery/Commercial 00001.jpg",
      alt: "Commercial image 1",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Commercial 00002.jpg",
      alt: "Commercial image 2",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Commercial 00003.jpg",
      alt: "Commercial image 3",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Commercial 00004.jpg",
      alt: "Commercial image 4",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Commercial 00005.jpg",
      alt: "Commercial image 5",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Commercial 00006.jpg",
      alt: "Commercial image 6",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Commercial 00007.jpg",
      alt: "Commercial image 7",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Commercial 00008.jpg",
      alt: "Commercial image 8",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Commercial 00009.jpg",
      alt: "Commercial image 9",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Commercial 00010.jpg",
      alt: "Commercial image 10",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Commercial 00011.jpg",
      alt: "Commercial image 11",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
