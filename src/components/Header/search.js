import React, { useState } from "react"
import "./search.css"
import { Link } from "gatsby"

// Search component
function Search(props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  let displayList = props.isSearchOpen ? "" : "none"

  function getSearchResults(query) {
    var index = window.__FLEXSEARCH__.en.index
    var store = window.__FLEXSEARCH__.en.store
    if (!query || !index) {
      return []
    } else {
      var results = []
      Object.keys(index).forEach(idx => {
        results.push(...index[idx].values.search(query))
      })

      results = Array.from(new Set(results))

      var nodes = store
        .filter(node => (results.includes(node.id) ? node : null))
        .map(node => node.node)

      return nodes
    }
  }

  function handleSearch(event) {
    const query = event.target.value
    if (query.length > 2) {
      const results = getSearchResults(query)
      setResults(results)
      setQuery(query)
    } else {
      setResults([])
      setQuery(query)
    }
  }

  function ResultList() {
    if (results.length > 0) {
      return results.map((page, i) => {
        return (
          <div className="item-search underline" key={i}>
            <Link to={"/" + page.url}>{page.title}</Link>
          </div>
        )
      })
    } else if (query.length > 2) {
      return "No results for " + query
    } else if (results.length === 0 && query.length > 0) {
      return "Please insert at least 3 characters"
    } else {
      return ""
    }
  }

  return (
    <>
      <div className="search-wrapper">
        <input
          className="main-search"
          type="text"
          onChange={e => handleSearch(e)}
          placeholder={"Search"}
        />
      </div>
      <div className="search-list" style={{ display: `${displayList}` }}>
        <ResultList />
      </div>
    </>
  )
}
export default Search
