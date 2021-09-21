import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { changeItem } from "../../actions"

import ConfirmButton from "../ConfirmButton/ConfirmButton"
import Input from "../Input/Input"
import TaskMenu from "../TaskMenu/TaskMenu"
import "./style.sass"

const TaskEditor = ({
  title,
  setTaskTitle,
  isEdited,
  setIsEdited,
  parentId,
  setIsMouseOver,
  cardId,
}) => {
  const textRef = useRef()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(changeItem(parentId, title, "task"))
    setIsMouseOver(false)
    setIsEdited(false)
  }

  const handleInputChange = (e) => {
    setTaskTitle(e.target.value)
  }

  const handleFocus = (e) => {
    e.target.select()
  }

  useEffect(() => {
    textRef.current.focus()
  }, [isEdited])

  return (
    <>
      <form className="edit-form" onSubmit={handleSubmit}>
        <Input
          className="edit-form__textarea"
          type="text"
          textRef={textRef}
          value={title}
          handleFocus={handleFocus}
          handleInputChange={handleInputChange}
          setIsEdited={setIsEdited}
          componentType="task"
        />
        <ConfirmButton value="Save" />
      </form>
      <TaskMenu parentId={parentId} type="task" cardId={cardId} />
    </>
  )
}

TaskEditor.propTypes = {
  title: PropTypes.string,
  parentId: PropTypes.string,
  cardId: PropTypes.string,
  isEdited: PropTypes.bool,
  setIsEdited: PropTypes.func,
  setTaskTitle: PropTypes.func,
  setIsMouseOver: PropTypes.func,
}

export default TaskEditor
