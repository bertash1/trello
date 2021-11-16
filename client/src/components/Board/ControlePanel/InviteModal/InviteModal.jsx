import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"

import CloseButton from "../../../Common/CloseButton/CloseButton"
import Form from "./Form/Form"
import OutsideClickHandler from "../../../Common/OutsideClickHandler/OutsideClickHandler"
import "./style.sass"

const InviteModal = ({ handleButtonClick }) => {
  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        handleButtonClick()
      }
      return null
    },
    [handleButtonClick]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <OutsideClickHandler handleClose={handleButtonClick}>
      <div className="invite-modal">
        <div className="invite-modal__close">
          <CloseButton handleClose={handleButtonClick} />
        </div>
        <div className="invite-modal__title">Invite to board</div>
        <Form handleButtonClick={handleButtonClick} />
      </div>
    </OutsideClickHandler>
  )
}
InviteModal.propTypes = {
  handleButtonClick: PropTypes.func,
}

export default InviteModal
