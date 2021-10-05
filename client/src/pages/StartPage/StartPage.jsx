import React from "react"
import { useSelector } from "react-redux"

import Header from "../../components/StartPage/Header/Header"
import Content from "../../components/StartPage/Content/Content"
import Menu from "../../components/StartPage/Menu/Menu"
import Board from "../../components/Board/Board"
import "./style.sass"

const StartPage = () => {
  const { user } = useSelector((state) => state.user)

  if (user) {
    return <Board userId={user.user._id} />
  }

  return (
    <div className="start-page">
      <Header />
      <div className="start-page__container">
        <Content />
        <Menu />
      </div>
    </div>
  )
}

export default StartPage
