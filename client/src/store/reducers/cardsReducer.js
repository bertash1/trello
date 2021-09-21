import {
  FETCH_CARDS,
  POST_ITEM,
  CHANGE_ITEM,
  DELETE_ITEM,
} from "../../actions/types"

const initialState = {
  cards: [],
}

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return { ...state, cards: action.payload }
    case POST_ITEM:
      return state
    case CHANGE_ITEM:
      return state
    case DELETE_ITEM:
      return state
    default:
      return state
  }
}
