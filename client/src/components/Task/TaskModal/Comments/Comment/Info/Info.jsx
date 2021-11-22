import React from "react"
import PropTypes from "prop-types"

import "./style.sass"

const Info = ({ author, updatedAt, createdAt }) => {
  const createdDate = new Date(createdAt)
  const day = createdDate.toLocaleDateString()
  const time = createdDate.toLocaleTimeString()

  return (
    <div className="comment__comment-info">
      <div className="comment__user">{author.email}</div>
      <div className="comment__date">
        <div className="comment__day">{day}</div>
        <div className="comment__date-separator">at</div>
        <div className="comment_time">{time}</div>
        {updatedAt !== createdAt && (
          <div className="comment_is-edited">(edited)</div>
        )}
      </div>
    </div>
  )
}

Info.propTypes = {
  author: PropTypes.object,
  updatedAt: PropTypes.string,
  createdAt: PropTypes.string,
}

export default Info
