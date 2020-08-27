import React from "react"
import { Link, navigate } from "gatsby"
import Image from "gatsby-image"
import "./PostLink.css"
import lo from "lodash"

const PostLink = ({ post }) => {
  function toLink(tag) {
    return (
      <Link
        className="post-title grow"
        to={`/categories/${lo.kebabCase(tag)}/`}
      >
        {tag}
      </Link>
    )
  }

  const TagList = post.frontmatter.tags.map(toLink)

  console.log(TagList)
  return (
    <div className="post-wrapper border">
      <div
        className="image-wrapper"
        onClick={() => navigate("../../" + post.frontmatter.path)}
        role="button"
        tabIndex="0"
        onKeyDown={() => navigate(post.frontmatter.path)}
      >
        <div className="image-overlay">
          <Image
            className="main-image"
            fluid={post.frontmatter.main_image.childImageSharp.fluid}
            alt="Main Image"
          />
        </div>
      </div>
      <div className="title-wrapper">
        <Link className="post-title grow" to={post.frontmatter.path}>
          {post.frontmatter.title}
        </Link>
        <div className="post-categories">{TagList}</div>
      </div>
    </div>
  )
}

export default PostLink
