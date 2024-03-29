import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import AddButton from "src/components/Common/AddButton/AddButton"
import Form from "src/components/Common/Form/Form"
import { postCard } from "src/actions/card"

const AddCard = () => {
  const [isEdited, setIsEdited] = useState(false)
  const [newItem, setNewItem] = useState("")
  const dispatch = useDispatch()

  const { boardId } = useParams()

  const handleClick = () => {
    setIsEdited(!isEdited)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newItem) {
      dispatch(postCard(newItem, boardId))
      setNewItem("")
    }
  }

  const handleInputChange = (e) => {
    setNewItem(e.target.value)
  }

  if (!isEdited) {
    return <AddButton handleClick={handleClick} type="card" />
  }

  return (
    <Form
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      setNewItem={setNewItem}
      newItem={newItem}
      isEdited={isEdited}
      setIsEdited={setIsEdited}
      handleClick={handleClick}
      type="card"
    />
  )
}

export default AddCard
