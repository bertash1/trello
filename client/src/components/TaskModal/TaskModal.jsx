import React, { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useDispatch } from "react-redux"

import Portal from "../Portal/Portal"
import Overlay from "../Overlay/Overlay"
import CloseButton from "../CloseButton/CloseButton"
import Input from "../Input/Input"
import Form from "../Form/Form"
import ModalButton from "../ModalButton/ModalButton"
import "./style.sass"
import { changeTask, changeDescription, deleteTask } from "../../actions/task"

const TaskModal = ({
  setIsModalShown,
  title,
  taskId,
  description = "",
  cardId,
}) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedDescription, setEditedDescription] = useState(description)
  const [isTitleEdited, setIsTitleEdited] = useState(false)
  const [isDescriptionEdited, setIsDescriptionEdited] = useState(false)

  const descriptionClassName = classNames([
    "task-modal__description",
    { "task-modal__description_edited": !!editedDescription },
  ])

  const dispatch = useDispatch()

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 27 && !isTitleEdited) {
        setIsModalShown(false)
      }
      return null
    },
    [setIsModalShown, isTitleEdited]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editedTitle) {
      dispatch(changeTask(taskId, editedTitle))
      setIsTitleEdited(false)
    }
  }

  const handleCloseDescription = () => {
    setIsDescriptionEdited((prev) => !prev)
  }

  const handleDescriptionSubmit = (e) => {
    e.preventDefault()
    dispatch(changeDescription(taskId, editedDescription))
    handleCloseDescription()
  }

  const handleInputChange = (e) => {
    setEditedTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value)
  }

  return (
    <Portal>
      <div className="modal">
        <Overlay changeComponentVisibility={setIsModalShown} />

        <div className="task-modal">
          <div className="task-modal__header">
            {!isTitleEdited ? (
              <span
                className="task-modal__title"
                role="none"
                onClick={() => setIsTitleEdited(true)}
              >
                {title}
              </span>
            ) : (
              <form className="modal__form" onSubmit={handleSubmit}>
                <Input
                  componentType="card"
                  handleInputChange={handleInputChange}
                  setIsEdited={setIsTitleEdited}
                  value={editedTitle}
                />
              </form>
            )}
            <CloseButton handleClose={setIsModalShown} />
          </div>

          <div className="task-modal__content">
            <div className="task-modal__info">
              <div className="task-modal__description-wrapper">
                <span className="task-modal__description-title">
                  Description
                </span>
                {!isDescriptionEdited && editedDescription && (
                  <ModalButton
                    handleClick={handleCloseDescription}
                    value="Edit"
                  />
                )}
              </div>
              {!isDescriptionEdited ? (
                <span
                  className={descriptionClassName}
                  role="none"
                  onClick={handleCloseDescription}
                >
                  {description || "Add a more detailed description..."}
                </span>
              ) : (
                <Form
                  type="description"
                  handleSubmit={handleDescriptionSubmit}
                  handleClick={handleCloseDescription}
                  handleInputChange={handleDescriptionChange}
                  newItem={editedDescription}
                />
              )}
            </div>

            <div className="task-modal__menu">
              <span className="task-modal__menu-actions-title">Actions</span>
              <ul className="task-modal__menu-actions-list">
                <li
                  className="task-modal__menu-actions-list-item"
                  role="menuitem"
                  onClick={() => dispatch(deleteTask(cardId, taskId))}
                >
                  Archive
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

TaskModal.propTypes = {
  setIsModalShown: PropTypes.func,
  title: PropTypes.string,
  taskId: PropTypes.string,
  description: PropTypes.string,
  cardId: PropTypes.string,
}

export default TaskModal
