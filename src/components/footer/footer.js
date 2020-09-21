import React from "react"
import "./footer.css"
import Img from "gatsby-image"
import { graphql, Link, useStaticQuery } from "gatsby"

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
  return (
    <footer className="footer">
      <div className="socials">
        <a
          href="https://www.instagram.com/trustthisfeast/"
          className="grow"
          target="__blank"
        >
          <Img
            fixed={data.instagram.nodes[0].childImageSharp.fixed}
            alt="instagram"
          ></Img>
        </a>
        <a
          href="https://www.facebook.com/TrustThisFeast/"
          target="__blank"
          className="grow"
        >
          <Img
            fixed={data.facebook.nodes[0].childImageSharp.fixed}
            alt="facebook"
          ></Img>
        </a>
        <a
          href="https://twitter.com/TrustThisFeast"
          className="grow"
          target="__blank"
        >
          <Img
            fixed={data.twitter.nodes[0].childImageSharp.fixed}
            alt="twitter"
          ></Img>
        </a>
        <a
          href="mailto:jaina@trustthisfeast.com"
          className="grow"
          target="__blank"
        >
          <Img
            fixed={data.envelope.nodes[0].childImageSharp.fixed}
            alt="email"
          ></Img>
        </a>
      </div>
      <div className="built-by">
        <ul>
          <h3>
            <Link to="/categories">Recipes</Link>
          </h3>
          <h3>
            <Link to="/about">About</Link>
          </h3>
          <h3>
            <Link to="/">Privacy Policy</Link>
          </h3>
        </ul>
        <p>
          © {new Date().getFullYear()}, Built by
          <a href="https://github.com/andrewsrichardson"> Andrew Richardson</a>
        </p>
      </div>
    </footer>
  )
}
