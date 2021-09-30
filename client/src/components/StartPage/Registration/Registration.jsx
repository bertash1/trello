import React, { useState } from "react"
import ConfirmButton from "../../Common/ConfirmButton/ConfirmButton"
import "./style.sass"

const Registration = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")

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
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <p className="register-form__header">First time here?</p>
      <p className="register-form__info">Sign up for Custom Trello</p>
      <input
        onChange={handleLoginChange}
        value={login}
        type="email"
        className="register-login"
        placeholder="Your Email"
      />
      <input
        onChange={handlePasswordChange}
        value={password}
        type="password"
        className="register-password"
        placeholder="Your password"
      />
      <input
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
