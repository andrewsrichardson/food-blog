/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)  
// const { createFilePath } = require(`gatsby-source-filesystem`)

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === `MarkdownRemark`) {
//     const slug = createFilePath({ node, getNode, basePath: `pages/blog` }) 
//     createNodeField({
//       node,
//       name: `path`,
//       value: slug,
//     })
//   }
// }

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              main_image
              ingredients_image
              other_images
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // const other = node.frontmatter.other_images.replace("src/", "");

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    let mainImg = node.frontmatter.main_image.replace("src/assets", "images");
    let ingredientsImg = node.frontmatter.ingredients_image.replace("src/assets", "images");
    console.log(mainImg)
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        mainImage: `images/shish-kebab.jpg`,
        ingredients: `images/shish-kebab.jpg`,
        // other: other
      }, // additional data can be passed via context
    })
  })
}