import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
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
              main_image {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const edges = data.allMarkdownRemark.edges
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => (
      <div className="carousel-item-wrapper">
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
        naturalSlideHeight={125}
        totalSlides={3}
        isPlaying={true}
        infinite={true}
      >
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
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    </div>
  )
}
