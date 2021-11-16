import React, { useState } from "react"
import PropTypes from "prop-types"

import Input from "../../../../Common/Input/Input"
import ConfirmButton from "../../../../Common/ConfirmButton/ConfirmButton"
import "./style.sass"

const Form = ({ handleButtonClick }) => {
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setInputValue("")
    handleButtonClick()
  }

  return (
    <form className="invite-modal__form" onSubmit={handleSubmit}>
      <Input
        placeholder="Enter email"
        value={inputValue}
        handleInputChange={handleInputChange}
      />
      <ConfirmButton />
    </form>
  )
}

Form.propTypes = {
  handleButtonClick: PropTypes.func,
}

export default Form
