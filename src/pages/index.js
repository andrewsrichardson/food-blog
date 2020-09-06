import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList/PostList"
import Carousel from "../components/Carousel/Carousel"
import "./index.css"
import { navigate } from "gatsby"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Carousel />
    <section className="description">
      <h2>🍜Hearty hella-seasoned food</h2>
      <h2>🌮Lazy munches, tasty brunches, simple lunches and big fat feasts</h2>
      <h2>♥️ Uncomplicated and so worth it #TrustThisFeast</h2>
      <button
        className="bubbly-button"
        onClick={() => {
          navigate("/categories")
        }}
      >
        All Recipes
      </button>
    </section>
    <PostList searchFilter={""} />
  </Layout>
)

export default IndexPage
