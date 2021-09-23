import {
  POST_TASK,
  CHANGE_TASK,
  DELETE_TASK,
  CHANGE_DESCRIPTION,
} from "../../actions/types"

const initialState = {}

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TASK:
      return state
    case CHANGE_DESCRIPTION:
      return state
    case POST_TASK:
      return state
    case DELETE_TASK:
      return state
    default:
      return state
  }
}
