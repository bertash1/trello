import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./style.sass"

const AddButton = ({ handleClick = () => null, type }) => {
  const buttonTitle = type === "card" ? "Add another card" : "Add a task"

  const buttonClassName = classNames(["add-btn", { [`add-btn_${type}`]: true }])

  const plusClassName = classNames([
    "add-btn__plus",
    { [`add-btn__plus_${type}`]: true },
  ])

  const titleClassName = classNames([
    "add-btn__title",
    { [`add-btn_${type}__title_${type}`]: true },
  ])

  return (
    <button className={buttonClassName} type="button" onClick={handleClick}>
      <span className={plusClassName}>+</span>
      <span className={titleClassName}>{buttonTitle}</span>
    </button>
  )
}

AddButton.propTypes = {
  handleClick: PropTypes.func,
  type: PropTypes.string,
}

export default AddButton
