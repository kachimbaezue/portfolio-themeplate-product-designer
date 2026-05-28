/**
 * PORTFOLIO TEMPLATE — SITE CONFIG
 * Edit this single file to personalise every page.
 * Full documentation: /GUIDE.md
 */

export const siteConfig = {
  /** Your display name — appears in the nav, footer, and page titles */
  name: "Alex",

  /** Short role label shown under your name in the hero */
  role: "Product Designer & Developer",

  /** Hero headline — keep it under 60 characters */
  tagline: "Turning bold ideas into polished digital products.",

  /** 1-2 sentence bio used in the footer and meta description */
  bio: "Independent designer and developer crafting modern websites and user experiences that help brands grow and stand out.",

  /** Contact email shown on the contact page and in the footer */
  email: "hello@yourname.design",

  /** Location string shown in the footer */
  location: "Remote · Worldwide",

  /** Set to false to hide the green "Available" badge */
  available: true,

  /**
   * Social links.
   * Set any value to "" to hide that link across the whole site.
   */
  socials: {
    x:        "https://x.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    github:   "https://github.com/yourhandle",
    dribbble: "https://dribbble.com/yourhandle",
  },

  /**
   * Cal.com booking namespace — e.g. "yourname/30min".
   * Set to "" to hide the booking section on the contact page.
   */
  calLink: "yourname/30min",

  /** Canonical site URL used for SEO */
  siteUrl: "https://yourname.design",

  /**
   * Visual theme applied to <html>.
   * Options:
   *   "light"            — clean white (default)
   *   "dark"             — deep charcoal
   *   "gradient"         — light + soft colour wash
   *   "dark gradient"    — dark + colour wash
   */
  theme: "light" as "light" | "dark" | "gradient" | "dark gradient",
};
