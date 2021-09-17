import React from "react"
import Header from "./components/Header/Header"
import Card from "./components/Card/Card"
import AddItem from "./components/AddItem/AddItem"

const App = () => (
  <>
    <Header />
    <Card title="Test" />;
    <AddItem componentType="card" />
  </>
)

export default App
