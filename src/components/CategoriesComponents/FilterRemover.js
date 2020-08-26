import React from "react"
import GatsbyImage from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

export default function FilterRemover({ searchTerm, handleClearSearchInput }) {
  const data = useStaticQuery(graphql`
    query {
      cross: allFile(filter: { relativePath: { eq: "cross.png" } }) {
        nodes {
          childImageSharp {
            fixed(width: 15, height: 15) {
              aspectRatio
              base64
              height
              src
              srcSet
              width
            }
          }
        }
      }
    }
  `)
  if (searchTerm !== "" && searchTerm !== undefined) {
    return (
      <div className={"filter-remover"}>
        <li className="btn active">{searchTerm}</li>
        <div
          className="cross-search-wrapper"
          // type="reset"
          onClick={() => handleClearSearchInput()}
          onKeyDown={() => handleClearSearchInput()}
          role="button"
          tabIndex={0}
        >
          <GatsbyImage
            className={"cross-search"}
            fixed={data.cross.nodes[0].childImageSharp.fixed}
            alt="Clear Search Filter"
          ></GatsbyImage>
        </div>
      </div>
    )
  }
  return null
}
