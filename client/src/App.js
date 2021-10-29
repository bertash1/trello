import React from "react"
import { Provider } from "react-redux"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import ConfirmPage from "./pages/ConfirmPage/ConfirmPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import ActiveBoard from "./pages/ActiveBoard/ActiveBoard"

import StartPage from "./pages/StartPage/StartPage"

import store from "./store"

const App = () => (
  <Router>
    <Provider store={store}>
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path="/activate" component={ConfirmPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/board/:boardId" component={ActiveBoard} />
        <Redirect to="/" />
      </Switch>
    </Provider>
  </Router>
)

export default App
