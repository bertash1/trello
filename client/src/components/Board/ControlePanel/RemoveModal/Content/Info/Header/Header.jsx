import React from "react"
import PropTypes from "prop-types"

import "./style.sass"

const Header = ({ email }) => {
  const char = email[0].toUpperCase()
  return (
    <div className="remove-modal__header">
      <div className="header__user-icon">{char}</div>
      <div className="header__user-email">{email}</div>
    </div>
  )
}

Header.propTypes = {
  email: PropTypes.string,
}

export default Header
