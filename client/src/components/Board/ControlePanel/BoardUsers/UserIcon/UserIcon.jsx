import React from "react"
import PropTypes from "prop-types"
import "./style.sass"

const UserIcon = ({ userId }) => {
  const char = userId[0].toUpperCase()

  return <div className="user-icon">{char}</div>
}

UserIcon.propTypes = {
  userId: PropTypes.string,
}

export default UserIcon
