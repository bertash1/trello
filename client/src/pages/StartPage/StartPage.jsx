import React from "react"
import { useSelector } from "react-redux"

import ConfirmPage from "../ConfirmPage/ConfirmPage"
import Header from "../../components/StartPage/Header/Header"
import Content from "../../components/StartPage/Content/Content"
import Menu from "../../components/StartPage/Menu/Menu"
import Board from "../../components/Board/Board"
import "./style.sass"

const StartPage = () => {
  const userData = useSelector((state) => state.userData)

  if (userData.user && userData.user.isActivated) {
    return <Board userId={userData.user._id} />
  }

  if (userData.user && !userData.user.isActivated) {
    return <ConfirmPage />
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
