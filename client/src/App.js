import React from "react"
import { Provider } from "react-redux"
import StartPage from "./pages/StartPage/StartPage"
// import ConfirmPage from "./pages/ConfirmPage/ConfirmPage"

import store from "./store"

const App = () => (
  <Provider store={store}>
    <StartPage />
    {/* <ConfirmPage /> */}
  </Provider>
)

export default App
