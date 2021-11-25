import {
  POST_TASK,
  GET_TASK,
  EDIT_TASK,
  CANCEL_PICKED_TASK,
  DELETE_TASK,
  GET_TASKS,
  CHANGE_TASK_LOCAL_ORDER,
  CHANGE_TASK_ORDER,
  CANCEL_FETCHED_TASKS,
} from "../../actions/types"

const initialState = { pickedTask: {}, tasks: null }

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_FETCHED_TASKS:
      return { ...state, tasks: action.payload }
    case CHANGE_TASK_ORDER:
      return state
    case CHANGE_TASK_LOCAL_ORDER:
      return { ...state, tasks: action.payload }
    case EDIT_TASK:
      return state
    case GET_TASKS:
      return { ...state, tasks: action.payload }
    case GET_TASK:
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
