import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "gatsby-image"
import "./blogTemplate.css"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <div className="blog-post-container">
        <div style={{ textAlign: `center` }} className="blog-post">
          <h1 style={{ fontSize: `7em` }}>{frontmatter.title}</h1>
          <h2 style={{ fontSize: `1em` }}>{frontmatter.date}</h2>
          <div className="img-container">
            <Image
              fluid={frontmatter.main_image.childImageSharp.fluid}
              alt="Main Image"
            />
          </div>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="img-container">
            <Image
              fluid={frontmatter.ingredients_image.childImageSharp.fluid}
              alt="Ingredients Image"
            />
          </div>
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
`
