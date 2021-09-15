import React from "react"
import PropTypes from "prop-types"
import AddTask from "../AddTask/AddTask"
import Options from "../Options/Options"
import Task from "../Task/Task"
import "./style.sass"

const Card = ({ title }) => (
  <div className="card">
    <div className="card__header">
      <span className="card__title">{title}</span>
      <Options />
    </div>

    <Task title="Test1" />

    <AddTask title="Add a task" />

    <div className="card__tasks-wrapper" />
  </div>
)

Card.propTypes = {
  title: PropTypes.string,
}

export default Card
