import GatsbyImage from "gatsby-image"
import React from "react"
import "./ToggleMenuButton.css"
import { graphql, useStaticQuery } from "gatsby"

function ToggleMenuButton(props) {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      menu: allFile(filter: { relativePath: { eq: "ellipsis.png" } }) {
        nodes {
          childImageSharp {
            fixed(width: 37, height: 9) {
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

  return (
    <button className="toggle-button" onClick={props.click}>
      <GatsbyImage fixed={data.menu.nodes[0].childImageSharp.fixed} />
    </button>
  )
}

export default ToggleMenuButton
