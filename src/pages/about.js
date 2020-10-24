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
            I'm Jaina and I have created this little place on the internet to
            document some of my favourite recipes. I love creating hearty
            hella-seasoned food from a variety of cuisines and want to show that
            tasty food doesn’t have to be complicated or effort, it can be
            simple and so so worth it. I've always loved food since I was little
            but at uni, I started to really enjoy cooking and experimenting with
            a heap of cuisines, seasonings and flavours but needed a place to
            document it all so I could share with friends which is exactly why
            Trust This Feast was born.
          </p>
          <p>
            In terms of food, my ethos is tasty grub that can provide a feast
            for yourself, family or friends. Instead of cooking being a chore,
            it can be fun – even at you're laziest, you can conjure up a little
            something and really enjoy that munch. From stacked burgers to
            Mediterranean traybakes to comforting bowls of pasta, I am sure
            something will catch your eye!
          </p>
          <p>
            You’ll find a whole host of delicious recipes on here ranging from
            lazy munches, tasty brunches, simple lunches and big fat feasts
            inspired from cuisines all over the world. I want to provide little
            tips and tricks I’ve learnt along the way too to help make that
            cooking process a tad bit easier for anybody and everybody!
          </p>
          <p>Season it up and don’t forget to #trustthisfeast on the gram.</p>
          <p>Enjoy!!!</p>
        </div>
      </section>
    </Layout>
  )
}
export default AboutPage
