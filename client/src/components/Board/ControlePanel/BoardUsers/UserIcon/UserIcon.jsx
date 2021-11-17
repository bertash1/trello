import React from "react"
import PropTypes from "prop-types"
import "./style.sass"

const UserIcon = ({ email }) => {
  const char = email[0].toUpperCase()
  return <div className="user-icon">{char}</div>
}

UserIcon.propTypes = {
  email: PropTypes.string,
}

export default UserIcon
