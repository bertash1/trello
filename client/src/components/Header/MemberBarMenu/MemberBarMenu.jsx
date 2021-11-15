import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"

import CloseButton from "../../Common/CloseButton/CloseButton"
import OutsideClickHandler from "../../Common/OutsideClickHandler/OutsideClickHandler"
import { userLogout } from "../../../actions/user"
import "./style.sass"

const MemberBarMenu = ({ handleShowMenu = () => null, account }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        handleShowMenu()
      }
      return null
    },
    [handleShowMenu]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  const handleLogout = () => {
    dispatch(userLogout())
    history.push("/")
  }

  return (
    <OutsideClickHandler handleClose={handleShowMenu}>
      <div className="member-bar__menu">
        <div className="member-bar__menu-header">
          <span className="member-bar__menu-title">{account}</span>
          <CloseButton handleClose={handleShowMenu} />
        </div>
        <span className="member-bar__line" />
        <ul className="member-bar__list">
          <li
            className="member-bar__list-item"
            onClick={() => history.push("/dashboard")}
            role="menuitem"
          >
            Go to boards
          </li>
          <span className="member-bar__line" />
          <li
            className="member-bar__list-item"
            role="menuitem"
            onClick={handleLogout}
          >
            Log out
          </li>
        </ul>
      </div>
    </OutsideClickHandler>
  )
}

MemberBarMenu.propTypes = {
  account: PropTypes.string,
  handleShowMenu: PropTypes.func,
}

export default MemberBarMenu
