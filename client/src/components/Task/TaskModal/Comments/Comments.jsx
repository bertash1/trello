import React from "react"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import { grey } from "@mui/material/colors"

import Comment from "./Comment/Comment"
import "./style.sass"

const Comments = ({ taskId }) => {
  const comments = useSelector((state) => state.task.pickedTask.comments)

  return (
    <div className="comments-wrapper">
      <div className="comments__title-wrapper">
        <FormatListBulletedIcon sx={{ color: grey[700] }} fontSize="small" />
        <div className="comments__title">Activity</div>
      </div>
      <div className="comments">
        {comments &&
          comments.map(({ _id, author, createdAt, updatedAt, text }) => (
            <Comment
              key={_id}
              commentId={_id}
              text={text}
              author={author}
              createdAt={createdAt}
              taskId={taskId}
              updatedAt={updatedAt}
            />
          ))}
      </div>
    </div>
  )
}

Comments.propTypes = {
  taskId: PropTypes.string,
}

export default Comments
