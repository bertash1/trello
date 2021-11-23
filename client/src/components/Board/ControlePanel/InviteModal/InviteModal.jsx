import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"

import OutsideClickHandler from "src/components/Common/OutsideClickHandler/OutsideClickHandler"
import CloseButton from "src/components/Common/CloseButton/CloseButton"
import Form from "./Form/Form"
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
