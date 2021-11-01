import React, { useState } from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

import Info from "../Info/Info"
import Menu from "../Menu/Menu"
import "./style.sass"

const Content = ({ taskId }) => {
  const [isDescriptionEdited, setIsDescriptionEdited] = useState(false)

  const { description } = useSelector((state) => state.task.pickedTask)

  const handleCloseDescription = () => {
    setIsDescriptionEdited((prev) => !prev)
  }

  return (
    <div className="task-modal__content">
      <Info
        isDescriptionEdited={isDescriptionEdited}
        taskId={taskId}
        description={description}
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
