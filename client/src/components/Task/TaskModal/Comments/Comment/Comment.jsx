import React from "react"
import PropTypes from "prop-types"

import Info from "./Info/Info"
import Controls from "./Controls/Controls"
import "./style.sass"

const Comment = ({ text, author, commentId, createdAt, updatedAt, taskId }) => (
  <div className="comment">
    <div className="comment__user-icon">{author.email[0].toUpperCase()}</div>
    <div className="comment__info">
      <Info createdAt={createdAt} updatedAt={updatedAt} author={author} />
      <div className="comment__text">{text}</div>
      <Controls commentId={commentId} author={author} taskId={taskId} />
    </div>
  </div>
)

Comment.propTypes = {
  text: PropTypes.string,
  author: PropTypes.object,
  commentId: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  taskId: PropTypes.string,
}

export default Comment
