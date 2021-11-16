import React from "react"
import PropTypes from "prop-types"
import "./style.sass"

const InviteButton = ({ handleButtonClick }) => (
  <span className="invite-button" onClick={handleButtonClick} role="none">
    Invite
  </span>
)

InviteButton.propTypes = {
  handleButtonClick: PropTypes.func,
}

export default InviteButton
