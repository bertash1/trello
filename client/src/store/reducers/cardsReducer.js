/* eslint-disable import/prefer-default-export */
import { FETCH_CARDS, FETCH_TASKS } from "../../actions/types"

const initialState = {
  cards: [],
  tasks: [],
}

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return { ...state, cards: action.payload, ...state.cards }
    case FETCH_TASKS:
      return { ...state, tasks: action.payload, ...state.tasks }
    default:
      return state
  }
}
