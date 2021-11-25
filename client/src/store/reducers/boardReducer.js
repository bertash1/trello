import {
  GET_USER_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  ADD_BOARD_USER,
  DELETE_BOARD_USER,
  CANCEL_FETCHED_BOARDS,
  CANCEL_FETCHED_ACTIVE_BOARD,
  CANCEL_FETCHED_USER_BOARDS,
} from "../../actions/types"

const initialState = { activeBoard: null, userBoards: null }

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_FETCHED_USER_BOARDS:
      return { ...state, userBoards: action.payload }
    case CANCEL_FETCHED_ACTIVE_BOARD:
      return { ...state, activeBoard: action.payload }
    case CANCEL_FETCHED_BOARDS:
      return action.payload
    case ADD_BOARD_USER:
      return { ...state, activeBoard: action.payload }
    case DELETE_BOARD_USER:
      return { ...state, activeBoard: action.payload }
    case GET_USER_BOARDS:
      return { ...state, userBoards: action.payload }
    case ADD_BOARD:
      return { ...state, activeBoard: action.payload }
    case GET_BOARD:
      return action.payload
    default:
      return state
  }
}
