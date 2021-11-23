import React from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import { deleteComment } from "src/actions/comment"
import "./style.sass"

const Controls = ({ taskId, commentId, author }) => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.userData._id)

  const handleDelete = () => {
    dispatch(deleteComment(commentId, taskId))
  }

  if (author._id !== userId) return null

  return (
    <div className="comment__controls">
      <div className="comment__action" role="none">
        Edit
      </div>
      <div className="comment__action" onClick={handleDelete} role="none">
        Delete
      </div>
    </div>
  )
}

Controls.propTypes = {
  taskId: PropTypes.string,
  commentId: PropTypes.string,
  author: PropTypes.object,
}

export default Controls
