import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getUserBoards } from "../../actions/board"
import Header from "../../components/Header/Header"
import "./style.sass"
import Board from "../../components/Board/Board"

const Dashboard = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.userData?._id)
  const { userBoards = [] } = useSelector((state) => state.boards)

  console.log(userId)

  useEffect(() => {
    if (userId) {
      dispatch(getUserBoards(userId))
    }
  }, [userId, dispatch])

  return (
    <div className="dashboard__wrapper">
      <Header />
      <h3 className="dashboard__title">Your boards</h3>
      <div className="boards-wrapper">
        {userBoards &&
          userBoards.map((item) => (
            <Board key={item._id} title={item.title} boardId={item._id} />
          ))}
      </div>
    </div>
  )
}

export default Dashboard
