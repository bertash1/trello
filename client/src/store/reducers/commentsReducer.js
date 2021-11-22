import { DELETE_COMMENT } from "../../actions/types"

const initialState = {}

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COMMENT:
      return state
    default:
      return state
  }
}
