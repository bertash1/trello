import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import MemberBar from "./MemberBar/MemberBar"
import { getUserData } from "../../actions/user"
import "./style.sass"

const Header = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const getData = async () => {
      await dispatch(getUserData())
    }
    getData()
  }, [dispatch])
  return (
    <header className="header">
      <span className="header__logo">Custom Trello</span>
      <MemberBar />
    </header>
  )
}

export default Header
