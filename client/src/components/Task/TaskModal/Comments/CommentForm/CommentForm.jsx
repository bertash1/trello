import React, { useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"

import { getTask } from "src/actions/task"
import { postComment } from "src/actions/comment"
import OutsideClickHandler from "src/components/Common/OutsideClickHandler/OutsideClickHandler"
import ConfirmButton from "src/components/Common/ConfirmButton/ConfirmButton"
import "./style.sass"

const CommentForm = ({ taskId, text = "" }) => {
  const [isFormOpened, setIsFormOpened] = useState(false)
  const [inputValue, setInputValue] = useState(text)

  const inputRef = useRef()

  const userData = useSelector((state) => state.userData)
  const { boardId } = useParams()

  const letter = userData ? userData.email.slice(0, 1).toUpperCase() : " "

  const dispatch = useDispatch()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await dispatch(postComment(inputValue, userData._id, taskId, boardId))
    setInputValue("")
    dispatch(getTask(taskId))
    setIsFormOpened(false)
    inputRef.current.blur()
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <OutsideClickHandler handleClose={() => setIsFormOpened(false)}>
      <div className="comment-form">
        <div className="comment-form__user-icon">{letter}</div>
        <form className="comment-form__form" onSubmit={handleFormSubmit}>
          <input
            className="comment-form__input"
            type="text"
            value={inputValue}
            placeholder="Write a comment..."
            ref={inputRef}
            onChange={handleInputChange}
            onClick={() => setIsFormOpened(true)}
          />
          {isFormOpened && (
            <div className="comment-form__controls">
              <ConfirmButton value="Save" />
            </div>
          )}
        </form>
      </div>
    </OutsideClickHandler>
  )
}

CommentForm.propTypes = {
  taskId: PropTypes.string,
  text: PropTypes.string,
}

export default CommentForm
