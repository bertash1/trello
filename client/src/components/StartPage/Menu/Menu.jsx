import React from "react"

import Authorization from "../Authorization/Authorization"
import Registration from "../Registration/Registration"
import "./style.sass"

const Menu = () => (
  <div className="start-page__menu">
    <Authorization />
    <Registration />
  </div>
)

export default Menu
