import React from "react"

import BoardModal from "src/components/Board/Board"
import image from "src/assets/confirm.png"
import Info from "../Info/Info"
import "./style.sass"

const Container = () => (
  <div className="confirm-page__container">
    <img className="confirm-page__image" alt="confirm" src={image} />
    <Info />
    <BoardModal />
  </div>
)

export default Container
