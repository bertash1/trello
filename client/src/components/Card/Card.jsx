/* eslint-disable react/forbid-prop-types */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"

import Options from "../Options/Options"
import Task from "../Task/Task"
import Input from "../Input/Input"
import AddItem from "../AddItem/AddItem"
import { fetchCards } from "../../actions"
import { URL } from "../../constants"
import "./style.sass"

const Card = ({ title, cardTasks, allTasks, _id }) => {
  const [isEdited, setIsEdited] = useState(false)
  const [inputValue, setInputValue] = useState(title)
  const textRef = useRef()
  const dispatch = useDispatch()

  const editCard = async (id) => {
    await fetch(`${URL}/card/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: inputValue,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
    dispatch(fetchCards())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editCard(_id)
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
          <span className="card__title" onClick={handleClick}>
            {inputValue}
          </span>
        ) : (
          <form className="card__form" onSubmit={handleSubmit}>
            <Input
              editCard={editCard}
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

      {cardTasks &&
        allTasks &&
        allTasks.map((item) => {
          if (cardTasks.indexOf(item._id) !== -1) {
            return <Task title={item.title} _id={item._id} key={item._id} />
          }
        })}

      <AddItem componentType="task" _id={_id} />

      <div className="card__tasks-wrapper" />
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  _id: PropTypes.string,
  cardTasks: PropTypes.array,
  allTasks: PropTypes.array,
}

export default Card
