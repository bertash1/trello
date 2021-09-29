import {
  POST_TASK,
  DELETE_TASK,
  FETCH_TASK,
  CHANGE_TASK,
  CANCEL_PICKED_TASK,
} from "./types"
import { fetchCards } from "./card"

export const cancelPickedTask = () => ({
  type: CANCEL_PICKED_TASK,
  payload: [],
})

export const postTask = (title, cardId) => async (dispatch) => {
  try {
    await fetch(`${process.env.REACT_APP_URL}/task/${cardId}`, {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })

    dispatch({
      type: POST_TASK,
    })
    dispatch(fetchCards())
  } catch (err) {
    console.log(err)
  }
}

export const fetchTask = (taskId) => async (dispatch) => {
  try {
    const data = await fetch(`${process.env.REACT_APP_URL}/task/${taskId}`)
    const task = await data.json()

    dispatch({
      type: FETCH_TASK,
      payload: task,
    })
  } catch (err) {
    console.log(err)
  }
}

export const changeTask = (taskId, newTask) => async (dispatch) => {
  try {
    await fetch(`${process.env.REACT_APP_URL}/task/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: newTask.title,
        description: newTask.description,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
    dispatch({ type: CHANGE_TASK })
    dispatch(fetchTask(taskId))
    dispatch(fetchCards())
  } catch (err) {
    console.log(err)
  }
}

export const deleteTask = (cardId, id) => async (dispatch) => {
  try {
    await fetch(`${process.env.REACT_APP_URL}/task/${cardId}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
    dispatch({ type: DELETE_TASK })
    dispatch(fetchCards())
  } catch (err) {
    console.log(err)
  }
}
