/* eslint-disable import/prefer-default-export */
import { FETCH_CARDS, FETCH_TASKS } from "./types"
import { URL } from "../constants"

export const fetchCards = () => async (dispatch) => {
  try {
    const data = await fetch(`${URL}/cards/`)
    const cards = await data.json()

    dispatch({
      type: FETCH_CARDS,
      payload: cards,
    })
  } catch (err) {
    console.log(err)
  }
}

export const fetchTasks = (_id) => async (dispatch) => {
  try {
    const data = await fetch(`${URL}/tasks/${_id}`)
    const tasks = await data.json()

    dispatch({
      type: FETCH_TASKS,
      payload: tasks,
    })
  } catch (err) {
    console.log(err)
  }
}
