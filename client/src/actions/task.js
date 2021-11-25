import {
  POST_TASK,
  DELETE_TASK,
  GET_TASK,
  EDIT_TASK,
  CANCEL_PICKED_TASK,
  GET_TASKS,
  CHANGE_TASK_LOCAL_ORDER,
  CHANGE_TASK_ORDER,
  CANCEL_FETCHED_TASKS,
} from "./types"
import { $api } from "../http"

export const cancelFetchedTasks = () => (dispatch) => {
  dispatch({
    type: CANCEL_FETCHED_TASKS,
    payload: null,
  })
}

export const changeTaskLocalOrder = (items) => (dispatch) => {
  dispatch({
    type: CHANGE_TASK_LOCAL_ORDER,
    payload: items,
  })
}

export const getTasks = (boardId) => async (dispatch) => {
  const tasks = await $api.get(`task/${boardId}`)
  const sortedTasks = tasks.sort((a, b) => (a.position > b.position ? 1 : -1))
  dispatch({
    type: GET_TASKS,
    payload: sortedTasks,
  })
}

export const cancelPickedTask = () => ({
  type: CANCEL_PICKED_TASK,
  payload: [],
})

export const postTask = (title, cardId, boardId) => async (dispatch) => {
  await $api.post(`task/${cardId}/${boardId}`, { title })
  await dispatch({
    type: POST_TASK,
  })
  dispatch(getTasks(boardId))
}

export const getTask = (taskId) => async (dispatch) => {
  const task = await $api.get(`task/info/${taskId}`)
  dispatch({
    type: GET_TASK,
    payload: task,
  })
}

export const editTask = (taskId, newTask, boardId) => async (dispatch) => {
  const { title, description } = newTask
  await $api.patch(`task/${taskId}`, { title, description })
  await dispatch({ type: EDIT_TASK })
  await dispatch(getTask(taskId))
  await dispatch(getTasks(boardId))
}

export const deleteTask = (id, boardId) => async (dispatch) => {
  await $api.delete(`task/${id}`)
  await dispatch({ type: DELETE_TASK })
  dispatch(getTasks(boardId))
}

export const changeTaskOrder =
  (taskId, newPosition, oldPosition, oldCardId, newCardId) =>
  async (dispatch) => {
    await $api.patch(`task/changeorder/${taskId}`, {
      newPosition,
      oldPosition,
      oldCardId,
      newCardId,
    })

    dispatch({
      type: CHANGE_TASK_ORDER,
    })
  }
