import { GET_BOARD, GET_USER_BOARDS } from "./types"
import { $api } from "../http"

export const getUserBoards = (userId) => async (dispatch) => {
  const userBoards = await $api.get(`board/userBoards/${userId}`)
  dispatch({
    type: GET_USER_BOARDS,
    payload: userBoards,
  })
}

export const getBoard = (boardId) => async (dispatch) => {
  const board = await $api.get(`board/${boardId}`)
  dispatch({
    type: GET_BOARD,
    payload: board,
  })
}
