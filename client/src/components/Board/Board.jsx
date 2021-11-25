import React from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"

import "./style.sass"

const Board = ({ title, boardId }) => {
  const history = useHistory()

  const handleClick = async () => {
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
