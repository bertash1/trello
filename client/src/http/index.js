export const $api = {
  async post(url, body, id = "") {
    try {
      const data = await fetch(`${process.env.REACT_APP_URL}/${url}/${id}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return await data.json()
    } catch (error) {
      console.log(error)
    }
  },

  async patch(url, body) {
    try {
      const data = await fetch(`${process.env.REACT_APP_URL}/${url}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return await data.json()
    } catch (error) {
      console.log(error)
    }
  },

  async delete(url) {
    try {
      await fetch(`${process.env.REACT_APP_URL}/${url}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
  },

  async get(url) {
    try {
      const data = await fetch(`${process.env.REACT_APP_URL}/${url}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return await data.json()
    } catch (error) {
      console.log(error)
    }
  },
}
