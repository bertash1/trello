import { GET_CARDS, POST_CARD, EDIT_CARD, DELETE_CARD } from "./types"
import { $api } from "../http"

export const getCards = (userId) => async (dispatch) => {
  const cards = await $api.get(`card/${userId}`)
  dispatch({
    type: GET_CARDS,
    payload: cards,
  })
}

export const postCard = (title, userId) => async (dispatch) => {
  await $api.post(`card/${userId}`, { title })
  dispatch({
    type: POST_CARD,
  })
  dispatch(getCards(userId))
}

export const editCard =
  (id, title = "", userId) =>
  async (dispatch) => {
    await $api.patch(`card/${id}`, { title })
    dispatch({ type: EDIT_CARD })
    dispatch(getCards(userId))
  }

export const deleteCard = (cardId, userId) => async (dispatch) => {
  await $api.delete(`card/${cardId}/${userId}`)
  dispatch({ type: DELETE_CARD })
  dispatch(getCards(userId))
}
