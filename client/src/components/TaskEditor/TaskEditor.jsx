import React, { useRef, useEffect, useState } from "react"
import PropTypes from "prop-types"
import ConfirmButton from "../ConfirmButton/ConfirmButton"
import Input from "../Input/Input"
import "./style.sass"

const TaskEditor = ({ title, isEdited, setIsEdited }) => {
  const [editedTask, setEditedTask] = useState(title)

  const textRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEdited(false)
  }

  const handleInputChange = (e) => {
    setEditedTask(e.target.value)
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
          value={editedTask}
          handleFocus={handleFocus}
          handleInputChange={handleInputChange}
          setIsEdited={setIsEdited}
          componentType="task"
        />
        <ConfirmButton value="Save" />
      </form>
    </>
  )
}

TaskEditor.propTypes = {
  title: PropTypes.string,
  isEdited: PropTypes.bool,
  setIsEdited: PropTypes.func,
}

export default TaskEditor
