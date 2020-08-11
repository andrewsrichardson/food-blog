import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "gatsby-image"
import "./blogTemplate.css"
import SEO from "../components/seo"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter } = markdownRemark
  const { ingredients, method } = frontmatter

  function toLink(url) {
    if (url != null) return "/categories/" + url.toLowerCase()
    else return "#"
  }

  let ingredientsList = []
  try {
    ingredientsList = ingredients.map((ing, i) => <li key={i}>{ing}</li>)
  } catch (err) {
    console.log("No ingredients for this page")
  }
  let methodList = []
  try {
    methodList = method.map((inst, i) => <li key={i}>{inst}</li>)
  } catch (err) {
    console.log("No method for this page")
  }
  const descriptionRef = React.useRef(null)

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.ingredients_image.childImageSharp.fluid}
        pathname={frontmatter.path}
      />
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
        <div className="description" ref={descriptionRef}>
          <h4>{frontmatter.description}</h4>
        </div>
        <div className="blog-post-content">
          <div className="ingredients">
            <div className="ingredients-img-container">
              <h2>Ingredients</h2>
              <Image
                fluid={frontmatter.ingredients_image.childImageSharp.fluid}
                alt="Ingredients Image"
              ></Image>
              <ul className="ingredients-list">{ingredientsList}</ul>
            </div>
          </div>
          <div className="spacer">
            <div className="page-break"></div>
          </div>
          <div className="method">
            {/* <h3 id="pro-tip">PRO TIP</h3> */}
            <h2>Method</h2>
            <ol>{methodList}</ol>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
        ingredients
        method
        description
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
