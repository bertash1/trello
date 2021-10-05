import { USER_REGISTRATION, USER_LOGIN } from "./types"

export const userRegistration = (email, password) => async (dispatch) => {
  try {
    const data = await fetch(`${process.env.REACT_APP_URL}/registration`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    const user = await data.json()
    localStorage.setItem("token", user.accessToken)

    dispatch({
      type: USER_REGISTRATION,
      payload: user,
    })
  } catch (err) {
    console.log(err)
  }
}

export const userLogin = (email, password) => async (dispatch) => {
  try {
    const data = await fetch(`${process.env.REACT_APP_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    const user = await data.json()
    localStorage.setItem("token", user.accessToken)

    dispatch({
      type: USER_LOGIN,
      payload: user,
    })
  } catch (err) {
    console.log(err)
  }
}
