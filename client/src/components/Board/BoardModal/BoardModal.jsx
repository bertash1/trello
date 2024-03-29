import React, { useState, useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"

import ConfirmButton from "src/components/Common/ConfirmButton/ConfirmButton"
import Overlay from "src/components/Common/Overlay/Overlay"
import { addBoard, getUserBoards } from "src/actions/board"
import "./style.sass"

const BoardModal = ({ handleShowMenu }) => {
  const [inputValue, setInputValue] = useState("")
  const { activeBoard } = useSelector((state) => state.boards)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addBoard(inputValue))
    setInputValue("")
    dispatch(getUserBoards())
  }

  useEffect(() => {
    if (activeBoard) {
      history.push(`/board/${activeBoard._id}`)
    }
  }, [activeBoard, history])

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        handleShowMenu()
      }
      return null
    },
    [handleShowMenu]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <>
      <div className="board-modal">
        <form className="board-modal__form" onSubmit={handleSubmit}>
          <div className="board-modal__info">
            <input
              className="board-modal__input"
              type="text"
              onChange={handleChange}
              placeholder="Add board title"
              value={inputValue}
            />
          </div>
          <ConfirmButton value="Create board" />
        </form>
      </div>
      <Overlay changeComponentVisibility={handleShowMenu} />
    </>
  )
}

BoardModal.propTypes = {
  handleShowMenu: PropTypes.func,
}

export default BoardModal
