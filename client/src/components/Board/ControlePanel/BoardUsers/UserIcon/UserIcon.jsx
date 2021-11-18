import React, { useState } from "react"
import PropTypes from "prop-types"

import RemoveModal from "../../RemoveModal/RemoveModal"
import "./style.sass"

const UserIcon = ({ email }) => {
  const [isModalShown, setIsModalShown] = useState(false)

  const handleIconClick = () => {
    setIsModalShown((prev) => !prev)
  }

  return (
    <>
      <div className="user-icon" onClick={handleIconClick} role="none">
        {email ? email[0].toUpperCase() : ""}
      </div>
      {isModalShown && (
        <RemoveModal email={email} handleIconClick={handleIconClick} />
      )}
    </>
  )
}

UserIcon.propTypes = {
  email: PropTypes.string,
}

export default UserIcon
