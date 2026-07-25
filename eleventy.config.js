const SITE_URL = "https://codacon.ai";

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/.well-known");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("caseStudies", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/work/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("dateISO", (date) => {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("dateDisplay", (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("absoluteUrl", (url) => {
    if (url && url.startsWith("http")) return url;
    return SITE_URL + (url || "");
  });

  eleventyConfig.addFilter("blogSlug", (fileSlug) => {
    return fileSlug.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  });

  eleventyConfig.addFilter("excerpt", (content) => {
    if (!content) return "";
    const text = content.replace(/<[^>]+>/g, "");
    return text.slice(0, 200).trim() + (text.length > 200 ? "..." : "");
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    if (!content) return "1 min";
    const text = content.replace(/<[^>]+>/g, "");
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 250));
    return `${minutes} min`;
  });

  eleventyConfig.addFilter("limit", (arr, count) => {
    return (arr || []).slice(0, count);
  });

  eleventyConfig.addFilter("where", (arr, key, value) => {
    return (arr || []).filter((item) => {
      const data = item.data || item;
      return data[key] === value;
    });
  });

  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());
  eleventyConfig.addGlobalData("buildTime", () => new Date().toISOString());

  eleventyConfig.addShortcode("svgGridTopology", function () {
    return `<svg class="svg-grid-topology" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-border)" stroke-width="0.5" opacity="0.4"/>
    </pattern>
  </defs>
  <rect width="400" height="200" fill="url(#grid)"/>
  <circle cx="80" cy="60" r="3" fill="var(--color-accent)" opacity="0.6"/>
  <circle cx="200" cy="100" r="3" fill="var(--color-accent)" opacity="0.8"/>
  <circle cx="320" cy="60" r="3" fill="var(--color-accent)" opacity="0.5"/>
  <line x1="80" y1="60" x2="200" y2="100" stroke="var(--color-accent)" stroke-width="0.5" opacity="0.3"/>
  <line x1="200" y1="100" x2="320" y2="60" stroke="var(--color-accent)" stroke-width="0.5" opacity="0.3"/>
</svg>`;
  });

  eleventyConfig.addShortcode("svgLayeredBoundary", function () {
    return `<svg class="svg-diagram" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
  <rect x="10" y="10" width="300" height="140" rx="4" fill="none" stroke="var(--color-border)" stroke-width="1" opacity="0.3"/>
  <rect x="30" y="30" width="260" height="100" rx="4" fill="none" stroke="var(--color-border)" stroke-width="1" opacity="0.5"/>
  <rect x="50" y="50" width="220" height="60" rx="4" fill="none" stroke="var(--color-accent)" stroke-width="1" opacity="0.6"/>
  <circle cx="160" cy="80" r="8" fill="var(--color-accent)" opacity="0.4"/>
  <text x="160" y="130" text-anchor="middle" fill="var(--color-text-muted)" font-size="9" font-family="system-ui, sans-serif">boundary / policy / workload</text>
</svg>`;
  });

  eleventyConfig.addShortcode("svgFlowCheckpoints", function () {
    return `<svg class="svg-diagram" viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
  <line x1="20" y1="40" x2="300" y2="40" stroke="var(--color-border)" stroke-width="1"/>
  <circle cx="60" cy="40" r="6" fill="var(--color-accent)" opacity="0.5"/>
  <circle cx="140" cy="40" r="6" fill="var(--color-accent)" opacity="0.7"/>
  <circle cx="220" cy="40" r="6" fill="var(--color-accent)" opacity="0.9"/>
  <circle cx="280" cy="40" r="8" fill="var(--color-accent)" opacity="1"/>
  <text x="60" y="65" text-anchor="middle" fill="var(--color-text-muted)" font-size="8" font-family="system-ui, sans-serif">assess</text>
  <text x="140" y="65" text-anchor="middle" fill="var(--color-text-muted)" font-size="8" font-family="system-ui, sans-serif">build</text>
  <text x="220" y="65" text-anchor="middle" fill="var(--color-text-muted)" font-size="8" font-family="system-ui, sans-serif">harden</text>
  <text x="280" y="65" text-anchor="middle" fill="var(--color-text-muted)" font-size="8" font-family="system-ui, sans-serif">own</text>
</svg>`;
  });

  eleventyConfig.addShortcode("svgCompoundingLoop", function () {
    return `<svg class="svg-diagram" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
  <path d="M 100 30 A 70 70 0 1 1 99.9 30" fill="none" stroke="var(--color-border)" stroke-width="1" opacity="0.4"/>
  <path d="M 100 50 A 50 50 0 1 1 99.9 50" fill="none" stroke="var(--color-accent)" stroke-width="1" opacity="0.5"/>
  <path d="M 100 70 A 30 30 0 1 1 99.9 70" fill="none" stroke="var(--color-accent)" stroke-width="1.5" opacity="0.8"/>
  <polygon points="100,25 96,35 104,35" fill="var(--color-accent)" opacity="0.6"/>
  <text x="100" y="105" text-anchor="middle" fill="var(--color-text-muted)" font-size="9" font-family="system-ui, sans-serif">compound</text>
</svg>`;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
