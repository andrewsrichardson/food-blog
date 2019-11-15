import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "gatsby-image"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {

  const { markdownRemark, main, ingredients } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  console.log(main)

  return (
    <Layout>
    <div className="blog-post-container">

      <div style={{textAlign: `center`}}className="blog-post">
        <h1 style={{fontSize: `7em`}}>{frontmatter.title}</h1>
        <h2 style={{fontSize: `1em`}} >{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Image
          fluid={main.childImageSharp.fluid}
          alt="Main Image"
          />
        <Image
          fluid={ingredients.childImageSharp.fluid}
          alt="Ingredients Image"
          />
      </div>
    </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!, $mainImage: String!, $ingredients: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
    main: file(relativePath: {eq: $mainImage}) {
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
    ingredients: file(relativePath: {eq: $ingredients}) {
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
  }`

