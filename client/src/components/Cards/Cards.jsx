/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { getCards, changeOrder, changeLocalOrder } from "../../actions/card"
import { getTasks } from "../../actions/task"
import Card from "../Card/Card"
import "./style.sass"

const Cards = () => {
  const dispatch = useDispatch()

  const localCards = useSelector((state) => state.cards.local)
  const { boardId } = useParams()

  const handleOnDragEnd = useCallback(
    async (result) => {
      if (!result.destination) return
      const elements = Array.from(localCards)
      const [reorderedElement] = elements.splice(result.source.index, 1)
      elements.splice(result.destination.index, 0, reorderedElement)

      dispatch(
        changeOrder(
          result.draggableId,
          result.destination.index,
          result.source.index,
          boardId
        )
      )
      dispatch(changeLocalOrder(elements))
    },
    [boardId, dispatch, localCards]
  )

  useEffect(() => {
    dispatch(getCards(boardId))
    dispatch(getTasks(boardId))
  }, [dispatch, boardId])

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="cards-wrapper" direction="horizontal">
        {(provided) => (
          <div
            className="cards-wrapper"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {localCards &&
              localCards.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <div
                      className="card"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Card title={item.title} cardId={item._id} />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Cards
