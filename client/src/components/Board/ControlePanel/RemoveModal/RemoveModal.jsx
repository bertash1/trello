import React from "react"
import PropTypes from "prop-types"

import OutsideClickHandler from "src/components/Common/OutsideClickHandler/OutsideClickHandler"
import Content from "./Content/Content"
import "./style.sass"

const RemoveModal = ({ email, userId, handleIconClick }) => (
  <OutsideClickHandler handleClose={handleIconClick}>
    <div className="remove-modal__wrapper">
      <Content
        userId={userId}
        email={email}
        handleIconClick={handleIconClick}
      />
    </div>
  </OutsideClickHandler>
)

RemoveModal.propTypes = {
  email: PropTypes.string,
  userId: PropTypes.string,
  handleIconClick: PropTypes.func,
}

export default RemoveModal
