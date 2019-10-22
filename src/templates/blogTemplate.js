import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
    <div style={{
      outlineStyle:`solid`,
      outlineColor: `red`,
      height:`100vh` }}
      className="blog-post-container">

      <div style={{textAlign: `center`}}className="blog-post">
        <h1 style={{fontSize: `7em`}}>{frontmatter.title}</h1>
        <h2 style={{fontSize: `1em`}} >{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Img
          fluid={frontmatter.main_image}
          alt="Main Image"
          />
        <Img
          fluid={frontmatter.ingredients_image}
          alt="Ingredients Image"
          />
      </div>
    </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        main_image
        ingredients_image
      }
    }
  }
`
