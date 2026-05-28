# Folio — Complete Setup and Customisation Guide

This guide covers everything you need to go from a fresh download to a fully personalised, deployed portfolio.

---

## Table of Contents

1. Installation
2. Configuration
3. Themes
4. Adding Your Projects
5. Avatars
6. Pages Reference
7. SEO
8. Deployment
9. Frequently Asked Questions

---

## 1. Installation

Unzip the downloaded package and open the folder in your terminal.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Your site is now running at `http://localhost:5173`.

---

## 2. Configuration

All personalisation lives in one file: `src/data/config.ts`.

```ts
export const siteConfig = {
  name:      "Alex",
  role:      "Product Designer & Developer",
  tagline:   "Turning bold ideas into polished digital products.",
  bio:       "Independent designer and developer crafting modern websites...",
  email:     "hello@yourname.design",
  location:  "Remote · Worldwide",
  available: true,
  socials: {
    x:        "https://x.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    github:   "https://github.com/yourhandle",
    dribbble: "https://dribbble.com/yourhandle",
  },
  calLink:  "yourname/30min",
  siteUrl:  "https://yourname.design",
  theme:    "light",
};
```

### Field reference

| Field | Type | Description |
|---|---|---|
| `name` | string | Your display name. Appears in the nav, footer, and page titles. |
| `role` | string | Short role label shown under your name in the hero. |
| `tagline` | string | Hero headline. Keep it under 60 characters. |
| `bio` | string | 1-2 sentence bio used in the footer and meta description. |
| `email` | string | Contact email shown on the contact page and in the footer. |
| `location` | string | Location string shown in the footer. |
| `available` | boolean | Set to `false` to hide the green "Available" badge. |
| `socials.x` | string | X / Twitter profile URL. Set to `""` to hide. |
| `socials.linkedin` | string | LinkedIn profile URL. Set to `""` to hide. |
| `socials.github` | string | GitHub profile URL. Set to `""` to hide. |
| `socials.dribbble` | string | Dribbble profile URL. Set to `""` to hide. |
| `calLink` | string | Cal.com booking path, e.g. `"yourname/30min"`. Set to `""` to hide the booking section. |
| `siteUrl` | string | Canonical URL used for SEO meta tags. |
| `theme` | string | Default visual theme. See Section 3. |

---

## 3. Themes

The template ships with four visual themes. Set the `theme` field in `config.ts` to activate one as the default.

| Value | Description |
|---|---|
| `"light"` | Clean white background with dark text. Default. |
| `"dark"` | Deep charcoal background with light text. |
| `"gradient"` | Light theme with a soft violet-to-rose colour wash on panels. |
| `"dark gradient"` | Dark theme with the same colour wash. |

### Switching themes at runtime

The theme toggle pill in the top bar switches between light and dark. The "Try gradient" button in the footer toggles the colour wash on or off. The user's preference is saved to `localStorage` and restored on next visit.

### Customising gradient colours

The gradient accent colours are defined as CSS custom properties in `src/styles.css`:

```css
:root {
  --grad-a: #7c6ff7;  /* violet */
  --grad-b: #f472b6;  /* rose   */
  --grad-c: #fb923c;  /* amber  */
}
```

Change these three values to match your brand. The gradient is used on the featured pricing card, the CTA section blob, and the footer gradient toggle button.

---

## 4. Adding Your Projects

Open `src/data/works.ts`. Each entry in the `works` array represents one project.

```ts
{
  id:       "my-project",       // URL slug — used in /work/my-project
  title:    "My Project",
  category: "Web Design",
  year:     "2025",
  image:    work1,              // import from src/assets/
  client:   "Client Name",
  service:  "UI/UX Design",
  about:    "A short description of the project and what was achieved.",
}
```

### Adding a project image

1. Place your image in `src/assets/`. Recommended size: 1200 x 900 px, JPEG or WebP.
2. Import it at the top of `works.ts`:
   ```ts
   import myProject from "@/assets/my-project.jpg";
   ```
3. Use it in the `image` field of your work entry.

### Removing a project

Delete the entry from the `works` array. The work grid, marquee, and detail pages all update automatically.

---

## 5. Avatars

