import {
  GET_CARDS,
  POST_CARD,
  EDIT_CARD,
  DELETE_CARD,
} from "../../actions/types"

const initialState = []

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return action.payload
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
