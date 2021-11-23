import React, { useState } from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

import Info from "../Info/Info"
import Menu from "../Menu/Menu"
import "./style.sass"

const Content = ({ taskId }) => {
  const [isDescriptionEdited, setIsDescriptionEdited] = useState(false)

  const { task } = useSelector((state) => state)

  const handleCloseDescription = () => {
    setIsDescriptionEdited((prev) => !prev)
  }

  if (!task.pickedTask.task) return <h1>loading...</h1>
  // it will be replaced by spiner in the next PR. Now it's only for avoiding the error

  return (
    <div className="task-modal__content">
      <Info
        isDescriptionEdited={isDescriptionEdited}
        taskId={taskId}
        description={task.pickedTask.task.description}
        handleCloseDescription={handleCloseDescription}
      />
      <Menu taskId={taskId} />
    </div>
  )
}

Content.propTypes = {
  taskId: PropTypes.string,
}

export default Content
