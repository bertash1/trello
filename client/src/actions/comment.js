import { DELETE_COMMENT, EDIT_COMMENT, POST_COMMENT } from "./types"
import { $api } from "../http"
import { getTask } from "./task"

export const deleteComment = (commentId, taskId) => async (dispatch) => {
  await $api.delete(`comment/${commentId}`)

  dispatch({
    type: DELETE_COMMENT,
  })
  dispatch(getTask(taskId))
}

export const editComment = (commentId, text, taskId) => async (dispatch) => {
  await $api.patch("comment", { commentId, text })

  dispatch({
    type: EDIT_COMMENT,
  })
  dispatch(getTask(taskId))
}

export const postComment =
  (text, authorId, taskId, boardId) => async (dispatch) => {
    await $api.post(`comment/${boardId}`, { text, authorId, taskId })

    dispatch({
      type: POST_COMMENT,
    })
  }
