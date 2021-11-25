import {
  GET_CARDS,
  POST_CARD,
  EDIT_CARD,
  DELETE_CARD,
  CHANGE_ORDER,
  CHANGE_LOCAL_ORDER,
  CANCEL_FETCHED_CARDS,
} from "../../actions/types"

const initialState = {
  DB: null,
  local: null,
}

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_FETCHED_CARDS:
      return action.payload
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
