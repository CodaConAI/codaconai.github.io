module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/favicon-32.png");
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy({ "src/_includes/logo.svg": "img/logo.svg" });
  eleventyConfig.addPassthroughCopy({ "src/_includes/logo.svg": "favicon.svg" });

  // Default page language. Overridden by src/fr/fr.11tydata.js.
  eleventyConfig.addGlobalData("lang", "en");

  const byDateDesc = (a, b) => b.date - a.date;

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/blog/*.md").sort(byDateDesc)
  );

  eleventyConfig.addCollection("postsFr", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/fr/blogue/*.md").sort(byDateDesc)
  );

  // Map of translation key -> { en: url, fr: url } for hreflang and the language switch.
  eleventyConfig.addCollection("byKey", (collectionApi) => {
    const map = {};
    for (const item of collectionApi.getAll()) {
      const key = item.data.key;
      if (!key || !item.url) continue;
      if (!map[key]) map[key] = {};
      map[key][item.data.lang || "en"] = item.url;
    }
    return map;
  });

  eleventyConfig.addFilter("dateISO", (date) => {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("dateDisplay", (date, lang) => {
    const locale = lang === "fr" ? "fr-CA" : "en-US";
    return new Date(date).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("absoluteUrl", (url) => {
    const base = "https://codacon.ai";
    if (url.startsWith("http")) return url;
    return base + url;
  });

  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());

  eleventyConfig.addFilter("blogSlug", (fileSlug) => {
    return fileSlug.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  });

  eleventyConfig.addFilter("excerpt", (content) => {
    if (!content) return "";
    const text = content.replace(/<[^>]+>/g, "");
    return text.slice(0, 200).trim() + (text.length > 200 ? "..." : "");
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
