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
  lastName: "Cárdenas",
  name: "David Cárdenas",
  role: "Photographer",
  avatar: "/images/avatar.jpg",
  email: "info@davkettz.com",
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
  title: `${person.name} – Photography Portfolio`,
  description:
    "Minimalist photography portfolio by David Cárdenas — portraits, weddings, and resort stories captured through natural light and emotion.",
  headline: <>Stories told through light and stillness.</>,
  featured: {
    display: false,
    title: null,
    href: "",
  },
  subline: (
    <>
      I’m David, a photographer based in Hawaii. I focus on natural-light portraits,
      destination weddings, and visual storytelling for brands and resorts.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Learn more about ${person.name}, a photographer based in Hawaii.`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: { display: true },
  calendar: { display: false, link: "" },
  intro: {
    display: true,
    title: "About Me",
    description: <>Photographer based in Hawaii.</>,
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
  description: `A photo collection by ${person.name}`,
  images: [
    { src: "/images/gallery/horizontal-1.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-4.jpg", alt: "image", orientation: "vertical" },
    { src: "/images/gallery/horizontal-3.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-1.jpg", alt: "image", orientation: "vertical" },
    { src: "/images/gallery/vertical-2.jpg", alt: "image", orientation: "vertical" },
    { src: "/images/gallery/horizontal-2.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/horizontal-4.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-3.jpg", alt: "image", orientation: "vertical" },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
