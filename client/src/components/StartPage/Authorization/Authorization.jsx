import React, { useState } from "react"

import ConfirmButton from "../../ConfirmButton/ConfirmButton"
import "./style.sass"

const Authorization = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const handleLoginChange = ({ target }) => {
    setLogin(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        onChange={handleLoginChange}
        value={login}
        type="email"
        className="auth-login"
        placeholder="Email"
      />
      <input
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
