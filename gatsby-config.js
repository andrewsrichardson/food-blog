module.exports = {
  siteMetadata: {
    title: `Jaina's Food Blog`,
    description: `Cool food here`,
    author: `@andrewsrichardson`,
  },

  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets`,
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
  ],
}
