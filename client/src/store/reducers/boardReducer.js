import { GET_USER_BOARDS, GET_BOARD, ADD_BOARD } from "../../actions/types"

const initialState = { activeBoard: {}, userBoards: [] }

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BOARDS:
      return { ...state, userBoards: action.payload }
    case ADD_BOARD:
      return { ...state, activeBoard: action.payload }
    case GET_BOARD:
      return { ...state, activeBoard: action.payload }
    default:
      return state
  }
}
