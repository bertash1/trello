import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"

import AddButton from "../../Common/AddButton/AddButton"
import Form from "../../Common/Form/Form"
import { postTask } from "../../../actions/task"

const AddTask = ({ _id }) => {
  const [isEdited, setIsEdited] = useState(false)
  const [newItem, setNewItem] = useState("")
  const dispatch = useDispatch()

  const handleClick = () => {
    setIsEdited(!isEdited)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newItem) {
      dispatch(postTask(newItem, _id))
      setNewItem("")
    }
  }

  const handleInputChange = (e) => {
    setNewItem(e.target.value)
  }

  if (!isEdited) {
    return <AddButton handleClick={handleClick} type="task" />
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
      type="task"
    />
  )
}

AddTask.propTypes = {
  _id: PropTypes.string,
}

export default AddTask
