import React from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined"

import { deleteTask } from "../../../../actions/task"
import "./style.sass"

const Menu = ({ taskId }) => {
  const dispatch = useDispatch()

  const boardId = useSelector((state) => state.boards.activeBoard._id)

  return (
    <div className="task-modal__menu">
      <span className="task-modal__menu-actions-title">Actions</span>
      <ul className="task-modal__menu-actions-list">
        <li
          className="task-modal__menu-actions-list-item"
          role="menuitem"
          onClick={() => dispatch(deleteTask(taskId, boardId))}
        >
          <ArchiveOutlinedIcon fontSize="small" sx={{ marginRight: "7px" }} />
          <span>Archive</span>
        </li>
      </ul>
    </div>
  )
}

Menu.propTypes = {
  taskId: PropTypes.string,
}

export default Menu
