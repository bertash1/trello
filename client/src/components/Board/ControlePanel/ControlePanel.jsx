import React, { useState } from "react"
import BoardUsers from "./BoardUsers/BoardUsers"
import InviteButton from "./InviteButton/InviteButton"
import InviteModal from "./InviteModal/InviteModal"
import "./style.sass"

const ControlePanel = () => {
  const [isModalShown, setIsModalShown] = useState(false)

  const handleButtonClick = () => {
    setIsModalShown((prev) => !prev)
  }

  return (
    <div className="controle-panel">
      <InviteButton handleButtonClick={handleButtonClick} />
      <BoardUsers />
      {isModalShown && <InviteModal handleButtonClick={handleButtonClick} />}
    </div>
  )
}

export default ControlePanel
