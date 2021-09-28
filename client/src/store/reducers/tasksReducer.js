import {
  POST_TASK,
  CHANGE_TASK_DESCRIPTION,
  CHANGE_TASK_TITLE,
  DELETE_TASK,
  FETCH_TASK_DESCRIPTION,
  CANCEL_TASK_DESCRIPTION,
} from "../../actions/types"

const initialState = { description: "" }

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TASK_DESCRIPTION:
      return { description: action.payload }
    case CANCEL_TASK_DESCRIPTION:
      return { description: "" }
    case CHANGE_TASK_TITLE:
      return state
    case POST_TASK:
      return state
    case DELETE_TASK:
      return state
    case FETCH_TASK_DESCRIPTION:
      return { description: action.payload }
    default:
      return state
  }
}
