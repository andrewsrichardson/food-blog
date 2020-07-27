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
  function toLink(url) {
    if (url != null) return "/categories/" + url.toLowerCase()
    else return "#"
  }

  return (
    <Layout>
      <div className="blog-post">
        <div className="title-container">
          <div className="title-data">
            <h1 className="title">{frontmatter.title}</h1>
            <h2 className="date">{frontmatter.date}</h2>
            <div className="tag-links">
              <h3>
                <a className="grow" href={toLink(frontmatter.tags[0])}>
                  {frontmatter.tags[0]}
                </a>
              </h3>
              <h3>
                {" "}
                <a className="grow" href={toLink(frontmatter.tags[1])}>
                  {frontmatter.tags[1]}
                </a>
              </h3>
              <h3>
                {" "}
                <a className="grow" href={toLink(frontmatter.tags[2])}>
                  {frontmatter.tags[2]}
                </a>
              </h3>
            </div>
          </div>
          <Image
            fluid={frontmatter.main_image.childImageSharp.fluid}
            alt="Main Image"
          />
        </div>
        <div className="blog-post-content">
          <div className="ingredients">
            <div className="ingredients-img-container">
              <h2>Ingredients</h2>
              <Image
                fluid={frontmatter.ingredients_image.childImageSharp.fluid}
                alt="Ingredients Image"
              ></Image>
            </div>
          </div>
          <div className="spacer">
            <div className="page-break"></div>
          </div>
          <div className="method">
            <h2>Method</h2>
            <p dangerouslySetInnerHTML={{ __html: html }}></p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        main_image {
          childImageSharp {
            fluid(maxWidth: 1424, maxHeight: 801, quality: 100) {
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
`
