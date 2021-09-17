import React from "react"
import { Provider } from "react-redux"
import Header from "./components/Header/Header"
import AddItem from "./components/AddItem/AddItem"
import store from "./store"
import Cards from "./components/Cards/Cards"

const App = () => (
  <Provider store={store}>
    <Header />
    <Cards />
    <AddItem componentType="card" />
  </Provider>
)

export default App
