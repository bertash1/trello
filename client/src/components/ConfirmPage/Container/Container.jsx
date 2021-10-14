import React from "react"

import image from "../../../assets/confirm.png"
import Info from "../Info/Info"
import "./style.sass"

const Container = () => (
  <div className="confirm-page__container">
    <img className="confirm-page__image" alt="confirm" src={image} />
    <Info />
  </div>
)

export default Container
