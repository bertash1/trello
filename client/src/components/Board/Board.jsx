import React from "react"
import AddCard from "../AddCard/AddCard"

import Cards from "../Cards/Cards"
import "./style.sass"

const Board = () => (
  <div className="board">
    <Cards />
    <AddCard type="card" />
  </div>
)

export default Board
