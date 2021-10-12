import React, { useState } from "react"
import { useDispatch } from "react-redux"
import ConfirmButton from "../../Common/ConfirmButton/ConfirmButton"
import { userRegistration } from "../../../actions/user"
import "./style.sass"

const Registration = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")

  const dispatch = useDispatch()

  const handleLoginChange = ({ target }) => {
    setLogin(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleConfirmedPasswordChange = ({ target }) => {
    setConfirmedPassword(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === confirmedPassword) {
      dispatch(userRegistration(login, password))
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <p className="register-form__header">First time here?</p>
      <p className="register-form__info">Sign up for Custom Trello</p>
      <input
        required
        onChange={handleLoginChange}
        value={login}
        type="email"
        className="register-login"
        placeholder="Your Email"
      />
      <input
        required
        onChange={handlePasswordChange}
        value={password}
        type="password"
        className="register-password"
        placeholder="Your password"
      />
      <input
        required
        onChange={handleConfirmedPasswordChange}
        value={confirmedPassword}
        type="password"
        className="register-password"
        placeholder="Confirm your password"
      />
      <ConfirmButton value="Sign Up" />
    </form>
  )
}

export default Registration
