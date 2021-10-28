import React from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"

import "./style.sass"
import { getBoard } from "../../actions/board"

const Board = ({ title, boardId }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(getBoard(boardId))
  }

  return (
    <div className="board" onClick={handleClick} role="none">
      <span className="board__title">{title}</span>
    </div>
  )
}

Board.propTypes = {
  title: PropTypes.string,
  boardId: PropTypes.string,
}

export default Board
