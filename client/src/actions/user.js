import { USER_REGISTRATION, USER_LOGIN, GET_USER_DATA } from "./types"
import { $api } from "../http"

export const userRegistration = (email, password) => async (dispatch) => {
  const user = await $api.post("/registration", { email, password })
  localStorage.setItem("token", user.accessToken)
  dispatch({
    type: USER_REGISTRATION,
    payload: user,
  })
}

export const userLogin = (email, password) => async (dispatch) => {
  const user = await $api.post("login", { email, password })
  localStorage.setItem("token", user.accessToken)
  dispatch({
    type: USER_LOGIN,
    payload: user,
  })
}

export const getUserData = () => async (dispatch) => {
  const userData = await $api.get("userdata")

  dispatch({
    type: GET_USER_DATA,
    payload: userData,
  })
}
