import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchCards } from "../../actions/card"
import Card from "../Card/Card"
import "./style.sass"

const Cards = () => {
  const dispatch = useDispatch()
  const { cards = [] } = useSelector((state) => state.cards)

  useEffect(() => {
    dispatch(fetchCards())
  }, [dispatch])

  return (
    <div className="cards-wrapper">
      {cards.map((item) => {
        const { title, _id, tasks } = item
        return <Card title={title} _id={_id} key={_id} cardTasks={tasks} />
      })}
    </div>
  )
}

export default Cards
