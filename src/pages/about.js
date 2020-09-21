import GatsbyImage from "gatsby-image"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"
import { graphql, useStaticQuery } from "gatsby"

function AboutPage() {
  const data = useStaticQuery(graphql`
    query {
      profile: allFile(filter: { relativePath: { eq: "profile-pic.jpg" } }) {
        nodes {
          childImageSharp {
            fluid {
              aspectRatio
              base64
              src
              srcSet
            }
          }
        }
      }
    }
  `)
  console.log(data)
  return (
    <Layout>
      <SEO title="About" />
      <section className="about">
        <div>
          <GatsbyImage
            fluid={data.profile.nodes[0].childImageSharp.fluid}
            alt="profile"
          ></GatsbyImage>
        </div>

        <div className="about-content">
          <p>Hey there and welcome to Trust This Feast.</p>
          <p>
            My name is Jaina and I have created this little place on the
            internet to document some of my favourite recipes. I love creating
            hearty hella-seasoned food from a variety of cuisines and want to
            show that tasty food doesn’t have to be complicated or effort, it
            can be simple and most importantly, bloody worth it. During my time
            at uni, I started to really enjoy cooking and experimenting with
            different cuisines and flavours but needed a place to document these
            random recipes so I can share them around my friends which is
            exactly why Trust This Feast was born!
          </p>
          <p>
            In terms of food, my ethos is tasty grub that can provide a feast
            for yourself, family or friends. Instead of cooking being a chore,
            it can be fun – even at you’re laziest, you can conjure up a little
            something something and really enjoy that feast. From stacked
            burgers to Mediterranean traybakes to comforting bowls of pasta, I
            am sure something will catch your eye.
          </p>
          <p>
            You’ll find a host of delish recipes on here ranging from lazy
            munches, tasty brunches, simple lunches and big fat feasts inspired
            from cuisines all over the world. I want to provide little tips and
            tricks I’ve learnt along the way too to help the cooking process a
            tad bit easier for anyone!
          </p>
          <p>Season it up and don’t forget to #trustthisfeast on the gram.</p>
          <p>Enjoy!!!</p>
        </div>
      </section>
    </Layout>
  )
}
export default AboutPage
