import { useEffect, useState } from "react"
import ReactDOM from "react-dom"

const Portal = ({ children }) => {
  const [container] = useState(document.createElement("div"))

  useEffect(() => {
    document.body.append(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [container])

  return ReactDOM.createPortal(children, container)
}

export default Portal
