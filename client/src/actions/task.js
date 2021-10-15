import {
  POST_TASK,
  DELETE_TASK,
  FETCH_TASK,
  CHANGE_TASK,
  CANCEL_PICKED_TASK,
} from "./types"
import { fetchCards } from "./card"
import { $api } from "../http"

export const cancelPickedTask = () => ({
  type: CANCEL_PICKED_TASK,
  payload: [],
})

export const postTask = (title, cardId, userId) => async (dispatch) => {
  await $api.post(`task/${cardId}`, { title })
  await dispatch({
    type: POST_TASK,
  })
  dispatch(fetchCards(userId))
}

export const fetchTask = (taskId) => async (dispatch) => {
  const task = await $api.get(`task/${taskId}`)
  dispatch({
    type: FETCH_TASK,
    payload: task,
  })
}

export const changeTask = (taskId, newTask, userId) => async (dispatch) => {
  const { title, description } = newTask
  await $api.patch(`task/${taskId}`, { title, description })
  dispatch({ type: CHANGE_TASK })
  dispatch(fetchTask(taskId))
  dispatch(fetchCards(userId))
}

export const deleteTask = (cardId, id, userId) => async (dispatch) => {
  await $api.delete(`task/${cardId}/${id}`)
  dispatch({ type: DELETE_TASK })
  dispatch(fetchCards(userId))
}
