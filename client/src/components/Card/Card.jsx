import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"

import Options from "../Common/Options/Options"
import Task from "../Task/Task"
import Input from "../Common/Input/Input"
import { changeCard } from "../../actions/card"
import "./style.sass"
import CardMenu from "./CardMenu/CardMenu"
import AddTask from "../Task/AddTask/AddTask"

const Card = ({ title, cardTasks = [], _id }) => {
  const [isEdited, setIsEdited] = useState(false)
  const [inputValue, setInputValue] = useState(title)
  const [isMenuShown, setIsMenuShown] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue) {
      dispatch(changeCard(_id, inputValue))
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
    <div className="card">
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
              parentId={_id}
              componentType="card"
              value={inputValue}
              handleInputChange={handleInputChange}
              setIsEdited={setIsEdited}
            />
          </form>
        )}

        <Options handleShowMenu={handleShowMenu} />
        {isMenuShown && <CardMenu handleShowMenu={handleShowMenu} id={_id} />}
      </div>

      {cardTasks.map((item) => (
        <Task
          title={item.title}
          description={item.description}
          taskId={item._id}
          key={item._id}
          cardId={_id}
          cardTitle={title}
        />
      ))}

      <AddTask _id={_id} />

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
