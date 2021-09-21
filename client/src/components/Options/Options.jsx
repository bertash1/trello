import React from "react"
import PropTypes from "prop-types"
import "./style.sass"

const Options = ({ handleShowMenu }) => (
  <button className="options" type="button" onClick={handleShowMenu}>
    <span className="options__dots-wrapper">
      <span className="options__dot" />
      <span className="options__dot" />
      <span className="options__dot" />
    </span>
  </button>
)

Options.propTypes = {
  handleShowMenu: PropTypes.func,
}

export default Options
