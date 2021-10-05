import React from "react"
import PropTypes from "prop-types"

import AddCard from "../Card/AddCard/AddCard"
import Header from "../Header/Header"

import Cards from "../Cards/Cards"
import "./style.sass"

const Board = ({ userId }) => (
  <div className="board__wrapper">
    <Header />
    <div className="board">
      <Cards userId={userId} />
      <AddCard type="card" />
    </div>
  </div>
)

Board.propTypes = {
  userId: PropTypes.string,
}

export default Board
