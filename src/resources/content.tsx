import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "David",
  lastName: "Cárdenas",
  name: "David Cárdenas",
  role: "Photographer",
  avatar: "/images/avatar.jpg", // puedes reemplazar con tu retrato más adelante
  email: "info@davkettz.com",
  location: "Pacific/Honolulu",
  languages: ["English", "Spanish"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Let’s Work Together</>,
  description: (
    <>
      Have a project, collaboration, or photography inquiry?{" "}
      <br /> Feel free to reach out — I’d love to hear from you.
    </>
  ),
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
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
    display: false, // ocultamos la etiqueta de "Featured work" para mantener limpieza
    title: null,
    href: "",
  },
  subline: (
    <>
      I’m David, a photographer based in Hawaii. I focus on natural-light portraits,
      destination weddings, and visual storytelling for brands and resorts.
      <br />
      My work blends simplicity, emotion, and quiet detail.
    </>
  ),
};


const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Learn more about ${person.name}, a photographer based in Hawaii.`,
  tableOfContent: {
    display: false, // desactivado para mantener el diseño limpio
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false, // no mostramos calendario
    link: "",
  },
  intro: {
    display: true,
    title: "About Me",
    description: (
      <>
        David Cárdenas is a photographer based in Hawaii, blending natural light, emotion, and
        minimal composition to tell quiet yet powerful visual stories.
        <br />
        <br />
        His work moves between portraits, destination weddings, and brand sessions for resorts,
        capturing honest moments that feel timeless and effortless. Inspired by simplicity,
        David’s approach focuses on presence — finding beauty in restraint, silence, and natural
        light.
      </>
    ),
  },
  work: {
    display: true,
    title: "Recent Work",
    experiences: [
      {
        company: "Pacific Dream Photography",
        timeframe: "2023 – Present",
        role: "Photographer & Assistant Manager",
        achievements: [
          <>
            Conducts portrait, family, and wedding sessions for resorts such as The Kahala, Four
            Seasons, and Marriott Ko Olina.
          </>,
          <>
            Oversees creative direction, client experience, and quality control for on-site
            production teams.
          </>,
        ],
        images: [],
      },
      {
        company: "Outré Bizarre",
        timeframe: "2019 – Present",
        role: "Founder / Creative Director",
        achievements: [
          <>
            Founder of a surreal-art brand mixing photography, narrative, and visual storytelling.
          </>,
          <>
            Produces limited edition zines and visual projects combining absurdity, emotion, and
            design minimalism.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false, // podemos activarlo luego si deseas mostrar tu formación
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: false, // mantenemos simple por ahora
    title: "Technical skills",
    skills: [],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Selected photography projects and visual stories by ${person.name}.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A curated selection of portraits and corporate work by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "Portrait",
      orientation: "horizontal",
      category: "portraits",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "Portrait",
      orientation: "vertical",
      category: "portraits",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "Portrait",
      orientation: "horizontal",
      category: "portraits",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "Portrait",
      orientation: "vertical",
      category: "portraits",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "Corporate Event",
      orientation: "vertical",
      category: "corporate",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "Corporate Event",
      orientation: "horizontal",
      category: "corporate",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "Corporate Event",
      orientation: "horizontal",
      category: "corporate",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "Corporate Event",
      orientation: "vertical",
      category: "corporate",
    },
  ],
};


export { person, social, newsletter, home, about, blog, work, gallery };
