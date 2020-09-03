import React, { useState } from "react"
import Select from "react-select"
import { navigate } from "gatsby"
import lo from "lodash"

export default function CategoriesPicker(props) {
  const [selectedOption, setSelectedOption] = useState("")

  const options = props.group.map(tag => {
    const label =
      tag.fieldValue.charAt(0).toUpperCase() + tag.fieldValue.slice(1)
    return { value: tag.fieldValue, label: label }
  })

  const handleChange = selectedOption => {
    if (selectedOption == null) {
      navigate(`/categories/`, {
        state: { searchTerm: props.searchTerm },
      })
      setSelectedOption("")
    }
    navigate(`/categories/${lo.kebabCase(selectedOption.value)}/`, {
      state: { searchTerm: props.searchTerm },
    })
    setSelectedOption(`/categories/${lo.kebabCase(selectedOption.value)}/`)
  }

  return (
    <Select
      defaultValue={selectedOption}
      onChange={handleChange}
      options={options}
      className="categories-picker"
      isClearable={true}
    />
  )
}
