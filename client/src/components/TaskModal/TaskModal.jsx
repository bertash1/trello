import React, { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"

import Portal from "../Common/Portal/Portal"
import Overlay from "../Common/Overlay/Overlay"
import Header from "./Header/Header"
import Content from "./Content/Content"
import "./style.sass"

const TaskModal = ({
  setIsModalShown,
  title,
  taskId,
  description = "",
  cardId,
  cardTitle,
}) => {
  const [isTitleEdited, setIsTitleEdited] = useState(false)

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 27 && !isTitleEdited) {
        setIsModalShown(false)
      }
      return null
    },
    [setIsModalShown, isTitleEdited]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <Portal>
      <div className="modal">
        <Overlay changeComponentVisibility={setIsModalShown} />
        <div className="task-modal">
          <Header
            isTitleEdited={isTitleEdited}
            setIsTitleEdited={setIsTitleEdited}
            setIsModalShown={setIsModalShown}
            title={title}
            cardTitle={cardTitle}
            taskId={taskId}
          />
          <Content description={description} cardId={cardId} taskId={taskId} />
        </div>
      </div>
    </Portal>
  )
}

TaskModal.propTypes = {
  setIsModalShown: PropTypes.func,
  title: PropTypes.string,
  taskId: PropTypes.string,
  description: PropTypes.string,
  cardId: PropTypes.string,
  cardTitle: PropTypes.string,
}

export default TaskModal
