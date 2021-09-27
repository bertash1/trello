import {
  POST_TASK,
  CHANGE_TASK,
  DELETE_TASK,
  CHANGE_DESCRIPTION,
  FETCH_TASK_DESCRIPTION,
  POST_TASK_DESCRIPTION,
} from "./types"
import { fetchCards } from "./card"

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

export const fetchTaskDescription = (taskId) => async (dispatch) => {
  try {
    const data = await fetch(
      `${process.env.REACT_APP_URL}/description/${taskId}`
    )
    const description = await data.json()

    dispatch({
      type: FETCH_TASK_DESCRIPTION,
      payload: description,
    })
  } catch (err) {
    console.log(err)
  }
}

export const changeTask = (taskId, title, description) => async (dispatch) => {
  try {
    await fetch(`${process.env.REACT_APP_URL}/task/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        description,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
    dispatch({ type: CHANGE_TASK })
    dispatch(fetchCards())
  } catch (err) {
    console.log(err)
  }
}

export const changeDescription =
  (descriptionId, description = "", taskId) =>
  async (dispatch) => {
    try {
      await fetch(`${process.env.REACT_APP_URL}/description/${descriptionId}`, {
        method: "PATCH",
        body: JSON.stringify({
          description,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
      dispatch({ type: CHANGE_DESCRIPTION })
      dispatch(fetchTaskDescription(taskId))
    } catch (err) {
      console.log(err)
    }
  }

export const postTaskDescription =
  (description = "", taskId) =>
  async (dispatch) => {
    try {
      await fetch(`${process.env.REACT_APP_URL}/description/${taskId}`, {
        method: "POST",
        body: JSON.stringify({
          description,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
      dispatch({ type: POST_TASK_DESCRIPTION })
      dispatch(fetchTaskDescription(taskId))
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
