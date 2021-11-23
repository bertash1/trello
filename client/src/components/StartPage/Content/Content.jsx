import React from "react"
import img from "src/assets/task.jpg"
import "./style.sass"

const Content = () => (
  <div className="start-page__content">
    <h2 className="start-page__header">Trello helps teams move work forward</h2>
    <p className="start-page__info">
      Collaborate, manage projects, and reach new productivity peaks. From high
      rises to the home office, the way your team works is unique—accomplish it
      all with Trello
    </p>
    <img className="start-page__image" src={img} alt="chart" />
  </div>
)

export default Content
