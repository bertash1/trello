import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"

import ConfirmButton from "src/components/Common/ConfirmButton/ConfirmButton"
import "./style.sass"

const EditForm = ({ hadleEditFormSubmit, handleInputChange, inputValue }) => {
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <form className="edit-form__form" onSubmit={hadleEditFormSubmit}>
      <input
        className="edit-form__input"
        type="text"
        value={inputValue}
        placeholder="Write a comment..."
        ref={inputRef}
        onChange={handleInputChange}
      />

      <div className="edit-form__controls">
        <ConfirmButton value="Save" />
      </div>
    </form>
  )
}

EditForm.propTypes = {
  hadleEditFormSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
  inputValue: PropTypes.string,
}

export default EditForm
