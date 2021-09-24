import React from "react"
import PropTypes from "prop-types"
import "./style.sass"

const CloseButton = ({ handleClose = () => null }) => (
  <button type="button" onClick={handleClose} className="close">
    <span className="close__icon">+</span>
  </button>
)

CloseButton.propTypes = {
  handleClose: PropTypes.func,
}

export default CloseButton
