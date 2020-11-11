import React from "react"
import { Link } from "gatsby"
import "./Menu.css"

function Menu(props) {
  const ListLink = props => (
    <li className="list-link">
      <Link to={props.to}>{props.children}</Link>
    </li>
  )

  let openMenu = "menu"

  if (props.isOpen) {
    openMenu = "menu open"
  }

  return (
    <div className="menu-wrap">
      <div className={openMenu}>
        <ul>
          <ListLink to="/categories">All Recipes</ListLink>
          <ListLink to="/about">About</ListLink>
          <li className="list-link">
            <a href="mailto:jaina@trustthisfeast.com">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Menu