The template uses DiceBear to generate consistent, unique avatars from a text seed. No image uploads are needed.

The avatar utility is in `src/lib/avatar.ts`:

```ts
import { getAvatarUrl } from "@/lib/avatar";

// Returns a data-URI SVG string
const url = getAvatarUrl("any-seed-string");
```

Avatars are used in:
- The hero identity block (seeded with `siteConfig.name`)
- Testimonial cards (seeded with the reviewer's name)
- The work detail client card (seeded with the client name)

To change the avatar style, open `src/lib/avatar.ts` and replace `thumbs` with any style from `@dicebear/collection`, such as `avataaars`, `micah`, `lorelei`, or `personas`.

---

## 6. Pages Reference

### Home (`/`)

Sections in order: hero, recent work marquee, services, pricing, testimonials, FAQ, CTA.

All section data is defined at the top of `src/routes/index.tsx` in the `services`, `tiers`, `testimonials`, and `faqs` arrays. Edit those arrays to update the content.

### Work list (`/work`)

Automatically generated from `src/data/works.ts`. No manual edits needed when you add or remove projects.

### Work detail (`/work/:id`)

Loaded from `works.ts` by the `id` field. The testimonial quote on this page is a placeholder — replace it with a real client quote by adding a `testimonial` field to the work entry in `works.ts` and updating `src/routes/work.$id.tsx` to read it.

### Testimonials (`/testimonials`)

Edit the `items` array in `src/routes/testimonials.tsx`. Each item has `quote`, `name`, `role`, and `seed` fields.

### FAQ (`/faq`)

Edit the `faqs` array in `src/routes/faq.tsx`.

### Contact (`/contact`)

The social links are pulled from `siteConfig.socials`. The Cal.com booking button uses `siteConfig.calLink`. The contact form currently shows a success toast on submit — wire it to a real backend or a service like Formspree, Resend, or EmailJS by replacing the `onSubmit` handler in `src/routes/contact.tsx`.

---

## 7. SEO

Each page sets its own `<title>` and `<meta>` tags via TanStack Router's `head` option. The values are pulled from `siteConfig` automatically.

To update the global fallback title and description, edit `index.html`:

```html
<title>Alex — Product Designer & Developer</title>
<meta name="description" content="..." />
```

The `sitemap.xml` and `robots.txt` files are in the `public/` folder. Update `sitemap.xml` with your real domain and page URLs before deploying.

The `og-image.png` in `public/` is used as the Open Graph preview image. Replace it with a 1200 x 630 px image of your own.

---

## 8. Deployment

### Vercel (recommended)

1. Push the project to a GitHub repository.
2. Import the repository in the Vercel dashboard.
3. Vercel detects Vite automatically. No configuration needed.
4. Click Deploy.

A `vercel.json` is included in the project root with the correct SPA rewrite rules.

### Netlify

1. Push to GitHub.
2. Create a new site in Netlify and connect the repository.
3. Set the build command to `npm run build` and the publish directory to `dist`.
4. Add a `_redirects` file to the `public/` folder with the following content:
   ```
   /* /index.html 200
   ```

### Cloudflare Pages

A `wrangler.jsonc` is included. Run:

```bash
npx wrangler pages deploy dist
```

---

## 9. Frequently Asked Questions

**How do I change the font?**

The font is set in `src/styles.css` under `--font-sans`. Update the Google Fonts link in `index.html` and change the `--font-sans` value to match.

**How do I add a new page?**

Create a new file in `src/routes/`. TanStack Router picks it up automatically. Add the route to the `links` array in `src/components/site-shell.tsx` to include it in the navigation.

**How do I connect the contact form to a real email service?**

Replace the `setTimeout` mock in the `onSubmit` function in `src/routes/contact.tsx` with a real API call. Services like Resend, Formspree, and EmailJS all work well with this setup.

**How do I remove the Cal.com booking section?**

Set `calLink: ""` in `src/data/config.ts`. The booking section will be hidden automatically.

**How do I hide a social link?**

Set the value to an empty string in `siteConfig.socials`. For example: `dribbble: ""`.

**Can I use a custom domain?**

Yes. Configure your domain in your hosting provider's dashboard and update `siteConfig.siteUrl` to match.
