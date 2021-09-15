import React, { useState } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"

import "./style.sass"
import TaskEditor from "../TaskEditor/TaskEditor"
import Overlay from "../Overlay/Overlay"

const Task = ({ title }) => {
  const [isEdited, setIsEdited] = useState(false)
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
        <span className="task__title">{title}</span>
        <FontAwesomeIcon
          className={iconClassName}
          icon={faPencilAlt}
          onClick={() => setIsEdited(!isEdited)}
        />
        {isEdited && (
          <TaskEditor
            isEdited={isEdited}
            setIsEdited={setIsEdited}
            title={title}
          />
        )}
      </div>
      {isEdited ? <Overlay changeComponentVisibility={setIsEdited} /> : null}
    </>
  )
}

Task.propTypes = {
  title: PropTypes.string,
}

export default Task
