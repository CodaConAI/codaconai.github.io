# CODACON Website

Static site for codacon.ai built with Eleventy v3. Deployed to GitHub Pages.

## Commands

- `npm run dev` — local dev server with live reload
- `npm run build` — production build to `_site/`
- `NODE_ENV=production npm run build` — build excluding draft content

## Site structure

Nav: Work · Capabilities · Products · Insights · About · Contact
Footer: Privacy · Security · Terms · LinkedIn · RSS

Pages live in `src/`. Layouts in `src/_includes/`. Data files in `src/_data/`.

## Adding a blog post

1. Create `src/blog/YYYY-MM-DD-kebab-title.md`. The date prefix sets the publish date; the slug after the date becomes the URL: `/blog/kebab-title/`.
2. Front matter schema:

```yaml
---
title: "Post Title"
description: "155 chars max. Used in meta tags, feeds, and social cards."
date: YYYY-MM-DD
tags:
  - ai-security
crosspost: true
draft: false
---
```

Required: `title`, `description` (<=155 chars), `date`, `tags`.
Optional: `updated` (ISO date), `canonical` (URL, for syndicated posts), `crosspost` (default true; set false to skip syndication), `draft` (true to exclude from production builds).

3. Use tags from the existing set: `ai-security`, `company`, `incident-response`, `sdlc`, `cloud-security`, `board-advisory`, `identity-governance`. Add new tags sparingly.

## Adding a case study

1. Create `src/work/kebab-title.md`.
2. Front matter schema:

```yaml
---
title: "Case Study Title"
description: "Short description for listings."
date: YYYY-MM-DD
tags:
  - cloud-security
draft: false
context: "What was happening."
stakes: "What was at risk."
constraints: "What limited the work."
---
```

Content sections: Intervention, Result, What became reusable.

## Per-post SEO checklist

- [ ] `description` is unique, <=155 characters, contains a target keyword
- [ ] Exactly one `<h1>` (the `title` renders as h1 automatically)
- [ ] At least one internal link to another page (`/capabilities/`, `/blog/...`, etc.)
- [ ] Tags are from the existing tag set
- [ ] `date` is set and accurate

## Cross-posting

Channel priority: codacon.ai (canonical) -> LinkedIn -> dev.to -> Medium (manual only).

- **dev.to**: Automated via `.github/workflows/syndicate.yml`. Triggers after a successful Pages deploy. Only publishes posts on their first commit (not edits). Uses repo secret `DEVTO_API_KEY`. Syndication state tracked in `.syndication/devto.json`.
- **LinkedIn**: Same workflow generates a ready-to-paste draft at `.syndication/linkedin/<slug>.txt`. Manual paste — no API automation (requires approved developer app with `w_member_social` scope).
- **Medium**: Manual only. Use Medium's "Import Story" feature and paste the canonical URL (`https://codacon.ai/blog/<slug>/`) so SEO credit stays on the origin site. Do not use the Medium API (deprecated).
- Set `crosspost: false` in front matter to skip syndication for a post.

## Content licensing

All blog content under `src/blog/` is licensed CC BY 4.0. Reuse requires attribution and a link to the original post. This is noted in the post footer template.

Every post ends with two CTAs:
1. RSS feed subscription link
2. "Bring us a workflow" contact link

## Positioning rules

1. Tagline: "Build capability. Keep control." — hero H1 and footer.
2. SEO-first language. Page titles, H1s, meta descriptions, headings use search terms: AI security, AI security consulting, cloud security, DevSecOps, AI governance, AI-driven SDLC, incident response, AWS security, Azure security.
3. Voice: calm, exact, technically grounded. Banned words: revolutionary, cutting-edge, unlock, transformation, visionary, extraordinary.
4. No Talent page. No mentions of acquisitions, holdcos, investment strategy, or portfolio.

## Rules

- Never add client-side JavaScript without explicit approval.
- Never add npm dependencies without explicit approval.
- Single `main.css` — no CSS frameworks, no Tailwind.
- Dark-first design. Light mode via `prefers-color-scheme: light` and CSS custom properties. No toggle, no JS.
- All URLs in feeds and sitemaps must be absolute (`https://codacon.ai/...`).
- SVG shortcodes available: `svgGridTopology`, `svgLayeredBoundary`, `svgFlowCheckpoints`, `svgCompoundingLoop`.
