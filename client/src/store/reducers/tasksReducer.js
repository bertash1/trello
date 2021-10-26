import {
  POST_TASK,
  FETCH_TASK,
  CHANGE_TASK,
  CANCEL_PICKED_TASK,
  DELETE_TASK,
  GET_TASKS,
} from "../../actions/types"

const initialState = { pickedTask: {}, tasks: [] }

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TASK:
      return state
    case GET_TASKS:
      return { ...state, tasks: action.payload }
    case FETCH_TASK:
      return { ...state, pickedTask: action.payload }
    case CANCEL_PICKED_TASK:
      return { ...state, pickedTask: {} }
    case POST_TASK:
      return state
    case DELETE_TASK:
      return state
    default:
      return state
  }
}
