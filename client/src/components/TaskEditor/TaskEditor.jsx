import React, { useRef, useEffect, useState } from "react"
import PropTypes from "prop-types"
import ConfirmButton from "../ConfirmButton/ConfirmButton"
import "./style.sass"

const TaskEditor = ({ title, isEdited, setIsEdited }) => {
  const [editedTask, setEditedTask] = useState(title)

  const textRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEdited(false)
  }

  const handleChange = (e) => {
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
        <textarea
          className="edit-form__textarea"
          type="text"
          ref={textRef}
          value={editedTask}
          onFocus={handleFocus}
          onChange={handleChange}
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
