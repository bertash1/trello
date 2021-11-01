import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import classNames from "classnames"
import LineWeightOutlinedIcon from "@mui/icons-material/LineWeightOutlined"
import { grey } from "@mui/material/colors"
import { useParams } from "react-router-dom"

import Form from "../../../Common/Form/Form"
import ModalButton from "../ModalButton/ModalButton"
import { editTask } from "../../../../actions/task"
import "./style.sass"

const Info = ({
  isDescriptionEdited,
  taskId,
  handleCloseDescription,
  description,
}) => {
  const [editedDescription, setEditedDescription] = useState(null)
  const dispatch = useDispatch()

  const boardId = useParams()

  useEffect(() => {
    setEditedDescription(description)
  }, [description])

  const descriptionClassName = classNames([
    "task-modal__description",
    { "task-modal__description_edited": !!editedDescription },
  ])

  const handleDescriptionSubmit = async (e) => {
    e.preventDefault()
    dispatch(editTask(taskId, { description: editedDescription }, boardId))
    handleCloseDescription()
  }

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value)
  }

  return (
    <div className="task-modal__info">
      <div className="task-modal__description-wrapper">
        <LineWeightOutlinedIcon sx={{ color: grey[700] }} fontSize="small" />
        <span className="task-modal__description-title">Description</span>
        {!isDescriptionEdited && editedDescription && (
          <ModalButton handleClick={handleCloseDescription} value="Edit" />
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
  )
}

Info.propTypes = {
  isDescriptionEdited: PropTypes.bool,
  taskId: PropTypes.string,
  description: PropTypes.string,
  handleCloseDescription: PropTypes.func,
}

export default Info
