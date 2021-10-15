import React from "react"
import { useSelector } from "react-redux"

import "./style.sass"

const MemberBar = () => {
  const userEmail = useSelector((state) => state.userData.user.email)
  const letter = userEmail.slice(0, 1).toUpperCase()

  return (
    <div className="member-bar">
      <span className="member-bar__member-letter">{letter}</span>
    </div>
  )
}

export default MemberBar
