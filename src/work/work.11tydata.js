const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  layout: "casestudy.njk",
  tags: "casestudy",
  eleventyComputed: {
    permalink: (data) => {
      if (isProduction && data.draft) return false;
      return `/work/${data.page.fileSlug}/`;
    },
    eleventyExcludeFromCollections: (data) => {
      if (isProduction && data.draft) return true;
      return false;
    },
  },
};
