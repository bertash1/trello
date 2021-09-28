import {
  POST_TASK,
  DELETE_TASK,
  FETCH_TASK_DESCRIPTION,
  CHANGE_TASK_TITLE,
  CHANGE_TASK_DESCRIPTION,
  CANCEL_TASK_DESCRIPTION,
} from "./types"
import { fetchCards } from "./card"

export const cancelDescription = () => ({
  type: CANCEL_TASK_DESCRIPTION,
  payload: "",
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

export const changeTaskTitle = (taskId, title) => async (dispatch) => {
  try {
    await fetch(`${process.env.REACT_APP_URL}/task/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
    dispatch({ type: CHANGE_TASK_TITLE })
    dispatch(fetchCards())
  } catch (err) {
    console.log(err)
  }
}

export const changeTaskDescription =
  (taskId, description) => async (dispatch) => {
    try {
      await fetch(`${process.env.REACT_APP_URL}/task/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          description,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
      dispatch({ type: CHANGE_TASK_DESCRIPTION, payload: description })
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
