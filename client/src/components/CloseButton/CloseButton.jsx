import React from "react"
import PropTypes from "prop-types"
import "./style.sass"

const CloseButton = ({ handleClick }) => (
  <button type="button" onClick={handleClick} className="close" />
)

CloseButton.propTypes = {
  handleClick: PropTypes.func,
}

export default CloseButton
