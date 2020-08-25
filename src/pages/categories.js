import React, { useState } from "react"
import PropTypes from "prop-types"
import "./categories.css"

import search from "../util/search"
import lo from "lodash"

// Components
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import PostList from "../components/PostList/PostList"
import Layout from "../components/layout"
import CategoriesList from "../components/CategoriesList/CategoriesList"
import GatsbyImage from "gatsby-image"

const CategoriesPage = ({ pageContext, data, location }) => {
  const initialSearchTerm = location.state ? location.state.searchTerm : ""

  const [results, setResults] = useState(search(initialSearchTerm))
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  const { tag } = pageContext
  const { totalCount } = data.postData
  const { group } = data.tagsData
  const { cross } = data

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

  function FilterRemover() {
    const [hasSearch, setHasSearch] = useState(false)
    console.log(searchTerm)

    if (searchTerm !== "") {
      return (
        <div className={hasSearch ? "filter-remover" : "filter-remover"}>
          <li className="btn active">{searchTerm}</li>
          <div
            className="cross-search-wrapper"
            // type="reset"
            onClick={() => handleClearSearchInput()}
          >
            <GatsbyImage
              className={"cross-search"}
              fixed={cross.nodes[0].childImageSharp.fixed}
              alt="Clear Search Filter"
            ></GatsbyImage>
          </div>
        </div>
      )
    }
    return null
  }

  function TabLink(props) {
    const [isActive, setIsActive] = useState(false)
    return (
      <div>
        <Link
          {...props}
          getProps={({ isCurrent }) => {
            setIsActive(isCurrent)
            console.log(isActive)
            return {
              className: isCurrent ? "btn grow active" : "btn grow",
            }
          }}
        />
        <Link
          to={"/categories"}
          className={isActive ? "cross" : "cross hidden"}
        >
          <GatsbyImage
            fixed={cross.nodes[0].childImageSharp.fixed}
            alt="Clear Category"
          ></GatsbyImage>
        </Link>
      </div>
    )
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
            <FilterRemover searchTerm={searchTerm}></FilterRemover>
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
    cross: allFile(filter: { relativePath: { eq: "cross.png" } }) {
      nodes {
        childImageSharp {
          fixed(width: 15, height: 15) {
            aspectRatio
            base64
            height
            src
            srcSet
            width
          }
        }
      }
    }
  }
`
