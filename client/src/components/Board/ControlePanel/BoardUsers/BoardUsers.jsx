import React from "react"
import { useSelector } from "react-redux"
import "./style.sass"
import UserIcon from "./UserIcon/UserIcon"

const BoardUsers = () => {
  const activeBoard = useSelector((state) => state.boards.activeBoard)

  if (!activeBoard) return null

  return (
    <div className="board-users">
      {activeBoard.users.map((user) => (
        <UserIcon userId={user._id} key={user._id} email={user.email} />
      ))}
    </div>
  )
}

export default BoardUsers
