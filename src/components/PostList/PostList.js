import React from "react"
import PostLink from "../PostLink/PostLink"
import { useStaticQuery, graphql } from "gatsby"
import "./PostList.css"

export default props => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              path
              tags
              time
              main_image {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
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
    }
  `)

  const edges = data.allMarkdownRemark.edges
  const Posts = edges.filter(edge => {
    if (
      (edge.node.frontmatter.tags != null) &
      edge.node.frontmatter.tags.includes(props.tagFilter)
    ) {
      return edge
    } else if (props.tagFilter == null) {
      return edge
    }
  }) // You can filter your posts based on some criteria

  const filteredPosts = Posts.filter(edge => {
    if (props.searchFilter !== undefined) {
      let result = null
      for (var i = 0; i < props.searchFilter.length; ++i) {
        if (edge.node.frontmatter.title === props.searchFilter[i].title) {
          result = edge
        }
        if (result != null) {
          break
        }
      }
      if (props.searchFilter.length === 0) {
        result = edge
      }

      if (result != null) {
        return result
      }
    } else return edge
  }).map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return <div className="post-list-wrapper">{filteredPosts}</div>
}
