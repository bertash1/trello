import React from "react"
import PropTypes from "prop-types"
import "./style.sass"

const ModalButton = ({ value, handleClick }) => (
  <button className="modal__button" type="button" onClick={handleClick}>
    {value}
  </button>
)

ModalButton.propTypes = {
  value: PropTypes.string,
  handleClick: PropTypes.func,
}

export default ModalButton
