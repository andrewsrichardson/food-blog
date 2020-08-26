import React, { useState } from "react"
import "./categories.css"
//functions
import search from "../util/search"
import lo from "lodash"

// Components
import { graphql } from "gatsby"
import SEO from "../components/seo"
import PostList from "../components/PostList/PostList"
import Layout from "../components/layout"
import FilterRemover from "../components/CategoriesComponents/FilterRemover"
import TabLink from "../components/CategoriesComponents/TabLink"

const CategoriesPage = ({ pageContext, data, location }) => {
  const initialSearchTerm = location.state ? location.state.searchTerm : ""

  const [results, setResults] = useState(search(initialSearchTerm))
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  const { tag } = pageContext
  const { group } = data.tagsData

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
            <h1 className="tag-header">All Recipes</h1>
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

export default CategoriesPage

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
