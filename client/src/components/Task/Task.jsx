import React, { useState } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"

import "./style.sass"
import TaskEditor from "../TaskEditor/TaskEditor"
import Overlay from "../Overlay/Overlay"

const Task = ({ title, _id, cardId }) => {
  const [isEdited, setIsEdited] = useState(false)
  const [taskTitle, setTaskTitle] = useState(title)
  const [isMouseOver, setIsMouseOver] = useState(false)

  const iconClassName = classNames("task__icon", {
    task__icon_shown: isMouseOver,
  })

  return (
    <>
      <div
        className="task"
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <span className="task__title">{taskTitle}</span>
        <FontAwesomeIcon
          className={iconClassName}
          icon={faPencilAlt}
          onClick={() => setIsEdited(!isEdited)}
        />
        {isEdited && (
          <TaskEditor
            isEdited={isEdited}
            setIsEdited={setIsEdited}
            title={taskTitle}
            setTaskTitle={setTaskTitle}
            parentId={_id}
            cardId={cardId}
            setIsMouseOver={setIsMouseOver}
          />
        )}
      </div>
      {isEdited && <Overlay changeComponentVisibility={setIsEdited} />}
    </>
  )
}

Task.propTypes = {
  title: PropTypes.string,
  _id: PropTypes.string,
  cardId: PropTypes.string,
}

export default Task
