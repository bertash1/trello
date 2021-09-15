/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react"
import PropTypes from "prop-types"
import "./style.sass"

const Overlay = ({ changeComponentVisibility = () => null }) => (
  <div className="overlay" onClick={() => changeComponentVisibility(false)} />
)

Overlay.propTypes = {
  changeComponentVisibility: PropTypes.func,
}

export default Overlay
