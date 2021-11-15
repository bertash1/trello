const getSortedCards = (localCards, result) => {
  const { source, destination } = result

  const elements = [...localCards]
  const [reorderedElement] = elements.splice(source.index, 1)
  elements.splice(destination.index, 0, reorderedElement)

  return elements
}

export default getSortedCards
