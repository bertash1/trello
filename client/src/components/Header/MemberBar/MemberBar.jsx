import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

import "./style.sass"

const MemberBar = ({ handleShowMenu }) => {
  const userData = useSelector((state) => state.userData)
  const letter = userData ? userData.email.slice(0, 1).toUpperCase() : " "

  return (
    <div className="member-bar" onClick={handleShowMenu} role="none">
      <span className="member-bar__member-letter">{letter}</span>
    </div>
  )
}

MemberBar.propTypes = {
  handleShowMenu: PropTypes.func,
}

export default MemberBar
