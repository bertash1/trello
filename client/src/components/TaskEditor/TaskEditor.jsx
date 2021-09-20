import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { fetchTasks } from "../../actions"

import ConfirmButton from "../ConfirmButton/ConfirmButton"
import Input from "../Input/Input"
import { URL } from "../../constants"
import "./style.sass"

const TaskEditor = ({
  title,
  setTaskTitle,
  isEdited,
  setIsEdited,
  parentId,
  setIsMouseOver,
}) => {
  const textRef = useRef()
  const dispatch = useDispatch()

  const changeTask = async (id) => {
    await fetch(`${URL}/task/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
    dispatch(fetchTasks())
    setIsMouseOver(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    changeTask(parentId)
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
    </>
  )
}

TaskEditor.propTypes = {
  title: PropTypes.string,
  parentId: PropTypes.string,
  isEdited: PropTypes.bool,
  setIsEdited: PropTypes.func,
  setTaskTitle: PropTypes.func,
  setIsMouseOver: PropTypes.func,
}

export default TaskEditor
