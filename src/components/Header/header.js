import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, {useState} from "react"
import ToggleMenuButton from "./ToggleMenuButton"
import "./Header.css"
import Menu from "./Menu"

function Header ({ siteTitle }){

  const [menuOpen , setMenuOpen] = useState(true);

  const menuToggleClickHandler = () => {
    setMenuOpen(!menuOpen)
  }
  
  let menu;
  if (menuOpen) {
    menu = <Menu isOpen={true}/>
  }
  return(
    <header className="header">
      <nav className="header_navigation">
        <h1 className="logo">
          <Link
            to="/"
            style={{
              color: `black`,
              textDecoration: `none`,
              fontSize: `3rem`,
            }}>{siteTitle}
          </Link>
        </h1>

        <div className= "spacer"></div>

        <div className= "menu-button">
          <ToggleMenuButton click={menuToggleClickHandler}/>
        </div>        
      </nav>
      <div className="menu">
          {menu}
        </div>
    </header>
  )
};


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
