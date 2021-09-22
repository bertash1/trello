import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import "./style.sass"

const Options = ({ handleShowMenu = () => null }) => (
  <button className="options" type="button" onClick={handleShowMenu}>
    <FontAwesomeIcon className="dots" icon={faEllipsisH} />
  </button>
)

Options.propTypes = {
  handleShowMenu: PropTypes.func,
}

export default Options
