import React from "react"

import Header from "../../components/StartPage/Header/Header"
import Content from "../../components/StartPage/Content/Content"
import Menu from "../../components/StartPage/Menu/Menu"
import "./style.sass"

const StartPage = () => (
  <div className="start-page">
    <Header />
    <div className="start-page__container">
      <Content />
      <Menu />
    </div>
  </div>
)
export default StartPage
