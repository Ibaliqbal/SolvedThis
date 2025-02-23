import type { Config } from "isomorphic-dompurify";

const limitContent = 1500;

const domSanitizeConfig = {
  ADD_TAGS: ["iframe"],
  ADD_ATTR: [
    "allow",
    "allowfullscreen",
    "frameborder",
    "scrolling",
    "src",
    "width",
    "height",
  ],
} satisfies Config;

export { limitContent, domSanitizeConfig };
