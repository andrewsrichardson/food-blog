import React, { Component } from "react"
import { navigate } from "gatsby"
import "./MainSearch.css"
// import PostLink from "../PostLink/PostLink.js"

// Search component
class Search extends Component {
  state = {
    query: "",
    results: [],
  }

  render() {
    const ResultList = () => {
      if (this.state.results.length > 0) {
        return this.state.results.map((page, i) => (
          <div
            className="item_search_result pointer"
            key={i}
            onClick={() => {
              console.log(page)
              const path = "/" + page.url
              navigate(path)
            }}
          >
            <h1>{page.title}</h1>
          </div>
        ))
      } else if (this.state.query.length > 2) {
        return "No results for " + this.state.query
      } else if (
        this.state.results.length === 0 &&
        this.state.query.length > 0
      ) {
        return "Please insert at least 3 characters"
      } else {
        return ""
      }
    }

    return (
      <div className="search_container">
        <div className="input_container">
          <input
            className="search_input"
            type="text"
            onChange={this.search}
            placeholder={"Search"}
          />
        </div>
        <div className="search_list">
          <ResultList />
        </div>
      </div>
    )
  }

  getSearchResults(query) {
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

  search = event => {
    const query = event.target.value
    if (this.state.query.length > 2) {
      const results = this.getSearchResults(query)
      this.setState({ results: results, query: query })
    } else {
      this.setState({ results: [], query: query })
    }
  }
}

export default Search
