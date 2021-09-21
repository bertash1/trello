import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useDispatch } from "react-redux"

import CloseButton from "../CloseButton/CloseButton"
import ConfirmButton from "../ConfirmButton/ConfirmButton"
import Input from "../Input/Input"
import { postItem } from "../../actions"
import "./style.sass"

const AddForm = ({
  isEdited,
  setIsEdited,
  handleClick,
  componentType,
  placeholder,
  _id,
}) => {
  const [newItem, setNewItem] = useState("")
  const textRef = useRef()
  const dispatch = useDispatch()

  const formClassName = classNames([
    "add-form",
    { [`add-form_${componentType}`]: true },
  ])

  const handleInputChange = (e) => {
    setNewItem(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newItem) {
      dispatch(postItem(newItem, componentType, _id))
      setNewItem("")
    } else {
      textRef.current.focus()
    }
  }

  useEffect(() => {
    if (isEdited && !newItem) {
      textRef.current.focus()
    }
    if (!isEdited) {
      setNewItem("")
    }
  }, [isEdited, newItem])

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <Input
        placeholder={placeholder}
        textRef={textRef}
        handleInputChange={handleInputChange}
        value={newItem}
        componentType={componentType}
        setIsEdited={setIsEdited}
      />
      <div className="add-form__controls">
        <div className="add-form__btn-wrapper">
          <ConfirmButton value="Add card" />
          <CloseButton handleClose={handleClick} />
        </div>
      </div>
    </form>
  )
}

AddForm.propTypes = {
  isEdited: PropTypes.bool,
  setIsEdited: PropTypes.func,
  handleClick: PropTypes.func,
  componentType: PropTypes.string,
  _id: PropTypes.string,
  placeholder: PropTypes.string,
}

export default AddForm
