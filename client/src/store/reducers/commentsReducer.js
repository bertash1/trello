import { DELETE_COMMENT, POST_COMMENT, EDIT_COMMENT } from "../../actions/types"

const initialState = null

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COMMENT:
      return state
    case POST_COMMENT:
      return state
    case EDIT_COMMENT:
      return state
    default:
      return state
  }
}
