import React, { useState, useRef, useEffect } from "react"
import "./style.sass"

import CloseButton from "../CloseButton/CloseButton"
import ConfirmButton from "../ConfirmButton/ConfirmButton"
import AddButton from "../AddButton/AddButton"
import Input from "../Input/Input"

const AddCard = () => {
  const [isEdited, setIsEdited] = useState(false)
  const [newCard, setNewCard] = useState("")
  const textRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newCard) {
      setNewCard("")
    } else {
      textRef.current.focus()
    }
  }

  const handleInputChange = (e) => {
    setNewCard(e.target.value)
  }

  const handleClick = () => {
    setIsEdited(!isEdited)
  }

  useEffect(() => {
    if (isEdited && !newCard) {
      textRef.current.focus()
    }
    if (!isEdited) {
      setNewCard("")
    }
  }, [isEdited, newCard])

  return (
    <>
      {!isEdited ? (
        <AddButton
          title="Add another card"
          handleClick={handleClick}
          buttonType="card"
        />
      ) : (
        <form className="addCard-form" onSubmit={handleSubmit}>
          <Input
            placeholder="Enter card title..."
            textRef={textRef}
            handleInputChange={handleInputChange}
            value={newCard}
            componentType="card"
            setIsEdited={setIsEdited}
          />
          <div className="addCard-form__controls">
            <div className="addCard-form__btn-wrapper">
              <ConfirmButton value="Add card" />
              <CloseButton handleClick={handleClick} />
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default AddCard
