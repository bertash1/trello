/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

import Info from "../Info/Info"
import Menu from "../Menu/Menu"
import "./style.sass"

const Content = ({ cardId, taskId }) => {
  const [isDescriptionEdited, setIsDescriptionEdited] = useState(false)

  const { description = [] } = useSelector((state) => state.description)

  const handleCloseDescription = () => {
    setIsDescriptionEdited((prev) => !prev)
  }

  return (
    <div className="task-modal__content">
      {description.length ? (
        <Info
          isDescriptionEdited={isDescriptionEdited}
          taskId={taskId}
          descriptionId={description[0]._id}
          description={description[0].description}
          handleCloseDescription={handleCloseDescription}
        />
      ) : (
        <Info
          isDescriptionEdited={isDescriptionEdited}
          taskId={taskId}
          cardId={cardId}
          description=""
          handleCloseDescription={handleCloseDescription}
        />
      )}
      <Menu cardId={cardId} taskId={taskId} />
    </div>
  )
}

Content.propTypes = {
  cardId: PropTypes.string,
  taskId: PropTypes.string,
}

export default Content
