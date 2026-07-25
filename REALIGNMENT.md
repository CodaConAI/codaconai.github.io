# CODACON Site Realignment — Summary

## What changed

### Site structure
- **Nav:** Work · Capabilities · Products · Insights · About · Contact (was: Home · Services · Blog · RSS)
- **Footer:** Privacy · Security · Terms · LinkedIn · RSS + tagline "Build capability. Keep control."
- **"Blog" renamed to "Insights"** with on-page editorial label "Field Notes"
- **Services page removed**, replaced by Capabilities page with Build / Secure / Govern sections
- **New pages:** Work, Products, Insights, About, Contact, Privacy, Security, Terms

### Visual system
- Dark-first design: near-black base (#0a0a0a), warm off-white text (#e8e4df), terminal green accent (#00e676)
- Light mode via `prefers-color-scheme: light` — adjusted palette with darker green (#00875a) for AA contrast
- System font stack retained (no external fonts, no CDN)
- Strong type scale with `clamp()` for responsive sizing
- Generous spacing via CSS custom properties
- Sticky header, skip-to-content link, print styles
- All new CSS in single `main.css` (no frameworks, no JS)

### SVG components
Four inline SVG shortcodes added to Eleventy config:
- `svgGridTopology` — grid/topology background pattern
- `svgLayeredBoundary` — layered boundary diagram
- `svgFlowCheckpoints` — flow with checkpoints (assess → build → harden → own)
- `svgCompoundingLoop` — compounding loop diagram

### Data layer
- `src/_data/site.js` — site metadata, contact email, author info
- `src/_data/navigation.js` — main nav and footer links
- `src/_data/products.js` — product card data

### Templates
- `base.njk` — rewritten with semantic markup, sticky nav, footer, JSON-LD WebSite, breadcrumbs, RSS autodiscovery, skip link, draft banner
- `post.njk` — updated for "Field Notes" branding, reading time, CC BY 4.0 article license
- `casestudy.njk` — new layout for case studies (Context/Stakes/Constraints metadata, Article JSON-LD)

### Content pages

| Page | File | Key content |
|------|------|-------------|
| Home | `src/index.njk` | Hero with tagline, trust line, 3 capability cards, latest 3 insights, products teaser, final CTA |
| Capabilities | `src/capabilities.md` | Build / Secure / Govern sections with anchors, capability transfer, 4 engagement modes |
| Work | `src/work.njk` | Case study listing page |
| Products | `src/products.njk` | Product cards from data file with status badges |
| Insights | `src/insights.njk` | Blog listing with reading time, replaces `/blog/` listing |
| About | `src/about.md` | "Technology should increase agency" hero, founder section, operating model, 5 values |
| Contact | `src/contact.md` | "Bring us one consequential workflow" headline, mailto flow, field guidance, security warning |
| Privacy | `src/privacy.md` | Quebec/Canadian privacy policy draft |
| Security | `src/security-page.md` | Security practices, responsible disclosure policy |
| Terms | `src/terms.md` | Terms of use, Quebec governing law |

### Case study
- `src/work/aws-identity-center-governance.md` — AWS Identity Center → policy-driven IaC. Marked `draft: true`.

### Draft blog posts
All marked `draft: true`, excluded from production builds:
1. "The AI pilot is not the product: what production readiness actually requires"
2. "AI governance that engineers can execute"
3. "From cloud policy document to testable guardrail"

### SEO / Technical
- Per-page unique `<title>` and `<meta name="description">` targeting search terms
- JSON-LD: Organization (home), WebSite (all pages), BlogPosting (posts), Article (case studies), BreadcrumbList (all pages)
- `sitemap.xml` excludes drafts in production
- `robots.txt` with sitemap reference
- RSS/Atom feed with autodiscovery link
- Canonical URLs on all pages
- `/.well-known/security.txt` per RFC 9116
- OG/Twitter meta tags on all pages

### Draft filtering
- `draft: true` in front matter → excluded from production builds (`permalink: false` + `eleventyExcludeFromCollections`)
- Dev builds include drafts with a visible "Draft — not published" banner

### Existing content preserved
- `src/blog/2025-07-24-hello-world.md` — internal link updated (`/services/` → `/contact/`)
- Syndication workflows unchanged
- `.syndication/devto.json` preserved
- Dual licensing (MIT code / CC BY 4.0 content) preserved

---

## Open TODOs

### Awaiting your input

1. **Product URLs** — GitHub OIDC templates, WiFi Sentinel, and AWS Security Baselines repos not found in CodaConAI org. Marked `TODO` in `src/_data/products.js`. Provide repo URLs or remove products.

2. **Contact form wiring** — Currently mailto-based (`contact@codacon.net`). Marked `TODO` in `src/contact.md`. Wire a static-friendly form service (Formspree, Basin, etc.) or keep mailto.

3. **Logo** — Text wordmark "CODACON" used in header. Templates check for `/assets/logo.svg` — commit your logo there and it will be used automatically in the favicon. OG image logo integration needs a separate step.

4. **Founder photo** — Placeholder in `src/about.md`. Replace `<div class="founder-photo-placeholder">` with an `<img>` tag pointing to the photo in `src/assets/`.

5. **Legacy redirects** — No codacon.net redirect stubs created. List any legacy URLs worth preserving so redirect stubs can be added. GitHub Pages supports `<meta http-equiv="refresh">` stubs.

6. **Legal review** — Privacy policy, terms of use, and security policy are drafts. Multiple `TODO` comments mark items needing Quebec legal counsel review:
   - Privacy: concrete retention periods, designated privacy officer (Law 25 requirement)
   - Terms: liability limitation clause under Quebec consumer protection law
   - Security: `security@codacon.net` alias setup, PGP key for encrypted reports

7. **security.txt** — Expires date set to 2026-07-25. PGP encryption key placeholder noted.

### Decisions

1. **OPEN DECISION: French locale** — Templates and copy structured in English only. Adding French requires: i18n-ready URL paths (e.g., `/fr/`), translated data files, locale-aware templates. The current structure supports this without restructuring — Eleventy's directory data files and computed permalinks can be extended per-locale. Flag this when French becomes a priority for Quebec public-sector buyers.

2. **OG/social images** — No per-page OG images generated. The `og:image` meta tag is conditional and will use `/assets/logo.svg` when present. Social platforms generally require raster images (PNG/JPG) for share previews. Options:
   - Add `@11ty/eleventy-img` or a Canvas-based script to generate PNG cards at build time (requires npm dependency approval)
   - Use an external service (e.g., Cloudinary, Vercel OG) for dynamic image generation
   - Create a static default OG image manually

3. **Blog URL structure** — Posts remain at `/blog/<slug>/` (not `/insights/<slug>/`). The nav label is "Insights" and the listing page is at `/insights/`, but individual post URLs use `/blog/` for backward compatibility with the existing hello-world post and syndication state. Change only if you want to break the existing URL.

---

## File tree (new/modified)

```
src/
  _data/
    site.js                    NEW — site metadata
    navigation.js              NEW — nav structure
    products.js                NEW — product card data
  _includes/
    base.njk                   REWRITTEN — new visual system, nav, footer
    post.njk                   REWRITTEN — Field Notes branding, reading time
    casestudy.njk              NEW — case study layout
  assets/                      NEW — empty, awaiting logo.svg
  .well-known/
    security.txt               NEW — RFC 9116
  blog/
    blog.11tydata.js           UPDATED — draft filtering
    2025-07-24-hello-world.md  UPDATED — internal link fix
    2025-07-25-ai-pilot-not-the-product.md        NEW (draft)
    2025-07-25-ai-governance-engineers-can-execute.md  NEW (draft)
    2025-07-25-cloud-policy-to-testable-guardrail.md   NEW (draft)
  work/
    work.11tydata.js           NEW — case study defaults
    aws-identity-center-governance.md  NEW (draft)
  css/
    main.css                   REWRITTEN — dark-first engineering aesthetic
  index.njk                    NEW (replaces index.md)
  capabilities.md              NEW (replaces services.md)
  work.njk                     NEW
  products.njk                 NEW
  insights.njk                 NEW (replaces blog.md)
  about.md                     NEW
  contact.md                   NEW
  privacy.md                   NEW
  security-page.md             NEW
  terms.md                     NEW
  feed.njk                     UPDATED — Field Notes title
  sitemap.njk                  UPDATED — draft exclusion
eleventy.config.js             REWRITTEN — new collections, filters, shortcodes
CLAUDE.md                      UPDATED — reflects new structure
REALIGNMENT.md                 NEW — this file

DELETED:
  src/index.md
  src/services.md
  src/blog.md
```
