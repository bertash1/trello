import React, { useState } from "react"

import "./style.sass"
import BoardModal from "../BoardModal/BoardModal"

const AddBoard = () => {
  const [isMenuShown, setIsMenuShown] = useState(false)

  const handleShowMenu = () => {
    setIsMenuShown((prev) => !prev)
  }

  return (
    <>
      <div className="add-board" onClick={handleShowMenu} role="none">
        <span className="add-board-title">Create new board</span>
      </div>
      {isMenuShown && <BoardModal handleShowMenu={handleShowMenu} />}
    </>
  )
}

export default AddBoard
