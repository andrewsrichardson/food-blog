import React from "react"
import PostLink from "../components/post-link"
import { useStaticQuery, graphql } from "gatsby"

// const PostList = ({
//   data: {
//     allMarkdownRemark: { edges },
//   },
// }) => {
//   const Posts = edges
//     .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
//     .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
//   return <div>{Posts}</div>
// }
export default () => {
  const data = useStaticQuery(graphql`
    query {allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
    `)
    const edges = data.allMarkdownRemark.edges
    const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

    return (
      <div>{Posts}</div>
    )
}
