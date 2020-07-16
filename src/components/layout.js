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
            width: `100%`,
            minHeight: `750px `,
            padding: `0px 0rem 0rem`,
          }}
        >
          <main className="main">{children}</main>
          <footer className="footer">
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
