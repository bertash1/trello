import React, { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import getSortedCards from "src/utils/sorting/getSortedCards"
import getSortedTasks from "src/utils/sorting/getSortedTasks"
import { getCards, changeOrder, changeLocalOrder } from "src/actions/card"
import {
  getTasks,
  changeTaskLocalOrder,
  changeTaskOrder,
} from "src/actions/task"
import Card from "../Card/Card"
import "./style.sass"

const Cards = () => {
  const dispatch = useDispatch()

  const localCards = useSelector((state) => state.cards.local)
  const taskData = useSelector((state) => state.task.tasks)

  const { boardId } = useParams()

  const handleOnDragEnd = useCallback(
    async (result) => {
      if (!result.destination) return

      if (result.type === "card") {
        const elements = getSortedCards(localCards, result)

        dispatch(
          changeOrder(
            result.draggableId,
            result.destination.index,
            result.source.index,
            boardId
          )
        )
        dispatch(changeLocalOrder(elements))
      }

      if (result.type === "task") {
        const elements = getSortedTasks(taskData, result)

        dispatch(changeTaskLocalOrder(elements))
        dispatch(
          changeTaskOrder(
            result.draggableId,
            result.destination.index,
            result.source.index,
            result.source.droppableId,
            result.destination.droppableId
          )
        )
      }
    },
    [boardId, dispatch, localCards, taskData]
  )

  useEffect(() => {
    dispatch(getCards(boardId))
    dispatch(getTasks(boardId))
  }, [dispatch, boardId])

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="cards-wrapper" direction="horizontal" type="card">
        {(provided) => (
          <div
            className="cards-wrapper"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {localCards &&
              localCards.map((card, index) => (
                <Card
                  key={card._id}
                  title={card.title}
                  cardId={card._id}
                  index={index}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default React.memo(Cards)
