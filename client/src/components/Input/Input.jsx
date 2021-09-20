import React, { useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./style.sass"

const Input = ({
  editCard = () => null,
  parentId,
  placeholder,
  textRef,
  handleInputChange,
  value,
  componentType,
  handleFocus,
  setIsEdited,
}) => {
  const textareaClassName = classNames([
    "textarea",
    { [`textarea_${componentType}`]: true },
  ])

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        editCard(parentId)
        setIsEdited(false)
      }
      return null
    },
    [setIsEdited, editCard, parentId]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

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
  parentId: PropTypes.string,
  handleInputChange: PropTypes.func,
  editCard: PropTypes.func,
  handleFocus: PropTypes.func,
  setIsEdited: PropTypes.func,
  textRef: PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  value: PropTypes.string,
  componentType: PropTypes.string,
}

export default Input
