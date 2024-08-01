import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "leemiyeon",
  DESCRIPTION: "hello world!.",
  EMAIL: "lemingul7@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "blog",
  DESCRIPTION: "blog home.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/leemiyeonn",
  },
  {
    NAME: "Velog",
    HREF: "https://velog.io/@leemiyeonn/posts",
  },
  {
    NAME: "LinkedIn",
    HREF: "",
  },
];
