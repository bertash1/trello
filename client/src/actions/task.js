import {
  POST_TASK,
  DELETE_TASK,
  GET_TASK,
  EDIT_TASK,
  CANCEL_PICKED_TASK,
  GET_TASKS,
} from "./types"
import { $api } from "../http"

export const getTasks = () => async (dispatch) => {
  const tasks = await $api.get(`task`)
  dispatch({
    type: GET_TASKS,
    payload: tasks,
  })
}

export const cancelPickedTask = () => ({
  type: CANCEL_PICKED_TASK,
  payload: [],
})

export const postTask = (title, cardId) => async (dispatch) => {
  await $api.post(`task/${cardId}`, { title })
  await dispatch({
    type: POST_TASK,
  })
  dispatch(getTasks())
}

export const getTask = (taskId) => async (dispatch) => {
  const task = await $api.get(`task/${taskId}`)
  dispatch({
    type: GET_TASK,
    payload: task,
  })
}

export const editTask = (taskId, newTask) => async (dispatch) => {
  const { title, description } = newTask
  await $api.patch(`task/${taskId}`, { title, description })
  dispatch({ type: EDIT_TASK })
  dispatch(getTask(taskId))
  dispatch(getTasks())
}

export const deleteTask = (id) => async (dispatch) => {
  await $api.delete(`task/${id}`)
  dispatch({ type: DELETE_TASK })
  dispatch(getTasks())
}
