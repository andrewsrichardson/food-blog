import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import ToggleMenuButton from "./ToggleMenuButton"
import "./Header.css"
import Menu from "./Menu"
import useDocumentScrollThrottled from "./useDocumentScrollThrottled"
import Img from "gatsby-image"

export default function Header({ siteTitle }) {
  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: allFile(filter: { relativePath: { eq: "logo.png" } }) {
        nodes {
          childImageSharp {
            fixed(width: 100, height: 100) {
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoInHeader, moveLogo] = useState(false)

  // let logoSize = logoInHeader ? "small" : ""
  // if (window.location.pathname !== "/") {
  const logoSize = "small"
  // }

  const MAX_SCROLL = 80
  const TIMEOUT_DELAY = 100

  useDocumentScrollThrottled(callbackData => {
    const { currentScrollTop } = callbackData
    const isScrolledDown = currentScrollTop > MAX_SCROLL
    setTimeout(() => {
      moveLogo(isScrolledDown)
    }, TIMEOUT_DELAY)
  })

  const menuToggleClickHandler = () => {
    setMenuOpen(!menuOpen)
  }
  const logoStyle = {
    color: `black`,
    textDecoration: `none`,
    // fontSize: `3rem`,
  }
  const activeStyle = {
    color: `pink`,
  }

  return (
    <header className="header">
      <nav className="header_navigation">
        <div className={`logo-wrapper  ${logoSize}`}>
          <a href="/">
            <Img
              fixed={data.logo.nodes[0].childImageSharp.fixed}
              alt="instagram"
            ></Img>
          </a>
        </div>
        <div className="spacer"></div>
        <div className="nav-link-wrapper">
          <Link
            className="nav-link underline"
            to="/search"
            activeStyle={{ activeStyle }}
          >
            Search
          </Link>
          <Link
            className="nav-link underline"
            to="/categories"
            activeStyle={{ activeStyle }}
          >
            Categories
          </Link>
          <Link
            className="nav-link underline"
            to="/about"
            activeStyle={{ activeStyle }}
          >
            About
          </Link>
        </div>

        <div className="menu-button">
          <ToggleMenuButton click={menuToggleClickHandler} />
        </div>
      </nav>
      <Menu isOpen={menuOpen} />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
