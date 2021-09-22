import React, { useEffect, useRef, useCallback } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./style.sass"

const Input = ({
  setIsEdited = () => null,
  placeholder,
  handleInputChange = () => null,
  value,
  componentType,
}) => {
  const textRef = useRef()

  const textareaClassName = classNames([
    "input",
    { [`input_${componentType}`]: true },
  ])

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 27 && value) {
        setIsEdited(false)
      } else if (e.keyCode === 27) {
        setIsEdited(false)
      }
      return null
    },
    [setIsEdited, value]
  )

  const handleFocus = (e) => {
    e.target.select()
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    textRef.current.focus()

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <input
      className={textareaClassName}
      type="text"
      placeholder={placeholder}
      ref={textRef}
      onChange={handleInputChange}
      value={value}
      onFocus={handleFocus}
    />
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  handleInputChange: PropTypes.func,
  setIsEdited: PropTypes.func,
  textRef: PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  value: PropTypes.string,
  componentType: PropTypes.string,
}

export default Input
