module.exports = {
  layout: "post.njk",
  tags: "post",
  crosspost: true,
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug.replace(/^\d{4}-\d{2}-\d{2}-/, "");
      return `/blog/${slug}/`;
    },
  },
};
