import React, { useState } from "react"
import PropTypes from "prop-types"
import "./tagsTemplate.css"

import search from "../util/search"
import lo from "lodash"

// Components
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import PostList from "../components/PostList/PostList"
import Layout from "../components/layout"

const Tags = ({ pageContext, data, location }) => {
  const initialSearchTerm = location.state ? location.state.searchTerm : ""

  const [results, setResults] = useState(search(initialSearchTerm))
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  const { tag } = pageContext
  const { totalCount } = data.postData
  const { group } = data.tagsData

  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  function handleSearchInput(event) {
    if (event.key === "Enter") {
      setSearchTerm(event.target.value)
      setResults(search(event.target.value))
    }
  }

  return (
    <Layout>
      <SEO title={tag} description={"All posts tagged with " + tag} />
      <div className="tagged-posts">
        {" "}
        <div className="categories-sidebar">
          <h1>Categories</h1>

          <ul>
            {group.map(tag => (
              <li key={tag.fieldValue}>
                <Link
                  to={`/categories/${lo.kebabCase(tag.fieldValue)}/`}
                  state={{ searchTerm: searchTerm }}
                >
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="content">
          <h1>{tagHeader}</h1>
          <input
            className="search_input"
            type="text"
            onKeyDown={event => handleSearchInput(event)}
            placeholder={"Search"}
            aria-label="Search Box"
            defaultValue={initialSearchTerm}
          />
          <PostList tagFilter={tag} searchFilter={results} />
        </div>
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
    postData: allMarkdownRemark(
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
    tagsData: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
