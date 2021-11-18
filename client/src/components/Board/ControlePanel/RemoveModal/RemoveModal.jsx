import React from "react"
import PropTypes from "prop-types"

import Content from "./Content/Content"
import OutsideClickHandler from "../../../Common/OutsideClickHandler/OutsideClickHandler"
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