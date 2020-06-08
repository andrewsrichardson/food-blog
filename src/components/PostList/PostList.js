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
  const Posts = edges
    .filter(edge => {
      if (
        (edge.node.frontmatter.tags != null) &
        edge.node.frontmatter.tags.includes(props.filter)
      ) {
        return edge
      } else {
        return edge
      }
    }) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return <div className="post-list-wrapper">{Posts}</div>
}
