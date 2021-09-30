import React from "react"
import PropTypes from "prop-types"
import "./style.sass"

const Overlay = ({ changeComponentVisibility = () => null }) => (
  <div
    className="overlay"
    role="presentation"
    onClick={() => changeComponentVisibility(false)}
  />
)

Overlay.propTypes = {
  changeComponentVisibility: PropTypes.func,
}

export default Overlay
