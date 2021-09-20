import React from "react"

import AddItem from "../AddItem/AddItem"
import Cards from "../Cards/Cards"
import "./style.sass"

const Board = () => (
  <div className="board">
    <Cards />
    <AddItem componentType="card" />
  </div>
)

export default Board
