import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import "./style.sass"

import CloseButton from "../CloseButton/CloseButton"
import ConfirmButton from "../ConfirmButton/ConfirmButton"

const AddCard = ({ title }) => {
  const [isOpened, setIsOpened] = useState(false)
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
    setIsOpened(!isOpened)
  }

  useEffect(() => {
    if (isOpened && !newCard) {
      textRef.current.focus()
    }
    if (!isOpened) {
      setNewCard("")
    }
  }, [isOpened, newCard])

  return (
    <>
      {!isOpened ? (
        <button className="addCard-btn" type="button" onClick={handleClick}>
          <span className="addCard-btn__hor-line" />
          <span className="addCard-btn__vert-line" />
          <span className="addCard-btn__title">{title}</span>
        </button>
      ) : (
        <form className="addCard-form" onSubmit={handleSubmit}>
          <input
            className="addCard-form__input"
            type="text"
            placeholder="Enter card title..."
            ref={textRef}
            onChange={handleInputChange}
            value={newCard}
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

AddCard.propTypes = {
  title: PropTypes.string,
}

export default AddCard
