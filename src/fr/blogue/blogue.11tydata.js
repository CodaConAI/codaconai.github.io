// French blog posts. Not syndicated: the dev.to workflow only watches src/blog/.
// Each post sets `key: post:<english-slug>` in its front matter so the language
// switch and hreflang can pair it with the English original.
module.exports = {
  layout: "post.njk",
  tags: "post-fr",
  crosspost: false,
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug.replace(/^\d{4}-\d{2}-\d{2}-/, "");
      return `/fr/blogue/${slug}/`;
    },
  },
};
