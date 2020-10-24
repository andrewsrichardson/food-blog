import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import ToggleMenuButton from "./ToggleMenuButton"
import "./Header.css"
import Menu from "./Menu"
import Img from "gatsby-image"
import Search from "./search"

export default function Header() {
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
      search: allFile(filter: { relativePath: { eq: "search.png" } }) {
        nodes {
          childImageSharp {
            fixed(width: 25, height: 25) {
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
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  let searchClass = isSearchOpen ? " search-open" : ""

  const logoSize = "small"

  const menuToggleClickHandler = () => {
    setMenuOpen(!menuOpen)
  }

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }
  return (
    <>
      <header className="header">
        <div className={"search-bar-header" + searchClass}>
          <Search isSearchOpen={isSearchOpen} />
        </div>
        <nav className="header_navigation">
          <div className={`logo-wrapper  ${logoSize}`}>
            <a href="/">
              <Img
                fixed={data.logo.nodes[0].childImageSharp.fixed}
                alt="logo"
                imgStyle={{ objectFit: "contain" }}
              ></Img>
            </a>
          </div>
          <div className="spacer"></div>
          <div className="nav-link-wrapper">
            <Link className="nav-link underline" to="/categories">
              Recipes
            </Link>
            <Link className="nav-link underline" to="/about">
              About
            </Link>
            <div
              role="button"
              className="nav-link search-button"
              onClick={() => handleSearch()}
            >
              <Img
                fixed={data.search.nodes[0].childImageSharp.fixed}
                alt="search"
              />
            </div>
          </div>
          <div className="menu-button">
            <ToggleMenuButton click={menuToggleClickHandler} />
          </div>
        </nav>
        <Menu isOpen={menuOpen} />
      </header>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
