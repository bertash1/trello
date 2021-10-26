import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { changeTask } from "../../../actions/task"

import ConfirmButton from "../../Common/ConfirmButton/ConfirmButton"
import Input from "../../Common/Input/Input"
import TaskMenu from "../TaskMenu/TaskMenu"
import "./style.sass"

const TaskEditor = ({
  title,
  setIsEdited = () => null,
  taskId,
  setIsMouseOver = () => null,
  cardId,
}) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editedTitle) {
      dispatch(changeTask(taskId, { title: editedTitle }))
      setIsMouseOver(false)
      setIsEdited(false)
    }
  }

  const handleInputChange = (e) => {
    setEditedTitle(e.target.value)
  }
  return (
    <>
      <form className="edit-form" onSubmit={handleSubmit}>
        <Input
          value={editedTitle}
          handleInputChange={handleInputChange}
          setIsEdited={setIsEdited}
          componentType="task"
        />
        <ConfirmButton value="Save" />
      </form>
      <TaskMenu taskId={taskId} cardId={cardId} setIsEdited={setIsEdited} />
    </>
  )
}

TaskEditor.propTypes = {
  title: PropTypes.string,
  taskId: PropTypes.string,
  cardId: PropTypes.string,
  setIsEdited: PropTypes.func,
  setIsMouseOver: PropTypes.func,
}

export default TaskEditor
