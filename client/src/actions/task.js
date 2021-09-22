import { POST_TASK, CHANGE_TASK, DELETE_TASK } from "./types"
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

export const changeTask =
  (taskId, title = "") =>
  async (dispatch) => {
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
      dispatch({ type: CHANGE_TASK })
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
