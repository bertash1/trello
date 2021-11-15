import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import AddCard from "../../components/Card/AddCard/AddCard"
import Header from "../../components/Header/Header"
import Cards from "../../components/Cards/Cards"
import ControlePanel from "../../components/Board/ControlePanel/ControlePanel"
import { getBoard } from "../../actions/board"
import "./style.sass"

const ActiveBoard = () => {
  const dispatch = useDispatch()
  const { boardId } = useParams()

  useEffect(() => {
    dispatch(getBoard(boardId))
  }, [dispatch, boardId])

  return (
    <div className="board__wrapper">
      <Header />
      <ControlePanel />
      <div className="board">
        <Cards />
        <AddCard type="card" />
      </div>
    </div>
  )
}

export default ActiveBoard
