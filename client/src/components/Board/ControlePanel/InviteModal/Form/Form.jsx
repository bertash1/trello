import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { addBoardUser } from "src/actions/board"
import ConfirmButton from "src/components/Common/ConfirmButton/ConfirmButton"
import Input from "src/components/Common/Input/Input"
import "./style.sass"

const Form = ({ handleButtonClick }) => {
  const [inputValue, setInputValue] = useState("")
  const dispatch = useDispatch()
  const { boardId } = useParams()

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addBoardUser(inputValue, boardId))
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
