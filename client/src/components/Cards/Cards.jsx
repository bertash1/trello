import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"

import { fetchCards } from "../../actions/card"
import Card from "../Card/Card"
import "./style.sass"

const Cards = ({ userId }) => {
  const dispatch = useDispatch()
  const { cards = [] } = useSelector((state) => state.cards)

  useEffect(() => {
    dispatch(fetchCards(userId))
  }, [dispatch, userId])

  return (
    <div className="cards-wrapper">
      {cards.map((item) => {
        const { title, _id, tasks } = item
        return <Card title={title} _id={_id} key={_id} cardTasks={tasks} />
      })}
    </div>
  )
}

Cards.propTypes = {
  userId: PropTypes.string,
}

export default Cards
