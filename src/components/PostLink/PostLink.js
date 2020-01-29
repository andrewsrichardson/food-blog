import React from "react"
import { Link, navigate } from "gatsby"
import Image from "gatsby-image"
import "./PostLink.css"

const PostLink = ({ post }) => (
  <div className="post-wrapper">
    <div className="title-wrapper">
      <Link className="post-title" to={post.frontmatter.path}>
        {post.frontmatter.title} ({post.frontmatter.date})
      </Link>
    </div>
    <div
      className="image-wrapper"
      onClick={() => navigate(post.frontmatter.path)}
    >
      <div className="image-overlay">
        <Image
          className="main-image"
          fixed={post.frontmatter.main_image.childImageSharp.fixed}
          alt="Main Image"
        />
      </div>
    </div>
  </div>
)

export default PostLink
