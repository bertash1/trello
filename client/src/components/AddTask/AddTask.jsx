import React, { useState, useRef, useEffect } from "react"
import CloseButton from "../CloseButton/CloseButton"
import ConfirmButton from "../ConfirmButton/ConfirmButton"
import Input from "../Input/Input"
import AddButton from "../AddButton/AddButton"
import "./style.sass"

const AddTask = () => {
  const [isEdited, setIsEdited] = useState(false)
  const [newTask, setNewTask] = useState("")
  const textRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask) {
      setNewTask("")
    } else {
      textRef.current.focus()
    }
  }

  const handleInputChange = (e) => {
    setNewTask(e.target.value)
  }

  const handleClick = () => {
    setIsEdited(!isEdited)
  }

  useEffect(() => {
    if (isEdited && !newTask) {
      textRef.current.focus()
    }
    if (!isEdited) {
      setNewTask("")
    }
  }, [isEdited, newTask])

  return (
    <>
      {!isEdited ? (
        <AddButton
          title="Add a task"
          handleClick={handleClick}
          buttonType="task"
          componentType="task"
        />
      ) : (
        <form className="add-form" onSubmit={handleSubmit}>
          <Input
            placeholder="Enter a title for this task..."
            textRef={textRef}
            handleInputChange={handleInputChange}
            value={newTask}
            setIsEdited={setIsEdited}
            componentType="task"
          />
          <div className="add-form__controls">
            <div className="add-form__btn-wrapper">
              <ConfirmButton value="Add task" />
              <CloseButton handleClick={handleClick} />
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default AddTask
