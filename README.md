# AestheticIQ — Astro Site

The production website for AestheticIQ.co.uk. Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), markdown content collections for Insights, deploys to Vercel.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:4321> — the homepage will render with sample data from `src/content/insights/`.

## Project structure

```
.
├── astro.config.mjs        # Astro + Tailwind + sitemap configuration
├── tailwind.config.mjs     # Design tokens — palette, typography, shadows
├── tsconfig.json           # TypeScript config with @ path aliases
├── src/
│   ├── components/         # Shared building blocks (Nav, Footer, Hero, Card variants)
│   ├── content/
│   │   ├── config.ts       # Insights collection schema (typed frontmatter)
│   │   └── insights/       # Markdown files — one per article
│   ├── layouts/
│   │   └── BaseLayout.astro  # Page shell — head metadata, nav, footer
│   ├── pages/              # File-based routing — index.astro = homepage
│   │   ├── index.astro
│   │   ├── industries/
│   │   ├── solutions/
│   │   ├── insights/
│   │   └── legal/
│   └── styles/
│       └── global.css      # Base styles, font imports, repeating patterns
└── public/                 # Static assets — favicon, og images, downloads
```

## Adding an Insights article

1. Create a new `.md` file in `src/content/insights/`. The filename becomes the URL slug.
2. Include the required frontmatter:

   ```yaml
   ---
   title: 'Your article title'
   excerpt: 'One-sentence preview shown on the index and homepage.'
   category: 'Market data'  # or 'Regulatory' or 'Methodology'
   date: 2026-05-01
   readTime: '7 min read'
   featured: false  # optional — true to feature on Insights index
   ---
   ```

3. Write the article body in markdown below the frontmatter.
4. Save. The article appears automatically on the Insights index and homepage on next build.

## Adding a static page

For a non-insights page (e.g. a new industry page), create a new `.astro` file in `src/pages/`. The path becomes the URL.

```
src/pages/industries/medical-devices.astro  →  /industries/medical-devices/
```

Use the existing pages as templates — copy the structure, swap the content.

## Design system

All styling uses Tailwind utility classes with a custom config in `tailwind.config.mjs`. The palette:

- `navy-900` (#0a1929) — primary dark
- `cyan-500` (#00b4d8) — primary accent
- `clay-500` (#c15b37) — ClinicScore brand only
- Standard slate scale for greys

Repeating patterns are defined in `src/styles/global.css` as Tailwind component classes:

- `.btn-primary`, `.btn-secondary-light`, `.btn-secondary-dark`
- `.eyebrow`, `.eyebrow-light`
- `.section`, `.section-alt`, `.section-dark`
- `.hero-bg`
- `.card-base`, `.card-hover`
- `.container-site`, `.container-tight`

## Deployment

Built for Vercel:

1. Push to GitHub
2. Connect the repo to Vercel
3. Vercel auto-detects Astro and configures the build

Build output: static HTML — no server runtime needed.

## Adding analytics, forms, or a newsletter

The contact form and newsletter signup in the wireframes are visual-only. To wire them up:

- **Forms** → Formspree, Basin, or Web3Forms — drop in a form action URL
- **Newsletter** → ConvertKit, Buttondown, or Substack — embed the signup form
- **Analytics** → Plausible (privacy-respecting) or GA4 — add the script tag in `BaseLayout.astro`

Each integration is typically a 15-minute job.

## Browser support

Modern evergreen browsers. The site uses CSS grid, custom properties, and modern font features — all of which have been baseline since 2020. No IE support.
