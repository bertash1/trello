import React from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined"

import { deleteTask } from "../../../../actions/task"
import "./style.sass"

const Menu = ({ cardId, taskId }) => {
  const dispatch = useDispatch()

  return (
    <div className="task-modal__menu">
      <span className="task-modal__menu-actions-title">Actions</span>
      <ul className="task-modal__menu-actions-list">
        <li
          className="task-modal__menu-actions-list-item"
          role="menuitem"
          onClick={() => dispatch(deleteTask(cardId, taskId))}
        >
          <ArchiveOutlinedIcon fontSize="small" sx={{ marginRight: "7px" }} />
          <span>Archive</span>
        </li>
      </ul>
    </div>
  )
}

Menu.propTypes = {
  cardId: PropTypes.string,
  taskId: PropTypes.string,
}

export default Menu
