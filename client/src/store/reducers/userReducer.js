import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTRATION,
  GET_USER_DATA,
  CANCEL_USER_DATA,
} from "../../actions/types"

const initialState = null

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_USER_DATA:
      return action.payload
    case USER_REGISTRATION:
      return action.payload
    case USER_LOGOUT:
      return []
    case USER_LOGIN:
      return state
    case GET_USER_DATA:
      return action.payload
    default:
      return state
  }
}
