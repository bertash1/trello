import { FETCH_CARDS, POST_CARD, CHANGE_CARD, DELETE_CARD } from "./types"

export const fetchCards = (userId) => async (dispatch) => {
  try {
    const data = await fetch(`${process.env.REACT_APP_URL}/cards/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const cards = await data.json()

    dispatch({
      type: FETCH_CARDS,
      payload: cards,
    })
  } catch (err) {
    console.log(err)
  }
}

export const postCard = (title, userId) => async (dispatch) => {
  try {
    await fetch(`${process.env.REACT_APP_URL}/card/${userId}`, {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    dispatch({
      type: POST_CARD,
    })
    dispatch(fetchCards(userId))
  } catch (err) {
    console.log(err)
  }
}

export const changeCard =
  (id, title = "", userId) =>
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        dispatch({ type: CHANGE_CARD })
        dispatch(fetchCards(userId))
      } catch (err) {
        console.log(err)
      }
    }
  }

export const deleteCard = (cardId, userId) => async (dispatch) => {
  try {
    await fetch(`${process.env.REACT_APP_URL}/card/${cardId}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    dispatch({ type: DELETE_CARD })
    dispatch(fetchCards(userId))
  } catch (err) {
    console.log(err)
  }
}
