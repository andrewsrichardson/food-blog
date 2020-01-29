import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList/PostList"
import Carousel from "../components/Carousel/Carousel"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Carousel />
    <PostList />
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
