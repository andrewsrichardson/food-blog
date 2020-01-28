import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import "./postlink.css"

const PostLink = ({ post }) => (
  <div className="post">
    <div className="title-wrapper">
      <Link className="post-title" to={post.frontmatter.path}>
        {post.frontmatter.title} ({post.frontmatter.date})
      </Link>
    </div>
    <div className="image-wrapper">
      <div className="image-overlay">
        <Image
          className="main-image"
          fluid={post.frontmatter.main_image.childImageSharp.fluid}
          alt="Main Image"
          style={
            {
              // position: `absolute`,
            }
          }
        />
      </div>
    </div>
  </div>
)

export default PostLink
