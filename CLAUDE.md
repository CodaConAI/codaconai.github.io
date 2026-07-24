# CODACON Website

Static site for codacon.ai built with Eleventy v3. Deployed to GitHub Pages.

## Commands

- `npm run dev` — local dev server with live reload
- `npm run build` — production build to `_site/`

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
---
```

Required: `title`, `description` (<=155 chars), `date`, `tags`.
Optional: `updated` (ISO date), `canonical` (URL, for syndicated posts), `crosspost` (default true; set false to skip syndication).

3. Use tags from the existing set: `ai-security`, `company`, `incident-response`, `sdlc`, `cloud-security`, `board-advisory`. Add new tags sparingly.

## Per-post SEO checklist

- [ ] `description` is unique, <=155 characters, contains a target keyword
- [ ] Exactly one `<h1>` (the `title` renders as h1 automatically)
- [ ] At least one internal link to another page (`/services/`, `/blog/...`, etc.)
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
1. RSS feed subscription link (for RSS-to-email)
2. "Book a call" mailto link

## Rules

- Never add client-side JavaScript without explicit approval.
- Never add npm dependencies without explicit approval.
- Single `main.css` — no CSS frameworks, no Tailwind.
- Dark mode via `prefers-color-scheme` and CSS custom properties only. No toggle, no JS.
- All URLs in feeds and sitemaps must be absolute (`https://codacon.ai/...`).
