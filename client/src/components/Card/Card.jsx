import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Droppable, Draggable } from "react-beautiful-dnd"

import Options from "../Common/Options/Options"
import Task from "../Task/Task"
import Input from "../Common/Input/Input"
import { editCard } from "../../actions/card"
import "./style.sass"
import CardMenu from "./CardMenu/CardMenu"
import AddTask from "../Task/AddTask/AddTask"

const Card = ({ title, cardId, index }) => {
  const [isEdited, setIsEdited] = useState(false)
  const [inputValue, setInputValue] = useState(title)
  const [isMenuShown, setIsMenuShown] = useState(false)
  const dispatch = useDispatch()
  const { boardId } = useParams()

  const taskData = useSelector((state) => state.task.tasks)
  const tasks = taskData
    .filter((task) => task.card === cardId)
    .sort((a, b) => (a.position > b.position ? 1 : -1))

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
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <div
          className="card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
          <Droppable droppableId={cardId} type="task">
            {(provided) => (
              <div
                className="tasks-wrapper"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => (
                  <Task
                    index={index}
                    title={task.title}
                    taskId={task._id}
                    key={task._id}
                    cardId={cardId}
                    cardTitle={title}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <AddTask cardId={cardId} />

          <div className="card__tasks-wrapper" />
        </div>
      )}
    </Draggable>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  cardId: PropTypes.string,
  index: PropTypes.number,
}

export default React.memo(Card)
