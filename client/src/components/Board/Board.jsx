import React from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"

import "./style.sass"
import { getBoard } from "src/actions/board"

const Board = ({ title, boardId }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClick = async () => {
    await dispatch(getBoard(boardId))
    history.push(`/board/${boardId}`)
  }

  return (
    <div className="board-item" onClick={handleClick} role="none">
      <span className="board-item__title">{title}</span>
    </div>
  )
}

Board.propTypes = {
  title: PropTypes.string,
  boardId: PropTypes.string,
}

export default Board
