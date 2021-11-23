import React, { useState } from "react"
import PropTypes from "prop-types"

import CloseButton from "src/components/Common/CloseButton/CloseButton"
import Info from "./Info/Info"
import Confirmation from "./Confirmation/Confirmation"
import "./style.sass"

const Content = ({ email, userId, handleIconClick }) => {
  const [modalContent, setModalContent] = useState("info")

  return (
    <div className="remove-modal">
      {modalContent === "info" ? (
        <Info email={email} setModalContent={setModalContent} />
      ) : (
        <Confirmation
          userId={userId}
          setModalContent={setModalContent}
          handleIconClick={handleIconClick}
        />
      )}
      <div className="invite-modal__close">
        <CloseButton handleClose={handleIconClick} />
      </div>
    </div>
  )
}

Content.propTypes = {
  email: PropTypes.string,
  userId: PropTypes.string,
  handleIconClick: PropTypes.func,
}

export default Content
