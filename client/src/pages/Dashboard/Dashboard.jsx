import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Circular from "src/components/Common/Spinners/Circular"
import { cancelUserData } from "src/actions/user"
import { getUserBoards, cancelFetchedUserBoards } from "src/actions/board"

import Header from "src/components/Header/Header"
import "./style.sass"
import Board from "src/components/Board/Board"
import AddBoard from "src/components/Board/AddBoard/AddBoard"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { userBoards } = useSelector((state) => state.boards)

  useEffect(() => {
    dispatch(getUserBoards())
    return () => {
      dispatch(cancelFetchedUserBoards())
      dispatch(cancelUserData())
    }
  }, [dispatch])

  return (
    <div className="dashboard__wrapper">
      <Header />
      {userBoards ? (
        <>
          <h3 className="dashboard__title">Your boards</h3>
          <div className="boards-wrapper">
            {userBoards.map((board) => (
              <Board key={board._id} title={board.title} boardId={board._id} />
            ))}
            <AddBoard />
          </div>
        </>
      ) : (
        <Circular />
      )}
    </div>
  )
}

export default Dashboard
