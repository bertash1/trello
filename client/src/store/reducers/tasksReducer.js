import {
  POST_TASK,
  FETCH_TASK,
  CHANGE_TASK,
  CANCEL_PICKED_TASK,
  DELETE_TASK,
} from "../../actions/types"

const initialState = { pickedTask: {} }

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TASK:
      return state
    case FETCH_TASK:
      return { pickedTask: action.payload }
    case CANCEL_PICKED_TASK:
      return { pickedTask: {} }
    case POST_TASK:
      return state
    case DELETE_TASK:
      return state
    default:
      return state
  }
}
