import React, { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import { getCards, changeOrder, changeLocalOrder } from "../../actions/card"
import {
  getTasks,
  changeTaskLocalOrder,
  changeTaskOrder,
} from "../../actions/task"
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
      }

      if (result.type === "task") {
        const elements = [...taskData]

        if (result.source.droppableId === result.destination.droppableId) {
          if (
            result.source.index - result.destination.index === 1 ||
            result.source.index - result.destination.index === -1
          ) {
            const newEl = elements.find(
              (item) => item._id === result.draggableId
            )

            const oldEl = elements.find(
              (item) =>
                item.position === result.destination.index &&
                item.card === result.source.droppableId
            )

            newEl.position = result.destination.index
            oldEl.position = result.source.index
          }

          if (result.source.index - result.destination.index < -1) {
            const currentTask = elements.find(
              (item) => item._id === result.draggableId
            )

            elements.map((item) => {
              if (
                item.position <= result.destination.index &&
                item.position > result.source.index &&
                item.card === result.source.droppableId
              ) {
                return (item.position += -1)
              }
            })
            currentTask.position = result.destination.index
          }

          if (result.source.index - result.destination.index > 1) {
            const currentTask = elements.find(
              (item) => item._id === result.draggableId
            )
            elements.map((item) => {
              if (
                item.position >= result.destination.index &&
                item.position < result.source.index &&
                item.card === result.source.droppableId
              ) {
                return (item.position += 1)
              }
            })
            currentTask.position = result.destination.index
          }
        } else if (
          result.source.droppableId !== result.destination.droppableId
        ) {
          const currentTask = elements.find(
            (item) => item._id === result.draggableId
          )
          elements.map((item) => {
            if (
              item.position >= result.destination.index &&
              item.card === result.destination.droppableId
            ) {
              return (item.position += 1)
            }
            if (
              item.position > result.source.index &&
              item.card === result.source.droppableId
            ) {
              return (item.position -= 1)
            }
          })
          currentTask.position = result.destination.index
          currentTask.card = result.destination.droppableId
          // }
        }

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
              localCards.map((item, index) => (
                <Card
                  key={item._id}
                  title={item.title}
                  cardId={item._id}
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
