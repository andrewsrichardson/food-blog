import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import "./Carousel.css"

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
              main_image {
                childImageSharp {
                  fluid(maxWidth: 1424, maxHeight: 801, quality: 100) {
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
  function toLink(url) {
    if (url != null) return "/categories/" + url.toLowerCase()
    else return "#"
  }
  const edges = data.allMarkdownRemark.edges
  const Posts = edges
    // .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => (
      <div className="carousel-item-wrapper">
        <div className="carousel-data">
          <h1 className="title">
            <a href={edge.node.frontmatter.path}>
              {edge.node.frontmatter.title}
            </a>
          </h1>
          <div className="tags-list">
            <h3>
              <a href={toLink(edge.node.frontmatter.tags[0])}>
                {edge.node.frontmatter.tags[0]}
              </a>
            </h3>
            <h3>
              {" "}
              <a href={toLink(edge.node.frontmatter.tags[1])}>
                {edge.node.frontmatter.tags[1]}
              </a>
            </h3>
            <h3>
              {" "}
              <a href={toLink(edge.node.frontmatter.tags[2])}>
                {edge.node.frontmatter.tags[2]}
              </a>
            </h3>
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
    <div className="carousel-wrapper">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={120}
        totalSlides={3}
        isPlaying={true}
        infinite={true}
        className="border"
      >
        <DotGroup className="border" />
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
    </div>
  )
}
