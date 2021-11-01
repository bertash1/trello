import { GET_CARDS, POST_CARD, EDIT_CARD, DELETE_CARD } from "./types"
import { $api } from "../http"

export const getCards = (boardId) => async (dispatch) => {
  const cards = await $api.get(`card/${boardId}`)
  dispatch({
    type: GET_CARDS,
    payload: cards,
  })
}

export const postCard = (title, boardId) => async (dispatch) => {
  await $api.post(`card/${boardId}`, { title })
  dispatch({
    type: POST_CARD,
  })
  dispatch(getCards(boardId))
}

export const editCard =
  (cardId, title = "", boardId) =>
  async (dispatch) => {
    await $api.patch(`card/${cardId}`, { title })
    dispatch({ type: EDIT_CARD })
    dispatch(getCards(boardId))
  }

export const deleteCard = (cardId, boardId) => async (dispatch) => {
  await $api.delete(`card/${cardId}`)
  dispatch({ type: DELETE_CARD })
  dispatch(getCards(boardId))
}
