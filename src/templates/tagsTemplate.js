import React, { useState } from "react"
import PropTypes from "prop-types"
import "./tagsTemplate.css"

import search from "../util/search"

// Components
import { graphql } from "gatsby"
import SEO from "../components/seo"
import PostList from "../components/PostList/PostList"
import Layout from "../components/layout"

const Tags = ({ pageContext, data }) => {
  const [results, setResults] = useState([])

  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  function handleSearchInput(event) {
    if (event.key === "Enter") {
      const searchTerm = event.target.value
      setResults(search(searchTerm))
    }
  }

  return (
    <Layout>
      <SEO title={tag} description={"All posts tagged with " + tag} />
      <div className="tagged-posts">
        {" "}
        <h1>{tagHeader}</h1>
        <input
          className="search_input"
          type="text"
          onKeyDown={event => handleSearchInput(event)}
          placeholder={"Search"}
          aria-label="Search Box"
        />
        <PostList tagFilter={tag} searchFilter={results} />
      </div>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Tags
export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`
