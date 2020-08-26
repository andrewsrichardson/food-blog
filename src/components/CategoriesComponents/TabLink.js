import React, { useState } from "react"
import GatsbyImage from "gatsby-image"
import { useStaticQuery, graphql, Link } from "gatsby"

export default function TabLink(props) {
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
  const [isActive, setIsActive] = useState(false)
  return (
    <div>
      <Link
        {...props}
        getProps={({ isCurrent }) => {
          setIsActive(isCurrent)
          console.log(isActive)
          return {
            className: isCurrent ? "btn grow active" : "btn grow",
          }
        }}
      />
      <Link to={"/categories"} className={isActive ? "cross" : "cross hidden"}>
        <GatsbyImage
          fixed={data.cross.nodes[0].childImageSharp.fixed}
          alt="Clear Category"
        ></GatsbyImage>
      </Link>
    </div>
  )
}
