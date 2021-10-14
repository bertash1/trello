import React from "react"
import MemberBar from "./MemberBar/MemberBar"
import "./style.sass"

const Header = () => (
  <header className="header">
    <span className="header__logo">Custom Trello</span>
    <MemberBar />
  </header>
)

export default Header
