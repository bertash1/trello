import React, { useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./style.sass"
import { changeItem } from "../../actions"

const Input = ({
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
    "input",
    { [`input_${componentType}`]: true },
  ])

  const dispatch = useDispatch()

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        dispatch(changeItem(parentId, value, componentType))
        setIsEdited(false)
      }
      return null
    },
    [setIsEdited, dispatch, value, parentId]
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
  handleFocus: PropTypes.func,
  setIsEdited: PropTypes.func,
  textRef: PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  value: PropTypes.string,
  componentType: PropTypes.string,
}

export default Input
