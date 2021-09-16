import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./style.sass"

import CloseButton from "../CloseButton/CloseButton"
import ConfirmButton from "../ConfirmButton/ConfirmButton"
import Input from "../Input/Input"

const AddForm = ({
  isEdited,
  setIsEdited,
  handleClick,
  componentType,
  placeholder,
}) => {
  const [newCard, setNewCard] = useState("")
  const textRef = useRef()

  const formClassName = classNames([
    "add-form",
    { [`add-form_${componentType}`]: true },
  ])

  const handleInputChange = (e) => {
    setNewCard(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newCard) {
      setNewCard("")
    } else {
      textRef.current.focus()
    }
  }

  useEffect(() => {
    if (isEdited && !newCard) {
      textRef.current.focus()
    }
    if (!isEdited) {
      setNewCard("")
    }
  }, [isEdited, newCard])

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <Input
        placeholder={placeholder}
        textRef={textRef}
        handleInputChange={handleInputChange}
        value={newCard}
        componentType={componentType}
        setIsEdited={setIsEdited}
      />
      <div className="add-form__controls">
        <div className="add-form__btn-wrapper">
          <ConfirmButton value="Add card" />
          <CloseButton handleClick={handleClick} />
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
  placeholder: PropTypes.string,
}

export default AddForm
