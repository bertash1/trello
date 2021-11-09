import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Options from "../Common/Options/Options"
import Task from "../Task/Task"
import Input from "../Common/Input/Input"
import { editCard } from "../../actions/card"
import "./style.sass"
import CardMenu from "./CardMenu/CardMenu"
import AddTask from "../Task/AddTask/AddTask"

const Card = ({ title, cardId }) => {
  const [isEdited, setIsEdited] = useState(false)
  const [inputValue, setInputValue] = useState(title)
  const [isMenuShown, setIsMenuShown] = useState(false)
  const dispatch = useDispatch()
  const { boardId } = useParams()

  const taskData = useSelector((state) => state.task.tasks)
  const tasks = taskData.filter((item) => item.card === cardId)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue) {
      dispatch(editCard(cardId, inputValue, boardId))
      setIsEdited(false)
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleShowMenu = () => {
    setIsMenuShown((prev) => !prev)
  }

  const handleClick = () => {
    setIsEdited(true)
  }

  return (
    <>
      <div className="card__header">
        {!isEdited ? (
          <span
            className="card__title"
            role="presentation"
            onClick={handleClick}
          >
            {title}
          </span>
        ) : (
          <form className="card__form" onSubmit={handleSubmit}>
            <Input
              parentId={cardId}
              componentType="card"
              value={inputValue}
              handleInputChange={handleInputChange}
              setIsEdited={setIsEdited}
            />
          </form>
        )}

        <Options handleShowMenu={handleShowMenu} />
        {isMenuShown && (
          <CardMenu
            handleShowMenu={handleShowMenu}
            id={cardId}
            boardId={boardId}
          />
        )}
      </div>

      {tasks.map((item) => (
        <Task
          title={item.title}
          taskId={item._id}
          key={item._id}
          cardId={cardId}
          cardTitle={title}
        />
      ))}

      <AddTask cardId={cardId} />

      <div className="card__tasks-wrapper" />
    </>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  cardId: PropTypes.string,
}

export default React.memo(Card)
