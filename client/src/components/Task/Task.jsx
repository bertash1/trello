import React, { useState } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"

import "./style.sass"
import TaskEditor from "../TaskEditor/TaskEditor"
import TaskModal from "../TaskModal/TaskModal"

const Task = ({ title, taskId, cardId, description }) => {
  const [isEdited, setIsEdited] = useState(false)
  const [isMouseOver, setIsMouseOver] = useState(false)
  const [isModalShown, setIsModalShown] = useState(false)

  const iconClassName = classNames("task__icon", {
    task__icon_shown: isMouseOver,
  })

  const handleOpenModal = () => {
    setIsModalShown((prev) => !prev)
  }

  return (
    <>
      <div
        className="task"
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <span className="task__title" role="none" onClick={handleOpenModal}>
          {title}
        </span>
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
            taskId={taskId}
            cardId={cardId}
            setIsMouseOver={setIsMouseOver}
          />
        )}
      </div>

      {isModalShown && (
        <TaskModal
          taskId={taskId}
          setIsModalShown={handleOpenModal}
          title={title}
          description={description}
          cardId={cardId}
        />
      )}
    </>
  )
}

Task.propTypes = {
  title: PropTypes.string,
  taskId: PropTypes.string,
  cardId: PropTypes.string,
  description: PropTypes.string,
}

export default Task
