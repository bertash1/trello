import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined"
import { grey } from "@mui/material/colors"

import CloseButton from "../../../Common/CloseButton/CloseButton"
import Input from "../../../Common/Input/Input"
import { changeTask } from "../../../../actions/task"
import "./style.sass"

const Header = ({
  isTitleEdited,
  setIsTitleEdited,
  taskId,
  setIsModalShown,
  title,
  cardTitle,
}) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setEditedTitle(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editedTitle) {
      dispatch(changeTask(taskId, { title: editedTitle }))
      setIsTitleEdited(false)
    }
  }

  return (
    <>
      <div className="task-modal__header">
        {!isTitleEdited ? (
          <div className="task-modal__title-wrapper">
            <PaymentOutlinedIcon sx={{ color: grey[700] }} fontSize="small" />
            <span
              className="task-modal__title"
              role="none"
              onClick={() => setIsTitleEdited(true)}
            >
              {title}
            </span>
          </div>
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
      <span className="task-modal__card-title">{`in card ${cardTitle}`}</span>
    </>
  )
}

Header.propTypes = {
  isTitleEdited: PropTypes.bool,
  setIsTitleEdited: PropTypes.func,
  setIsModalShown: PropTypes.func,
  title: PropTypes.string,
  cardTitle: PropTypes.string,
  taskId: PropTypes.string,
}

export default Header
