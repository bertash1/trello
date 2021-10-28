import React, { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"

import Portal from "../../Common/Portal/Portal"
import Overlay from "../../Common/Overlay/Overlay"
import Header from "./Header/Header"
import Content from "./Content/Content"
import { getTask, cancelPickedTask } from "../../../actions/task"
import "./style.sass"

const TaskModal = ({ setIsModalShown, title, taskId, cardTitle }) => {
  const [isTitleEdited, setIsTitleEdited] = useState(false)

  const dispatch = useDispatch()

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

  useEffect(() => {
    dispatch(getTask(taskId))
    return () => {
      dispatch(cancelPickedTask())
    }
  }, [dispatch, taskId])

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
          <Content taskId={taskId} />
        </div>
      </div>
    </Portal>
  )
}

TaskModal.propTypes = {
  setIsModalShown: PropTypes.func,
  title: PropTypes.string,
  taskId: PropTypes.string,
  cardTitle: PropTypes.string,
}

export default TaskModal
