import React from "react"
import { Provider } from "react-redux"
import StartPage from "./pages/StartPage/StartPage"
// import Board from "./components/Board/Board"
// import Header from "./components/Header/Header"

import store from "./store"

const App = () => (
  <Provider store={store}>
    <StartPage />
  </Provider>
)

export default App
