import React from "react"
import { useSelector } from "react-redux"

import AddCard from "../../components/Card/AddCard/AddCard"
import Header from "../../components/Header/Header"
import Cards from "../../components/Cards/Cards"
import "./style.sass"

const ActiveBoard = () => {
  const boardId = useSelector((state) => state.boards.activeBoard._id)
  return (
    <div className="board__wrapper">
      <Header />
      <div className="board">
        <Cards userId={boardId} />
        <AddCard type="card" />
      </div>
    </div>
  )
}

export default ActiveBoard
