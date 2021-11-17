import React, { useState } from "react"
import PropTypes from "prop-types"

import CloseButton from "../../../../Common/CloseButton/CloseButton"
import Info from "./Info/Info"
import Confirmation from "./Confirmation/Confirmation"
import "./style.sass"

const Content = ({ email, handleIconClick }) => {
  const [modalContent, setModalContent] = useState("info")

  return (
    <div className="remove-modal">
      {modalContent === "info" ? (
        <Info email={email} setModalContent={setModalContent} />
      ) : (
        <Confirmation
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
  handleIconClick: PropTypes.func,
}

export default Content
