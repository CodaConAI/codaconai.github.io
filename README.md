# codacon.ai

Static website for CODACON Inc. — AI security consulting and product engineering.

Built with [Eleventy](https://www.11ty.dev/) v3. Deployed to [GitHub Pages](https://pages.github.com/) at [codacon.ai](https://codacon.ai).

## Quick start

```bash
npm install
npm run dev    # local dev server
npm run build  # production build to _site/
```

Requires Node 20+.

## Structure

```
src/
  _includes/base.njk        # base layout
  _includes/post.njk         # blog post layout
  index.md                   # homepage
  services.md                # services page
  blog/                      # blog posts (YYYY-MM-DD-slug.md)
  feed.njk                   # Atom feed at /feed.xml
  sitemap.njk                # sitemap at /sitemap.xml
  robots.txt
  css/main.css
```

## License

Code: [MIT](LICENSE). Blog content: [CC BY 4.0](LICENSE-CONTENT.md).
