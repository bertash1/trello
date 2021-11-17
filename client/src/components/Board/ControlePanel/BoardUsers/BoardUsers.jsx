/* eslint-disable no-unused-vars */
import React from "react"
import { useSelector } from "react-redux"
import "./style.sass"
import UserIcon from "./UserIcon/UserIcon"

const BoardUsers = () => {
  const users = useSelector((state) => state.boards.activeBoard.users)

  return (
    <div className="board-users">
      {users &&
        users.map((user) => <UserIcon key={user._id} email={user.email} />)}
    </div>
  )
}

export default BoardUsers
