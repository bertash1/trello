import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTRATION,
  GET_USER_DATA,
} from "../../actions/types"

const initialState = []

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTRATION:
      return action.payload
    case USER_LOGOUT:
      return state
    case USER_LOGIN:
      return state
    case GET_USER_DATA:
      return action.payload
    default:
      return state
  }
}
