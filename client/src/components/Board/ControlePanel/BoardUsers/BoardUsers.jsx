/* eslint-disable no-unused-vars */
import React from "react"
import { useSelector } from "react-redux"
import "./style.sass"
import UserIcon from "./UserIcon/UserIcon"

const BoardUsers = () => {
  const users = useSelector((state) => state.boards.activeBoard.users)

  return (
    <div className="board-users">
      {users && users.map((item) => <UserIcon key={item} userId={item} />)}
    </div>
  )
}

export default BoardUsers
