import React from "react"

import AddCard from "../../components/Card/AddCard/AddCard"
import Header from "../../components/Header/Header"
import Cards from "../../components/Cards/Cards"
import "./style.sass"

const ActiveBoard = () => (
  <div className="board__wrapper">
    <Header />
    <div className="board">
      <Cards />
      <AddCard type="card" />
    </div>
  </div>
)

export default ActiveBoard
