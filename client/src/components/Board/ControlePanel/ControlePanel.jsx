import React from "react"
import BoardUsers from "./BoardUsers/BoardUsers"
import InviteButton from "./InviteButton/InviteButton"
import "./style.sass"

const ControlePanel = () => (
  <div className="controle-panel">
    <InviteButton />
    <BoardUsers />
  </div>
)

export default ControlePanel
