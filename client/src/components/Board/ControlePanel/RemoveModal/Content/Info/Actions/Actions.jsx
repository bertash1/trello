/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react"
import PropTypes from "prop-types"

import "./style.sass"

const Actions = ({ setModalContent }) => {
  const handleRemoveClick = () => {
    setModalContent("confirm")
  }

  return (
    <ul className="remove-modal__actions-list">
      <li className="remove-modal__action" onClick={handleRemoveClick}>
        Remove from board
      </li>
    </ul>
  )
}

Actions.propTypes = {
  setModalContent: PropTypes.func,
}

export default Actions
