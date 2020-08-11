module.exports = {
  siteMetadata: {
    title: `Trust This Feast`,
    description: `🍜Hearty hella-seasoned food 🌮Lazy munches, tasty brunches, simple lunches and big fat feasts ♥️ Uncomplicated and so worth it #TrustThisFeast`,
    author: `@andrewsrichardson`,
  },

  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Trust This Feast",
        short_name: "Trust This Feast",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/logo.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/blog`,
        name: `content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {},
          },
        ],
      },
    },
    `gatsby-plugin-netlify-cms`,
    {
      resolve: "gatsby-plugin-flexsearch",
      options: {
        languages: ["en"],
        type: "MarkdownRemark",
        fields: [
          {
            name: "title",
            indexed: true,
            resolver: "frontmatter.title",
            attributes: {
              encode: "balance",
              tokenize: "strict",
              threshold: 6,
              depth: 3,
            },
            store: true,
          },
          {
            name: "body",
            indexed: true,
            resolver: "fields.html",
            attributes: {
              encode: "balance",
              tokenize: "strict",
              threshold: 6,
              depth: 3,
            },
            store: true,
          },
          {
            name: "url",
            indexed: false,
            resolver: "frontmatter.path",
            store: true,
          },
          {
            name: "tags",
            indexed: true,
            resolver: "frontmatter.tags",
            attributes: {
              encode: "balance",
              tokenize: "strict",
              threshold: 6,
              depth: 3,
            },
            store: true,
          },
          {
            name: "main_image",
            indexed: false,
            resolver: "frontmatter.main_image",
            store: true,
          },
          {
            name: "ingredients_image",
            indexed: false,
            resolver: "frontmatter.ingredients_image",
            store: false,
          },
          {
            name: "other_images",
            indexed: false,
            resolver: "frontmatter.other_images",
            store: false,
          },
        ],
      },
    },
  ],
}
