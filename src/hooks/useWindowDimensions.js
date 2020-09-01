import { useState, useEffect } from "react"

function getWindowDimensions() {
  try {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  } catch {
    const width = 0
    const height = 0
    return {
      width,
      height,
    }
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }
    try {
      window.addEventListener("resize", handleResize)
    } catch {
      console.log("no windows allowed")
    }
    return () => {
      try {
        window.removeEventListener("resize", handleResize)
      } catch {
        console.log("no windows allowed")
      }
    }
  }, [])

  return windowDimensions
}
