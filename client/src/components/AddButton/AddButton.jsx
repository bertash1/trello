import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./style.sass"

const AddButton = ({ title, handleClick, buttonType }) => {
  const buttonClassName = classNames([
    "add-btn",
    { [`add-btn_${buttonType}`]: true },
  ])

  const horLineClassName = classNames([
    "add-btn__hor-line",
    { [`add-btn_${buttonType}__hor-line_${buttonType}`]: true },
  ])

  const vertLineClassName = classNames([
    "add-btn__vert-line",
    { [`add-btn_${buttonType}__vert-line_${buttonType}`]: true },
  ])

  const titleClassName = classNames([
    "add-btn__title",
    { [`add-btn_${buttonType}__title_${buttonType}`]: true },
  ])

  return (
    <button className={buttonClassName} type="button" onClick={handleClick}>
      <span className={horLineClassName} />
      <span className={vertLineClassName} />
      <span className={titleClassName}>{title}</span>
    </button>
  )
}

AddButton.propTypes = {
  title: PropTypes.string,
  handleClick: PropTypes.func,
  buttonType: PropTypes.string,
}

export default AddButton
