import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import MemberBar from "./MemberBar/MemberBar"
import { getUserData } from "../../actions/user"
import "./style.sass"

const Header = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.userData._id)
  useEffect(() => {
    if (!userId) {
      const getData = async () => {
        await dispatch(getUserData())
      }
      getData()
    }
  }, [dispatch, userId])
  return (
    <header className="header">
      <span className="header__logo">Custom Trello</span>
      <MemberBar />
    </header>
  )
}

export default Header
