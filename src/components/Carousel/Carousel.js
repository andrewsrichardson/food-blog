import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import "./Carousel.css"
import useWindowDimensions from "../../hooks/useWindowDimensions"

export default function Carousel() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              date
              title
              tags
              path
              description
              main_image {
                childImageSharp {
                  fluid(maxWidth: 2048, maxHeight: 1152, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const { width } = useWindowDimensions()

  let slideHeight = 9
  if (width < 769) {
    slideHeight = 16
  }
  if (width < 400) {
    slideHeight = 19
  }

  function toLink(url) {
    if (url != null) return "/categories/" + url.toLowerCase()
    else return "#"
  }
  const edges = data.allMarkdownRemark.edges
  const Posts = edges.map(edge => (
    <div className="carousel-item-wrapper">
      <div className="carousel-data">
        <h1 id="carousel-title">
          <a href={edge.node.frontmatter.path}>{edge.node.frontmatter.title}</a>
        </h1>
        <div className="tags-list">
          <h3 className="grow">
            <a href={toLink(edge.node.frontmatter.tags[0])}>
              {edge.node.frontmatter.tags[0]}
            </a>
          </h3>
          <h3 className="grow">
            {" "}
            <a href={toLink(edge.node.frontmatter.tags[1])}>
              {edge.node.frontmatter.tags[1]}
            </a>
          </h3>
          <h3 className="grow">
            {" "}
            <a href={toLink(edge.node.frontmatter.tags[2])}>
              {edge.node.frontmatter.tags[2]}
            </a>
          </h3>
          <h4>{edge.node.frontmatter.description}</h4>
        </div>
      </div>
      <Image
        className="carousel-image"
        fluid={edge.node.frontmatter.main_image.childImageSharp.fluid}
        alt="carousel-image"
      />
    </div>
  ))
  return (
    <CarouselProvider
      naturalSlideWidth={16}
      naturalSlideHeight={slideHeight}
      totalSlides={3}
      isPlaying={true}
      infinite={true}
    >
      <DotGroup />
      <Slider className="slider">
        <Slide className="slider-item" index={0}>
          {Posts[0]}
        </Slide>
        <Slide className="slider-item" index={1}>
          {Posts[1]}
        </Slide>
        <Slide className="slider-item" index={2}>
          {Posts[2]}
        </Slide>
      </Slider>
    </CarouselProvider>
  )
}
