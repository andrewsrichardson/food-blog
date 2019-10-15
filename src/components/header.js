import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem`}}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Header = ({ siteTitle }) => (

    <div
      style={{
        marginBottom: `0.5rem`,
        maxWidth: `100%`,
        padding: `1.3rem 1.0875rem`,
        outlineStyle: `solid`,
        outlineColor: `grey`,
      }}
    >
        <h1 style={{display: `inline`}}>
          <Link
            to="/"
            style={{
              color: `black`,
              textDecoration: `none`,
            }}>{siteTitle}
          </Link>
        </h1>


        <ul style={{float: `right`}}>
          <ListLink to="page-2">Page 2</ListLink>
          <ListLink to="page-2">Page 2</ListLink>
        </ul>

    </div>

)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
