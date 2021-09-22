import { FETCH_CARDS, POST_CARD, CHANGE_CARD, DELETE_CARD } from "./types"

export const fetchCards = () => async (dispatch) => {
  try {
    const data = await fetch(`${process.env.REACT_APP_URL}/cards/`)
    const cards = await data.json()

    dispatch({
      type: FETCH_CARDS,
      payload: cards,
    })
  } catch (err) {
    console.log(err)
  }
}

export const postCard = (title) => async (dispatch) => {
  try {
    await fetch(`${process.env.REACT_APP_URL}/card/`, {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })

    dispatch({
      type: POST_CARD,
    })
    dispatch(fetchCards())
  } catch (err) {
    console.log(err)
  }
}

export const changeCard =
  (id, title = "") =>
  async (dispatch) => {
    if (id) {
      try {
        await fetch(`${process.env.REACT_APP_URL}/card/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            title,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
        dispatch({ type: CHANGE_CARD })
        dispatch(fetchCards())
      } catch (err) {
        console.log(err)
      }
    }
  }

export const deleteCard = (cardId) => async (dispatch) => {
  try {
    await fetch(`${process.env.REACT_APP_URL}/card/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
    dispatch({ type: DELETE_CARD })
    dispatch(fetchCards())
  } catch (err) {
    console.log(err)
  }
}
