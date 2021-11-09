import {
  GET_CARDS,
  POST_CARD,
  EDIT_CARD,
  DELETE_CARD,
  CHANGE_ORDER,
  CHANGE_LOCAL_ORDER,
} from "./types"
import { $api } from "../http"

export const getCards = (boardId) => async (dispatch) => {
  const cards = await $api.get(`card/${boardId}`)
  const sortedCards = cards.sort((a, b) => (a.position > b.position ? 1 : -1))
  dispatch({
    type: GET_CARDS,
    payload: sortedCards,
  })
}

export const changeOrder =
  (cardId, newPosition, oldPosition, boardId) => async (dispatch) => {
    await $api.patch(`card/changeorder/${cardId}`, {
      newPosition,
      oldPosition,
      boardId,
    })

    await dispatch({
      type: CHANGE_ORDER,
    })
  }

export const changeLocalOrder = (items) => (dispatch) => {
  dispatch({
    type: CHANGE_LOCAL_ORDER,
    payload: items,
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
