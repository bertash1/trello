import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"

import Options from "../Options/Options"
import Task from "../Task/Task"
import Input from "../Input/Input"
import AddItem from "../AddItem/AddItem"
import { changeItem } from "../../actions"
import "./style.sass"

const Card = ({ title, cardTasks = [], _id }) => {
  const [isEdited, setIsEdited] = useState(false)
  const [inputValue, setInputValue] = useState(title)
  const textRef = useRef()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(changeItem(_id, inputValue, "card"))
    setIsEdited(false)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
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
          <span
            className="card__title"
            role="presentation"
            onClick={handleClick}
          >
            {inputValue}
          </span>
        ) : (
          <form className="card__form" onSubmit={handleSubmit}>
            <Input
              parentId={_id}
              componentType="card"
              textRef={textRef}
              value={inputValue}
              handleInputChange={handleInputChange}
              handleFocus={handleFocus}
              setIsEdited={setIsEdited}
            />
          </form>
        )}
        <Options />
      </div>

      {cardTasks.map((item) => (
        <Task title={item.title} _id={item._id} key={item._id} type="task" />
      ))}

      <AddItem componentType="task" _id={_id} />

      <div className="card__tasks-wrapper" />
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  _id: PropTypes.string,
  cardTasks: PropTypes.array,
}

export default Card
