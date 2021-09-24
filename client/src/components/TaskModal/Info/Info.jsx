import React from "react"
import PropTypes from "prop-types"
import LineWeightOutlinedIcon from "@mui/icons-material/LineWeightOutlined"
import { grey } from "@mui/material/colors"

import Form from "../../Common/Form/Form"
import ModalButton from "../ModalButton/ModalButton"
import "./style.sass"

const Info = ({
  isDescriptionEdited,
  descriptionClassName,
  description,
  editedDescription,
  handleCloseDescription,
  handleDescriptionSubmit,
  handleDescriptionChange,
}) => {
  const a = 1
  console.log(a)

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
  descriptionClassName: PropTypes.string,
  description: PropTypes.string,
  editedDescription: PropTypes.string,
  handleCloseDescription: PropTypes.func,
  handleDescriptionSubmit: PropTypes.func,
  handleDescriptionChange: PropTypes.func,
}

export default Info
