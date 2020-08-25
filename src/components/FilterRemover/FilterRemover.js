import React from "react"
import GatsbyImage from "gatsby-image"

export default function FilterRemover(props) {
  // const [hasSearchTerm, setHasSearchTerm] = useState(false)

  // if (props.searchTerm !== "") {
  //   setHasSearchTerm(true)
  // }
  return (
    <div
    // className={hasSearchTerm ? "filter-remover" : "filter-remover hidden"}
    >
      <li className="btn active">{props.searchTerm}</li>
      <div className="cross-search-wrapper" onClick={props.setSearchTerm("")}>
        <GatsbyImage
          className={"cross-search"}
          fixed={props.cross}
          alt="Clear Search Filter"
        ></GatsbyImage>
      </div>
    </div>
  )
}
