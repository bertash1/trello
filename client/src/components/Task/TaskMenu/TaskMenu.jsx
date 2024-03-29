import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import classNames from "classnames"
import PropTypes from "prop-types"

import { deleteTask } from "src/actions/task"
import "./style.sass"
import Portal from "src/components/Common/Portal/Portal"
import Overlay from "src/components/Common/Overlay/Overlay"

const TaskMenu = ({ taskId, setIsEdited }) => {
  const [menuPosition, setMenuPosition] = useState("right")
  const menu = useRef()
  const dispatch = useDispatch()

  const { boardId } = useParams()

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
            onClick={() => dispatch(deleteTask(taskId, boardId))}
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
  setIsEdited: PropTypes.func,
}

export default TaskMenu
