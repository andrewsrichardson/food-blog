import React from "react"
import "./CategoriesSidebar.css"
import TabLink from "./TabLink"
import lo from "lodash"

export default function CategoriesSidebar(props) {
  return (
    <div className="categories-sidebar">
      <h4 className="categories-title">Categories</h4>
      <ul>
        {props.group.map(tag => (
          <li key={tag.fieldValue}>
            <TabLink
              to={`/categories/${lo.kebabCase(tag.fieldValue)}/`}
              state={{ searchTerm: props.searchTerm }}
            >
              {tag.fieldValue} ({tag.totalCount})
            </TabLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
