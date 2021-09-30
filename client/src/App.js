import React from "react"
import { Provider } from "react-redux"
import Board from "./components/Board/Board"
import Header from "./components/Header/Header"

import store from "./store"

const App = () => (
  <Provider store={store}>
    <Header />
    <Board />
  </Provider>
)

export default App
