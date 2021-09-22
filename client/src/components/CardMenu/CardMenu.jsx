import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"

import "./style.sass"
import { deleteCard } from "../../actions/card"
import CloseButton from "../CloseButton/CloseButton"

const CardMenu = ({ handleShowMenu = () => null, id }) => {
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

  return (
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
          onClick={() => dispatch(deleteCard(id))}
        >
          Archive card
        </li>
      </ul>
    </div>
  )
}

CardMenu.propTypes = {
  handleShowMenu: PropTypes.func,
  id: PropTypes.string,
}

export default CardMenu
