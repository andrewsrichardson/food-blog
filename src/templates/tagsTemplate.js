import React, { useState } from "react"
import PropTypes from "prop-types"
import "../pages/categories.css"

//functions
import search from "../util/search"

// Components
import { graphql } from "gatsby"
import SEO from "../components/seo"
import PostList from "../components/PostList/PostList"
import Layout from "../components/layout"
import FilterRemover from "../components/CategoriesComponents/FilterRemover"
import CategoriesSidebar from "../components/CategoriesComponents/CategoriesSidebar"
import CategoriesPicker from "../components/CategoriesComponents/CategoriesPicker"

import useWindowDimensions from "../hooks/useWindowDimensions"

const Tags = ({ pageContext, data, location }) => {
  const initialSearchTerm = location.state ? location.state.searchTerm : ""

  const [results, setResults] = useState(search(initialSearchTerm))
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  const { width } = useWindowDimensions()
  const defaultValue = location.pathname ? location.pathname : ""

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
        {width > 769 ? (
          <CategoriesSidebar group={group} searchTerm={searchTerm} />
        ) : null}
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
            {width < 769 ? (
              <CategoriesPicker
                group={group}
                searchTerm={searchTerm}
                defaultValue={defaultValue}
              />
            ) : null}
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
