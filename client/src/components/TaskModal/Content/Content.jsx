import React, { useState } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useDispatch } from "react-redux"

import Info from "../Info/Info"
import Menu from "../Menu/Menu"
import "./style.sass"
import { changeDescription } from "../../../actions/task"

const Content = ({ description, cardId, taskId }) => {
  const [isDescriptionEdited, setIsDescriptionEdited] = useState(false)
  const [editedDescription, setEditedDescription] = useState(description)
  const dispatch = useDispatch()

  const descriptionClassName = classNames([
    "task-modal__description",
    { "task-modal__description_edited": !!editedDescription },
  ])

  const handleCloseDescription = () => {
    setIsDescriptionEdited((prev) => !prev)
  }

  const handleDescriptionSubmit = (e) => {
    e.preventDefault()
    dispatch(changeDescription(taskId, editedDescription))
    handleCloseDescription()
  }

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value)
  }

  return (
    <div className="task-modal__content">
      <Info
        isDescriptionEdited={isDescriptionEdited}
        descriptionClassName={descriptionClassName}
        description={description}
        editedDescription={editedDescription}
        handleCloseDescription={handleCloseDescription}
        handleDescriptionSubmit={handleDescriptionSubmit}
        handleDescriptionChange={handleDescriptionChange}
      />
      <Menu cardId={cardId} taskId={taskId} />
    </div>
  )
}

Content.propTypes = {
  description: PropTypes.string,
  cardId: PropTypes.string,
  taskId: PropTypes.string,
}

export default Content
