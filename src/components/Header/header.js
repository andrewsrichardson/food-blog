import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import ToggleMenuButton from "./ToggleMenuButton"
import "./Header.css"
import Menu from "./Menu"

function Header({ siteTitle }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuToggleClickHandler = () => {
    setMenuOpen(!menuOpen)
  }
  const logoStyle = {
    color: `black`,
    textDecoration: `none`,
    fontSize: `3rem`,
  }
  const activeStyle = {
    color: `pink`,
  }

  return (
    <header className="header">
      <nav className="header_navigation">
        <h1 className="logo">
          <Link to="/" style={logoStyle}>
            {siteTitle}
          </Link>
        </h1>

        <div className="spacer"></div>
        <div className="nav-links">
          <Link
            to="/categories"
            style={{
              color: `black`,
              textDecoration: `none`,
              fontSize: `2rem`,
            }}
            activeStyle={{ activeStyle }}
          >
            Categories
          </Link>
          <Link
            to="/about"
            style={{
              color: `black`,
              textDecoration: `none`,
              fontSize: `2rem`,
            }}
            activeStyle={{ activeStyle }}
          >
            About
          </Link>
          <Link
            to="/contact"
            style={{
              color: `black`,
              textDecoration: `none`,
              fontSize: `2rem`,
            }}
            activeStyle={{ activeStyle }}
          >
            Contact
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

export default Header
