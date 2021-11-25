import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { cancelFetchedTasks } from "src/actions/task"
import { cancelFetchedCards } from "src/actions/card"
import AddCard from "src/components/Card/AddCard/AddCard"
import Header from "src/components/Header/Header"
import Cards from "src/components/Cards/Cards"
import ControlePanel from "src/components/Board/ControlePanel/ControlePanel"
import { cancelFetchedActiveBoard, getBoard } from "../../actions/board"

import "./style.sass"

const ActiveBoard = () => {
  const dispatch = useDispatch()
  const { boardId } = useParams()

  useEffect(() => {
    dispatch(getBoard(boardId))
    return () => {
      dispatch(cancelFetchedActiveBoard())
      dispatch(cancelFetchedTasks())
      dispatch(cancelFetchedCards())
    }
  })

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
