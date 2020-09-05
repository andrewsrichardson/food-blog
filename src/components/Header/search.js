import React, { Component } from "react"
import "./search.css"
import { Link } from "gatsby"

// Search component
class Search extends Component {
  state = {
    query: "",
    results: [],
  }

  render() {
    const ResultList = () => {
      if (this.state.results.length > 0) {
        return this.state.results.map((page, i) => {
          return (
            <div className="item-search underline" key={i}>
              <Link href={"/" + page.url}>{page.title}</Link>
            </div>
          )
        })
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
      <div className="search-wrapper nav-link">
        <input
          className="search-input small-input"
          type="text"
          onChange={this.search}
          placeholder={"Search"}
        />
        <div className="search-list">
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
