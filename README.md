# Folio — Minimal Portfolio Template

A clean, production-ready portfolio template for designers and developers. Built with React 19, TanStack Router, Tailwind CSS v4, and shadcn/ui. Ships with light, dark, and gradient accent themes out of the box.

---

## Features

- Light, dark, and gradient accent themes with a single config value
- DiceBear avatar system — no image uploads needed for testimonials
- Fully responsive layout with a mobile testimonial slider
- Animated marquee work showcase with hover-to-pause
- Gradient-accent pricing cards inspired by modern SaaS design
- Cal.com booking integration on the contact page
- Contact form with toast feedback
- SEO-ready meta tags on every page
- Accessible markup throughout
- One config file to personalise the entire site

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, work showcase, services, pricing, testimonials, FAQ, CTA |
| `/work` | Work index — filterable project grid |
| `/work/:id` | Work detail — project info, gallery, prev/next navigation |
| `/testimonials` | Full testimonials page |
| `/faq` | Frequently asked questions |
| `/contact` | Email CTA, social links, Cal.com booking, contact form |

---

## Quick Start

### Requirements

- Node.js 18 or later
- npm, yarn, pnpm, or bun

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Personalisation

Open `src/data/config.ts` and update the values:

```ts
export const siteConfig = {
  name:      "Your Name",
  role:      "Your Role",
  tagline:   "Your hero headline.",
  bio:       "Short bio for the footer.",
  email:     "hello@yourdomain.com",
  location:  "City · Remote",
  available: true,
  socials: {
    x:        "https://x.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    github:   "https://github.com/yourhandle",
    dribbble: "https://dribbble.com/yourhandle",
  },
  calLink:  "yourname/30min",
  siteUrl:  "https://yourdomain.com",
  theme:    "light",
};
```

See `GUIDE.md` for full documentation on themes, avatars, projects, and deployment.

---

## Project Structure

```
src/
  assets/          Static images (avatar, work screenshots)
  components/
    site-shell.tsx  Nav, footer, theme logic
    ui/             shadcn/ui primitives
  data/
    config.ts       Site-wide configuration
    works.ts        Project entries
  lib/
    avatar.ts       DiceBear avatar utility
    utils.ts        Tailwind merge helper
  routes/
    index.tsx       Home page
    work.index.tsx  Work list
    work.$id.tsx    Work detail
    testimonials.tsx
    faq.tsx
    contact.tsx
  styles.css        Tailwind + theme variables
```

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TanStack Router | 1.x | File-based routing |
| Tailwind CSS | 4.x | Utility styling |
| shadcn/ui | New York | UI primitives |
| HugeIcons | 4.x | Icon library |
| DiceBear | 9.x | Avatar generation |
| Sonner | 2.x | Toast notifications |
| Cal.com Embed | 1.x | Booking integration |
| Vite | 7.x | Build tool |

---

## License

This template is licensed for use on a single end product. See the ThemeForest license terms included with your purchase for full details.
