import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"

import { getCards } from "../../actions/card"
import { getTasks } from "../../actions/task"
import Card from "../Card/Card"
import "./style.sass"

const Cards = ({ userId }) => {
  const dispatch = useDispatch()
  const cards = useSelector((state) => state.cards)

  useEffect(() => {
    dispatch(getCards(userId))
    dispatch(getTasks())
  }, [dispatch, userId])

  return (
    <div className="cards-wrapper">
      {cards.map((item) => {
        const { title, _id } = item
        return <Card title={title} _id={_id} key={_id} />
      })}
    </div>
  )
}

Cards.propTypes = {
  userId: PropTypes.string,
}

export default Cards
