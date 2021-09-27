import {
  POST_TASK,
  CHANGE_TASK,
  DELETE_TASK,
  CHANGE_DESCRIPTION,
  FETCH_TASK_DESCRIPTION,
  POST_TASK_DESCRIPTION,
} from "../../actions/types"

const initialState = {
  description: [],
}

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TASK:
      return state
    case CHANGE_DESCRIPTION:
      return state
    case POST_TASK:
      return state
    case POST_TASK_DESCRIPTION:
      return state
    case DELETE_TASK:
      return state
    case FETCH_TASK_DESCRIPTION:
      return { description: action.payload }
    default:
      return state
  }
}
