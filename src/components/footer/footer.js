import React from "react"
import "./footer.css"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

export default function Footer() {
  const data = useStaticQuery(graphql`
    query MyQuery {
      envelope: allFile(filter: { relativePath: { eq: "envelope-line.png" } }) {
        nodes {
          childImageSharp {
            fixed(width: 50, height: 50) {
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
      instagram: allFile(
        filter: { relativePath: { eq: "instagram-round-line.png" } }
      ) {
        nodes {
          childImageSharp {
            fixed(width: 50, height: 50) {
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
      facebook: allFile(
        filter: { relativePath: { eq: "facebook-round-line.png" } }
      ) {
        nodes {
          childImageSharp {
            fixed(width: 50, height: 50) {
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
      twitter: allFile(
        filter: { relativePath: { eq: "twitter-round-line.png" } }
      ) {
        nodes {
          childImageSharp {
            fixed(width: 50, height: 50) {
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
  console.log(data)
  return (
    <footer className="footer">
      <div className="socials">
        <a href="https://www.instagram.com/trustthisfeast/" className="grow">
          <Img
            fixed={data.instagram.nodes[0].childImageSharp.fixed}
            alt="instagram"
          ></Img>
        </a>
        <a href="https://www.facebook.com/TrustThisFeast/" className="grow">
          <Img
            fixed={data.facebook.nodes[0].childImageSharp.fixed}
            alt="facebook"
          ></Img>
        </a>
        <a href="https://twitter.com/TrustThisFeast" className="grow">
          <Img
            fixed={data.twitter.nodes[0].childImageSharp.fixed}
            alt="twitter"
          ></Img>
        </a>
        <a href="mailto:jaina@trustthisfeast.com" className="grow">
          <Img
            fixed={data.envelope.nodes[0].childImageSharp.fixed}
            alt="email"
          ></Img>
        </a>
      </div>
      <div className="built-by">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        {` by `}
        <a href="https://github.com/andrewsrichardson"> Andrew Richardson</a>
      </div>
    </footer>
  )
}
