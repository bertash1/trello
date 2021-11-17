import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getUserBoards } from "../../actions/board"
import Header from "../../components/Header/Header"
import "./style.sass"
import Board from "../../components/Board/Board"
import AddBoard from "../../components/Board/AddBoard/AddBoard"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { userBoards = [] } = useSelector((state) => state.boards)

  useEffect(() => {
    dispatch(getUserBoards())
  }, [dispatch])

  return (
    <div className="dashboard__wrapper">
      <Header />
      <h3 className="dashboard__title">Your boards</h3>
      <div className="boards-wrapper">
        {userBoards &&
          userBoards.map((board) => (
            <Board key={board._id} title={board.title} boardId={board._id} />
          ))}
        <AddBoard />
      </div>
    </div>
  )
}

export default Dashboard
