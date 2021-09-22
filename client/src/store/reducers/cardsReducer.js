import {
  FETCH_CARDS,
  POST_CARD,
  CHANGE_CARD,
  DELETE_CARD,
} from "../../actions/types"

const initialState = {
  cards: [],
}

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return { ...state, cards: action.payload }
    case CHANGE_CARD:
      return state
    case POST_CARD:
      return state
    case DELETE_CARD:
      return state
    default:
      return state
  }
}
