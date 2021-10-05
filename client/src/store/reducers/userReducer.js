import { USER_LOGIN, USER_LOGOUT, USER_REGISTRATION } from "../../actions/types"

const initialState = {}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTRATION:
      return { user: action.payload }
    case USER_LOGOUT:
      return state
    case USER_LOGIN:
      return { user: action.payload }
    default:
      return state
  }
}
