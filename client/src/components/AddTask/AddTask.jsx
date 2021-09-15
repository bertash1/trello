import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import CloseButton from "../CloseButton/CloseButton"
import ConfirmButton from "../ConfirmButton/ConfirmButton"
import Options from "../Options/Options"
import "./style.sass"

const AddTask = ({ title }) => {
  const [isOpened, setIsOpened] = useState(false)
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
    setIsOpened(!isOpened)
  }

  useEffect(() => {
    if (isOpened && !newTask) {
      textRef.current.focus()
    }
    if (!isOpened) {
      setNewTask("")
    }
  }, [isOpened, newTask])

  return (
    <>
      {!isOpened ? (
        <button className="add-btn" type="button" onClick={handleClick}>
          <span className="add-btn__hor-line" />
          <span className="add-btn__vert-line" />
          <span className="add-btn__title">{title}</span>
        </button>
      ) : (
        <form className="add-form" onSubmit={handleSubmit}>
          <textarea
            className="add-form__textarea"
            type="text"
            placeholder="Enter a title for this task..."
            ref={textRef}
            onChange={handleInputChange}
            value={newTask}
          />
          <div className="add-form__controls">
            <div className="add-form__btn-wrapper">
              <ConfirmButton value="Add task" />
              <CloseButton handleClick={handleClick} />
            </div>
            <Options />
          </div>
        </form>
      )}
    </>
  )
}

AddTask.propTypes = {
  title: PropTypes.string,
}

export default AddTask
