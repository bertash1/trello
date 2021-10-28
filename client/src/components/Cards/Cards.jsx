import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getCards } from "../../actions/card"
import { getTasks } from "../../actions/task"
import Card from "../Card/Card"
import "./style.sass"

const Cards = () => {
  const dispatch = useDispatch()
  const boardId = useSelector((state) => state.boards.activeBoard._id)
  const cards = useSelector((state) => state.cards)

  useEffect(() => {
    dispatch(getCards(boardId))
    dispatch(getTasks(boardId))
  }, [dispatch, boardId])

  return (
    <div className="cards-wrapper">
      {cards.map((item) => {
        const { title, _id } = item
        return <Card title={title} cardId={_id} key={_id} />
      })}
    </div>
  )
}

export default Cards
