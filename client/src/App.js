import React from "react"
import Header from "./components/Header/Header"
import Card from "./components/Card/Card"
import AddCard from "./components/AddCard/AddCard"

const App = () => (
  <>
    <Header />
    <Card title="Test" />;
    <AddCard title="Add another card" />
  </>
)

export default App
