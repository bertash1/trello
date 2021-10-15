import React from "react"
import CloseButton from "../../Common/CloseButton/CloseButton"
import OutsideClickHandler from "../../Common/OutsideClickHandler/OutsideClickHandler"
import "./style.sass"

const MemberBarMenu = () => (
  <OutsideClickHandler handleClose={() => null}>
    <div className="member-bar__menu">
      <div className="member-bar__menu-header">
        <span className="member-bar__menu-title">Account</span>
        <CloseButton handleClose={() => null} />
      </div>
      <span className="member-bar__line" />
      <ul className="member-bar__list">
        <li className="member-bar__list-item" role="menuitem">
          Go to boards
        </li>
        <span className="member-bar__line" />
        <li className="member-bar__list-item" role="menuitem">
          Log out
        </li>
      </ul>
    </div>
  </OutsideClickHandler>
)

export default MemberBarMenu
