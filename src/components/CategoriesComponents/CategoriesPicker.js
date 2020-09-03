import React, { useState, useEffect } from "react"
import Select from "react-select"
import { navigate } from "gatsby"
import lo from "lodash"

export default function CategoriesPicker(props) {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#c19997" : "white",
      backgroundColor: state.isSelected ? "#f69d65" : "white",
    }),
    control: (base, state) => ({
      ...base,
      "&:hover": { borderColor: "#f69d65" }, // border style on hover
      border: "1px solid lightgray", // default border color
      boxShadow: "none", // no box-shadow
    }),
  }

  const [selectedOption, setSelectedOption] = useState("All")

  useEffect(() => {
    let defaultValue = props.currentPage
      .replace("/categories/", "")
      .replace("/", "")
    defaultValue = defaultValue.charAt(0).toUpperCase() + defaultValue.slice(1)
    if (defaultValue == "") defaultValue = "All"
    setSelectedOption({ value: defaultValue, label: defaultValue })
    return () => {}
  }, [])

  const options = props.group.map(tag => {
    const label =
      tag.fieldValue.charAt(0).toUpperCase() + tag.fieldValue.slice(1)
    return { value: tag.fieldValue, label: label }
  })
  options.unshift({ value: "All", label: "All" })

  const handleChange = selectedOption => {
    if (selectedOption.value == "All") {
      navigate(`/categories/`, {
        state: { searchTerm: props.searchTerm },
      })
    } else {
      navigate(`/categories/${lo.kebabCase(selectedOption.value)}/`, {
        state: { searchTerm: props.searchTerm },
      })
    }
    // setSelectedOption(`/categories/${lo.kebabCase(selectedOption.value)}/`)
  }

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      className="categories-picker"
      styles={customStyles}
    />
  )
}
