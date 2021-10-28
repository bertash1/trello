import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"

import { getUserBoards } from "../../actions/board"
import Header from "../../components/Header/Header"
import "./style.sass"
import Board from "../../components/Board/Board"
import ActiveBoard from "../ActiveBoard/ActiveBoard"

const Dashboard = ({ userId }) => {
  const dispatch = useDispatch()
  const { userBoards = [] } = useSelector((state) => state.boards)

  useEffect(() => {
    dispatch(getUserBoards(userId))
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
      <ActiveBoard />
    </div>
  )
}

Dashboard.propTypes = {
  userId: PropTypes.string,
}

export default Dashboard
