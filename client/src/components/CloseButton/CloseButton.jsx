import React from "react"
import PropTypes from "prop-types"
import "./style.sass"

const CloseButton = ({ handleClose }) => (
  <button type="button" onClick={handleClose} className="close" />
)

CloseButton.propTypes = {
  handleClose: PropTypes.func,
}

export default CloseButton
