import { GET_BOARD, GET_USER_BOARDS, ADD_BOARD } from "./types"
import { $api } from "../http"

export const getUserBoards = () => async (dispatch) => {
  const userBoards = await $api.get(`board/userBoards`)
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

export const addBoard = (title) => async (dispatch) => {
  const board = await $api.post(`board`, { title })
  dispatch({
    type: ADD_BOARD,
    payload: board,
  })
}
