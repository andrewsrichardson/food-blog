module.exports = {
  siteMetadata: {
    title: `Trust this Feast`,
    description: `Cool food here`,
    author: `@andrewsrichardson`,
  },

  plugins: [
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/static/assets`,
    //     name: `assets`,
    //   },
    // },
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
    // {
    //   resolve: "gatsby-plugin-local-search",
    //   options: {
    //     // A unique name for the search index. This should be descriptive of
    //     // what the index contains. This is required.
    //     name: "Pages",

    //     // Set the search engine to create the index. This is required.
    //     // The following engines are supported: flexsearch, lunr
    //     engine: "flexsearch",

    //     // Provide options to the engine. This is optional and only recommended
    //     // for advanced users.
    //     //
    //     // Note: Only the flexsearch engine supports options.
    //     // engineOptions: "speed",

    //     // GraphQL query used to fetch all data for the search index. This is
    //     // required.
    //     query: `
    //       {
    //         allMarkdownRemark {
    //           edges{
    //             node {
    //               id
    //               html
    //               frontmatter {
    //                 path
    //                 title
    //                 tags
    //               }

    //             }
    //           }
    //         }
    //       }
    //     `,

    //     // Field used as the reference value for each document.
    //     // Default: 'id'.
    //     ref: "id",

    //     // List of keys to index. The values of the keys are taken from the
    //     // normalizer function below.
    //     // Default: all fields
    //     index: ["title", "body"],

    //     // List of keys to store and make available in your UI. The values of
    //     // the keys are taken from the normalizer function below.
    //     // Default: all fields
    //     store: ["id", "path", "title", "body"],

    //     // Function used to map the result from the GraphQL query. This should
    //     // return an array of items to index in the form of flat objects
    //     // containing properties to index. The objects must contain the `ref`
    //     // field above (default: 'id'). This is required.
    //     normalizer: ({ data }) =>
    //       data.allMarkdownRemark.edges.map(post => ({
    //         id: post.node.id,
    //         path: post.node.frontmatter.path,
    //         title: post.node.frontmatter.title,
    //         body: post.node.html,
    //       })),
    //   },
    // },
  ],
}
