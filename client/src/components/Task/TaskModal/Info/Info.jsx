import React, { useState } from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import classNames from "classnames"
import LineWeightOutlinedIcon from "@mui/icons-material/LineWeightOutlined"
import { grey } from "@mui/material/colors"

import Form from "../../../Common/Form/Form"
import ModalButton from "../ModalButton/ModalButton"
import "./style.sass"
import {
  changeDescription,
  postTaskDescription,
} from "../../../../actions/task"

const Info = ({
  isDescriptionEdited,
  description,
  taskId,
  handleCloseDescription,
  descriptionId,
}) => {
  const [editedDescription, setEditedDescription] = useState("")
  const dispatch = useDispatch()

  const descriptionClassName = classNames([
    "task-modal__description",
    { "task-modal__description_edited": !!editedDescription },
  ])

  const handleDescriptionSubmit = (e) => {
    e.preventDefault()
    if (descriptionId) {
      dispatch(changeDescription(descriptionId, editedDescription, taskId))
      setEditedDescription("")
    } else {
      dispatch(postTaskDescription(editedDescription, taskId))
      setEditedDescription("")
    }
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
  description: PropTypes.string,
  taskId: PropTypes.string,
  descriptionId: PropTypes.string,
  handleCloseDescription: PropTypes.func,
}

export default Info
