module.exports = {
  siteMetadata: {
    title: `Trust this Feast`,
    description: `Cool food here`,
    author: `@andrewsrichardson`,
  },

  plugins: [
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
