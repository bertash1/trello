import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import classNames from "classnames"
import PropTypes from "prop-types"

import { deleteTask } from "../../actions/task"
import "./style.sass"
import Portal from "../Portal/Portal"
import Overlay from "../Overlay/Overlay"

const TaskMenu = ({ taskId, cardId, setIsEdited }) => {
  const [menuPosition, setMenuPosition] = useState("right")
  const menu = useRef()
  const dispatch = useDispatch()

  const menuClassName = classNames([
    "task__menu",
    { [`task__menu_${menuPosition}`]: true },
  ])

  const listClassName = classNames([
    "task__list",
    { [`task__list_${menuPosition}`]: true },
  ])

  useEffect(() => {
    if (window.innerWidth - menu.current.getBoundingClientRect().right > 0) {
      setMenuPosition("right")
    } else {
      setMenuPosition("left")
    }
  }, [])

  return (
    <>
      <Portal>
        <Overlay changeComponentVisibility={setIsEdited} />
      </Portal>
      <div className={menuClassName} ref={menu}>
        <ul className={listClassName}>
          <li
            className="task__list-item"
            role="menuitem"
            onClick={() => dispatch(deleteTask(cardId, taskId))}
          >
            Archive
          </li>
        </ul>
      </div>
    </>
  )
}

TaskMenu.propTypes = {
  taskId: PropTypes.string,
  cardId: PropTypes.string,
  setIsEdited: PropTypes.func,
}

export default TaskMenu
