import React from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { deleteBoardUser } from "src/actions/board"
import "./style.sass"

const Confirmation = ({ handleIconClick, setModalContent, userId }) => {
  const dispatch = useDispatch()
  const { boardId } = useParams()

  const handleButtonClick = () => {
    dispatch(deleteBoardUser(userId, boardId))
    handleIconClick(false)
  }

  return (
    <>
      <span
        className="remove-modal__go-back"
        onClick={() => setModalContent("info")}
        role="none"
      >
        {"<"}
      </span>
      <p className="remove-modal__title">Remove memeber?</p>
      <span className="remove-modal__line" />
      <p className="remove-modal__description">
        The member will be removed from all cards on this board
      </p>
      <button
        className="remove-modal__button"
        onClick={handleButtonClick}
        type="button"
      >
        Remove member
      </button>
    </>
  )
}

Confirmation.propTypes = {
  handleIconClick: PropTypes.func,
  setModalContent: PropTypes.func,
  userId: PropTypes.string,
}

export default Confirmation
