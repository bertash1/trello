import { FETCH_CARDS, POST_ITEM, CHANGE_ITEM, DELETE_ITEM } from "./types"

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
export const postItem =
  (title, type, id = "") =>
  async (dispatch) => {
    try {
      await fetch(`${process.env.REACT_APP_URL}/${type}/${id}`, {
        method: "POST",
        body: JSON.stringify({
          title,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })

      dispatch({
        type: POST_ITEM,
      })
      dispatch(fetchCards())
    } catch (err) {
      console.log(err)
    }
  }

export const changeItem =
  (id, title = "", type) =>
  async (dispatch) => {
    if (id) {
      try {
        await fetch(`${process.env.REACT_APP_URL}/${type}/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            title,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
        dispatch({ type: CHANGE_ITEM })
        dispatch(fetchCards())
      } catch (err) {
        console.log(err)
      }
    }
  }

export const deleteItem =
  (type, cardId, id = "") =>
  async (dispatch) => {
    try {
      await fetch(`${process.env.REACT_APP_URL}/${type}/${cardId}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      })
      dispatch({ type: DELETE_ITEM })
      dispatch(fetchCards())
    } catch (err) {
      console.log(err)
    }
  }
