/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import AddTask from "../AddTask/AddTask"
import Options from "../Options/Options"
import Task from "../Task/Task"
import Input from "../Input/Input"
import "./style.sass"

const Card = ({ title }) => {
  const [isEdited, setIsEdited] = useState(false)
  const [textareaValue, setTextareaInput] = useState(title)
  const textRef = useRef()

  const handleInputChange = (e) => {
    setTextareaInput(e.target.value)
  }

  const handleClick = () => {
    setIsEdited(true)
  }

  const handleFocus = (e) => {
    e.target.select()
  }

  useEffect(() => {
    if (isEdited) {
      textRef.current.focus()
    }
  }, [isEdited])

  return (
    <div className="card">
      <div className="card__header">
        {!isEdited ? (
          <span className="card__title" onClick={handleClick}>
            {textareaValue}
          </span>
        ) : (
          <form className="card__form">
            <Input
              componentType="card"
              textRef={textRef}
              value={textareaValue}
              handleInputChange={handleInputChange}
              handleFocus={handleFocus}
              setIsEdited={setIsEdited}
            />
          </form>
        )}
        <Options />
      </div>

      <Task title="Test1" />

      <AddTask title="Add a task" />

      <div className="card__tasks-wrapper" />
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
}

export default Card
