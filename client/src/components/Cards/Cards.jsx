/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchCards } from "../../actions"
import Card from "../Card/Card"
import "./style.sass"

const Cards = () => {
  const dispatch = useDispatch()
  const { cards } = useSelector((state) => state.cards)

  useEffect(() => {
    dispatch(fetchCards())
  }, [dispatch])

  return (
    <div className="cards-wrapper">
      {cards &&
        cards.map((item) => {
          const { title, _id } = item
          return <Card title={title} _id={_id} key={_id} />
        })}
    </div>
  )
}

export default Cards
