import React, { useState } from "react"
import PropTypes from "prop-types"
import "./tagsTemplate.css"

//functions
import search from "../util/search"
import lo from "lodash"

// Components
import { graphql } from "gatsby"
import SEO from "../components/seo"
import PostList from "../components/PostList/PostList"
import Layout from "../components/layout"
import TabLink from "../components/CategoriesComponents/TabLink"
import FilterRemover from "../components/CategoriesComponents/FilterRemover"

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
  function handleClearSearchInput() {
    setSearchTerm("")
    setResults(search(""))
  }

  return (
    <Layout>
      <SEO title={tag} description={"All posts tagged with " + tag} />
      <div className="tagged-posts">
        {" "}
        <div className="categories-sidebar">
          <h4 className="categories-title">Categories</h4>
          <ul>
            {group.map(tag => (
              <li key={tag.fieldValue}>
                <TabLink
                  to={`/categories/${lo.kebabCase(tag.fieldValue)}/`}
                  state={{ searchTerm: searchTerm }}
                >
                  {tag.fieldValue} ({tag.totalCount})
                </TabLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="content">
          <div className="title-items">
            <h1 className="tag-header">{tagHeader}</h1>
            <FilterRemover
              searchTerm={searchTerm}
              handleClearSearchInput={handleClearSearchInput}
            ></FilterRemover>
            <input
              className="search-input"
              type="text"
              onKeyDown={event => handleSearchInput(event)}
              placeholder={"Search"}
              aria-label="Search Box"
            />
          </div>
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
