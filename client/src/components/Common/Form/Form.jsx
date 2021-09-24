import React, { useEffect } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import CloseButton from "../CloseButton/CloseButton"
import ConfirmButton from "../ConfirmButton/ConfirmButton"
import Input from "../Input/Input"
import "./style.sass"

const Form = ({
  handleInputChange = () => null,
  handleSubmit = () => null,
  setNewItem = () => null,
  newItem,
  isEdited,
  setIsEdited = () => null,
  handleClick = () => null,
  type,
}) => {
  const configureTitles = (componentType) => {
    switch (componentType) {
      case "card":
        return {
          placeholder: "Enter card title...",
          cofirmButtonValue: "Add card",
        }
      case "task":
        return {
          placeholder: "Enter a title for this task...",
          cofirmButtonValue: "Add task",
        }
      case "description":
        return {
          placeholder: "Add a more detailed description...",
          cofirmButtonValue: "Save",
        }
      default:
        return {
          placeholder: "Type something...",
          cofirmButtonValue: "Confirm",
        }
    }
  }

  const formClassName = classNames(["add-form", { [`add-form_${type}`]: true }])

  useEffect(() => {
    if (!isEdited) {
      setNewItem("")
    }
  }, [isEdited, setNewItem])

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <Input
        placeholder={configureTitles(type).placeholder}
        handleInputChange={handleInputChange}
        value={newItem}
        componentType={type}
        setIsEdited={setIsEdited}
      />
      <div className="add-form__controls">
        <div className="add-form__btn-wrapper">
          <ConfirmButton value={configureTitles(type).cofirmButtonValue} />
          <CloseButton handleClose={handleClick} />
        </div>
      </div>
    </form>
  )
}

Form.propTypes = {
  isEdited: PropTypes.bool,
  setIsEdited: PropTypes.func,
  handleClick: PropTypes.func,
  setNewItem: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  type: PropTypes.string,
  newItem: PropTypes.string,
}

export default Form
