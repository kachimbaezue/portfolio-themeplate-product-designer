/**
 * ─────────────────────────────────────────────
 *  PORTFOLIO TEMPLATE — WORKS DATA
 *  Replace these entries with your own projects.
 * ─────────────────────────────────────────────
 */

import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";

export type Work = {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  client: string;
  service: string;
  about: string;
};

export const works: Work[] = [
  {
    id: "paincame",
    title: "Paincame",
    category: "E-commerce",
    year: "2026",
    image: work1,
    client: "Paincame",
    service: "Web Design",
    about:
      "A vibrant fashion store experience designed to highlight bold collections and convert browsers into loyal customers — with a streamlined checkout flow and mobile-first layout.",
  },
  {
    id: "analytics-app",
    title: "Analytics App",
    category: "Mobile UI",
    year: "2025",
    image: work2,
    client: "Northpeak",
    service: "Product Design",
    about:
      "A clean analytics mobile experience focused on glanceable data, smooth navigation, and delightful micro-interactions tailored for daily use.",
  },
  {
    id: "pinerpack",
    title: "Pinerpack",
    category: "Web Design",
    year: "2025",
    image: work3,
    client: "Pinerpack",
    service: "Template Design",
    about:
      "A scalable SaaS marketing site built for clarity and conversion, with a modular component system the team can extend for years.",
  },
  {
    id: "picicierm",
    title: "Picicierm",
    category: "Branding",
    year: "2025",
    image: work4,
    client: "Picicierm",
    service: "Brand Identity",
    about:
      "A refined identity system spanning logo, type, and motion language — establishing a confident presence in a crowded category.",
  },
  {
    id: "aster",
    title: "Aster",
    category: "Product UI",
    year: "2024",
    image: work5,
    client: "Aster",
    service: "Dashboard Design",
    about:
      "A data-rich dashboard reimagined for speed and focus, with a calm visual hierarchy and meaningful defaults out of the box.",
  },
  {
    id: "bomeiun",
    title: "Bomeiun Studio",
    category: "Branding",
    year: "2024",
    image: work6,
    client: "Bomeiun",
    service: "Brand & Web",
    about:
      "An end-to-end brand and website project with a quiet, editorial feel — letting the studio's craft take center stage.",
  },
];
