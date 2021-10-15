import { FETCH_CARDS, POST_CARD, CHANGE_CARD, DELETE_CARD } from "./types"
import { $api } from "../http"

export const fetchCards = (userId) => async (dispatch) => {
  const cards = await $api.get(`cards/${userId}`)
  dispatch({
    type: FETCH_CARDS,
    payload: cards,
  })
}

export const postCard = (title, userId) => async (dispatch) => {
  await $api.post(`card/${userId}`, { title })
  dispatch({
    type: POST_CARD,
  })
  dispatch(fetchCards(userId))
}

export const changeCard =
  (id, title = "", userId) =>
  async (dispatch) => {
    await $api.patch(`card/${id}`, { title })
    dispatch({ type: CHANGE_CARD })
    dispatch(fetchCards(userId))
  }

export const deleteCard = (cardId, userId) => async (dispatch) => {
  await $api.delete(`card/${cardId}/${userId}`)
  dispatch({ type: DELETE_CARD })
  dispatch(fetchCards(userId))
}
