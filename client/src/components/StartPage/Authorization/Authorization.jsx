import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import { userLogin, getUserData } from "../../../actions/user"
import ConfirmButton from "../../Common/ConfirmButton/ConfirmButton"
import "./style.sass"

const Authorization = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const history = useHistory()

  const handleLoginChange = ({ target }) => {
    setLogin(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(userLogin(login, password))
    await dispatch(getUserData())
    history.push("/dashboard")
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        required
        onChange={handleLoginChange}
        value={login}
        type="email"
        className="auth-login"
        placeholder="Email"
      />
      <input
        required
        onChange={handlePasswordChange}
        value={password}
        type="password"
        className="auth-password"
        placeholder="Password"
      />
      <ConfirmButton value="Sign in" />
    </form>
  )
}

export default Authorization
