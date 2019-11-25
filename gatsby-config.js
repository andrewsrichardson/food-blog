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
        name: `media`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/static/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/pages/blog`,
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
            options: {
              name: 'media',
            },
          },
          { resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              backgroundColor: `transparent`,
            },
          },
        ]
      }
    },

    
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    'gatsby-plugin-netlify',
  ],
}
