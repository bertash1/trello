const getSortedTasks = (taskData, result) => {
  const elements = [...taskData]

  const { source, destination, draggableId } = result

  if (source.droppableId === destination.droppableId) {
    if (
      source.index - destination.index === 1 ||
      source.index - destination.index === -1
    ) {
      const newEl = elements.find((item) => item._id === draggableId)

      const oldEl = elements.find(
        (item) =>
          item.position === destination.index &&
          item.card === source.droppableId
      )

      newEl.position = destination.index
      oldEl.position = source.index
    }

    if (source.index - destination.index < -1) {
      const currentTask = elements.find((item) => item._id === draggableId)

      elements.map((item) => {
        if (
          item.position <= destination.index &&
          item.position > source.index &&
          item.card === source.droppableId
        ) {
          return (item.position += -1)
        }
      })
      currentTask.position = destination.index
    }

    if (source.index - destination.index > 1) {
      const currentTask = elements.find((item) => item._id === draggableId)
      elements.map((item) => {
        if (
          item.position >= destination.index &&
          item.position < source.index &&
          item.card === source.droppableId
        ) {
          return (item.position += 1)
        }
      })
      currentTask.position = destination.index
    }
  } else if (source.droppableId !== destination.droppableId) {
    const currentTask = elements.find((item) => item._id === draggableId)
    elements.map((item) => {
      if (
        item.position >= destination.index &&
        item.card === destination.droppableId
      ) {
        return (item.position += 1)
      }
      if (item.position > source.index && item.card === source.droppableId) {
        return (item.position -= 1)
      }
    })
    currentTask.position = destination.index
    currentTask.card = destination.droppableId
  }

  return elements
}

export default getSortedTasks
