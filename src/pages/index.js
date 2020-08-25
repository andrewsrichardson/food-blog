import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList/PostList"
import Carousel from "../components/Carousel/Carousel"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Carousel />
    <PostList searchFilter={""} />
  </Layout>
)

export default IndexPage
