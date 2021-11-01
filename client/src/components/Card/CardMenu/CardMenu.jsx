import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import "./style.sass"
import { deleteCard } from "../../../actions/card"
import OutsideClickHandler from "../../Common/OutsideClickHandler/OutsideClickHandler"
import CloseButton from "../../Common/CloseButton/CloseButton"

const CardMenu = ({ handleShowMenu = () => null, id }) => {
  const dispatch = useDispatch()
  const { boardId } = useParams()

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

  return (
    <OutsideClickHandler handleClose={handleShowMenu}>
      <div className="card__menu">
        <div className="card__menu-header">
          <span className="card__menu-title">List actions</span>
          <CloseButton handleClose={handleShowMenu} />
        </div>
        <span className="card__line" />
        <ul className="card__list">
          <li
            className="card__list-item"
            role="menuitem"
            onClick={() => dispatch(deleteCard(id, boardId))}
          >
            Archive card
          </li>
        </ul>
      </div>
    </OutsideClickHandler>
  )
}

CardMenu.propTypes = {
  handleShowMenu: PropTypes.func,
  id: PropTypes.string,
}

export default CardMenu
