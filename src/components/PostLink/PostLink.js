import React from "react"
import { Link, navigate } from "gatsby"
import Image from "gatsby-image"
import "./PostLink.css"

const PostLink = ({ post }) => (
  <div
    className="post-wrapper border"
    onClick={() => navigate(post.frontmatter.path)}
    role="button"
    tabIndex="0"
    onKeyDown={() => navigate(post.frontmatter.path)}
  >
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
        />
      </div>
    </div>
  </div>
)

export default PostLink
