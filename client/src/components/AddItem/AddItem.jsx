import React, { useState } from "react"
import PropTypes from "prop-types"

import AddButton from "../AddButton/AddButton"
import AddForm from "../AddForm/AddForm"

const AddItem = ({ componentType, _id }) => {
  const [isEdited, setIsEdited] = useState(false)

  const placeholderData =
    componentType === "card"
      ? "Enter card title..."
      : "Enter a title for this task..."

  const buttonTitle =
    componentType === "card" ? "Add another card" : "Add a task"

  const handleClick = () => {
    setIsEdited(!isEdited)
  }

  return (
    <>
      {!isEdited ? (
        <AddButton
          title={buttonTitle}
          handleClick={handleClick}
          buttonType={componentType}
        />
      ) : (
        <AddForm
          isEdited={isEdited}
          setIsEdited={setIsEdited}
          handleClick={handleClick}
          componentType={componentType}
          placeholder={placeholderData}
          _id={_id}
        />
      )}
    </>
  )
}

AddItem.propTypes = {
  componentType: PropTypes.string,
  _id: PropTypes.string,
}

export default AddItem
