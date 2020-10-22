/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const lo = require("lodash")

const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)
  const tagsTemplate = path.resolve(`src/templates/tagsTemplate.js`)

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              tags
              main_image {
                childImageSharp {
                  fluid {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                  }
                }
              }
              ingredients_image {
                childImageSharp {
                  fluid {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  // timeGroup: allMarkdownRemark(limit: 2000) {
  //   group(field: frontmatter___time) {
  //     fieldValue
  //   }
  // }
  // typeGroup: allMarkdownRemark(limit: 2000) {
  //   group(field: frontmatter___type) {
  //     fieldValue
  //   }
  // }

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.postsRemark.edges

  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        slug: node.frontmatter.path,
      }, // additional data can be passed via context
    })
  })

  const tags = result.data.tagsGroup.group
  tags.forEach(tag => {
    createPage({
      path: `/categories/${lo.kebabCase(tag.fieldValue)}/`,
      component: tagsTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  // const times = result.data.timeGroup.group
  // times.forEach(tag => {
  //   createPage({
  //     path: `/categories/time=${lo.kebabCase(toString(tag.fieldValue))}/`,
  //     component: tagsTemplate,
  //     context: {
  //       time: time.fieldValue,
  //     },
  //   })
  // })

  // const type = result.data.typeGroup.group
  // type.forEach(tag => {
  //   createPage({
  //     path: `/categories/type=${lo.kebabCase(toString(tag.fieldValue))}/`,
  //     component: tagsTemplate,
  //     context: {
  //       time: time.fieldValue,
  //     },
  //   })
  // })

  createPage({
    path: `/categories/`,
    component: tagsTemplate,
    context: {},
  })
}
