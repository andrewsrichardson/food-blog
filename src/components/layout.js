import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header/header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          display: `flex`,
          justifyContent: `center`,
        }}
      >
        <div
          style={{
            display: `inline-block`,
            marginTop: `72px`,
            maxWidth: `90%`,
            minWidth: `90%`,
            padding: `0px 1.0875rem 1.45rem`,
          }}
        >
          <main>{children}</main>
          <footer style={{ textAlign: `center` }}>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">
              Gatsby by <a href="https://github.com/andrewsrichardson"></a>{" "}
              Andrew Richardson
            </a>
          </footer>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
