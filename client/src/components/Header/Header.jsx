import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserData } from "src/actions/user"
import MemberBar from "./MemberBar/MemberBar"
import MemberBarMenu from "./MemberBarMenu/MemberBarMenu"
import "./style.sass"

const Header = () => {
  const [isModalShown, setIsModalShown] = useState(false)

  const email = useSelector((state) => state.userData.email)

  const handleShowMenu = () => {
    setIsModalShown((prev) => !prev)
  }

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
      <MemberBar handleShowMenu={handleShowMenu} />
      {isModalShown && (
        <MemberBarMenu account={email} handleShowMenu={handleShowMenu} />
      )}
    </header>
  )
}

export default Header
