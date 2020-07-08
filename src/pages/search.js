import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MainSearch from "../components/Search/MainSearch"

const SearchPage = () => (
  <Layout>
    <SEO title="Search" />
    <MainSearch></MainSearch>
  </Layout>
)

export default SearchPage
