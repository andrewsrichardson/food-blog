import React from "react"
import { Link, navigate } from "gatsby"
import Image from "gatsby-image"
import "./PostLink.css"
import lo from "lodash"
import parseTime from "../../util/parseTimeToCook"

const PostLink = ({ post }) => {
  function toLink(tag, index) {
    return (
      <Link
        className="post-title grow"
        to={`/categories/${lo.kebabCase(tag)}/`}
        key={index}
      >
        {tag}
      </Link>
    )
  }
  let time = parseTime(post.frontmatter.time)

  const TagList = post.frontmatter.tags.map(toLink)
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
        <Link className="post-title underline" to={"/" + post.frontmatter.path}>
          {post.frontmatter.title}
        </Link>
        <p className="grow post-time">{time}</p>
        <div className="post-categories">{TagList}</div>
      </div>
    </div>
  )
}

export default PostLink
