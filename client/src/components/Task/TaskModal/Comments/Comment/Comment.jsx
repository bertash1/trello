import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"

import { editComment } from "src/actions/comment"
import EditForm from "./EditForm/EditForm"
import Info from "./Info/Info"
import Controls from "./Controls/Controls"
import "./style.sass"

const Comment = ({ text, author, commentId, createdAt, updatedAt, taskId }) => {
  const [isCommentEditing, setIsCommentEditing] = useState(false)

  const [inputValue, setInputValue] = useState(text)

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const dispatch = useDispatch()

  const hadleEditFormSubmit = (e) => {
    e.preventDefault()
    dispatch(editComment(commentId, inputValue, taskId))
    setIsCommentEditing(false)
  }

  return (
    <div className="comment">
      <div className="comment__user-icon">{author.email[0].toUpperCase()}</div>
      <div className="comment__info">
        <Info createdAt={createdAt} updatedAt={updatedAt} author={author} />
        {isCommentEditing ? (
          <EditForm
            text={text}
            hadleEditFormSubmit={hadleEditFormSubmit}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
          />
        ) : (
          <>
            <div className="comment__text">{text}</div>
            <Controls
              commentId={commentId}
              author={author}
              taskId={taskId}
              setIsCommentEditing={setIsCommentEditing}
              hadleEditFormSubmit={hadleEditFormSubmit}
            />
          </>
        )}
      </div>
    </div>
  )
}
Comment.propTypes = {
  text: PropTypes.string,
  author: PropTypes.object,
  commentId: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  taskId: PropTypes.string,
}

export default Comment
