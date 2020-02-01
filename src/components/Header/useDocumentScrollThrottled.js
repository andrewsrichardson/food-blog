import { useEffect, useState } from "react"
import { throttle } from "lodash"

function useDocumentScrollThrottled(callback) {
  const [, setScrollPosition] = useState(0)

  function handleDocumentScroll() {
    const { scrollTop: currentScrollTop } =
      document.documentElement || document.body

    setScrollPosition(previousPosition => {
      return currentScrollTop
    })

    callback({ currentScrollTop })
  }

  const handleDocumentScrollThrottled = throttle(handleDocumentScroll, 250)

  useEffect(() => {
    window.addEventListener("scroll", handleDocumentScrollThrottled)

    return () =>
      window.removeEventListener("scroll", handleDocumentScrollThrottled)
  }, [])
}

export default useDocumentScrollThrottled
