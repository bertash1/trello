import { combineReducers } from "redux"
import { cardsReducer } from "./cardsReducer"
import { tasksReducer } from "./tasksReducer"
import { userReducer } from "./userReducer"

const rootReducer = combineReducers({
  cards: cardsReducer,
  task: tasksReducer,
  user: userReducer,
})

export default rootReducer
