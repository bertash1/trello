import {
  GET_CARDS,
  POST_CARD,
  EDIT_CARD,
  DELETE_CARD,
  CHANGE_ORDER,
  CHANGE_LOCAL_ORDER,
} from "../../actions/types"

const initialState = {
  DB: [],
  local: [],
}

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ORDER:
      return state
    case GET_CARDS:
      return { DB: action.payload, local: action.payload }
    case CHANGE_LOCAL_ORDER:
      return { ...state, local: action.payload }
    case EDIT_CARD:
      return state
    case POST_CARD:
      return state
    case DELETE_CARD:
      return state
    default:
      return state
  }
}
