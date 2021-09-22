import { combineReducers } from "redux"
import { cardsReducer } from "./cardsReducer"
import { tasksReducer } from "./tasksReducer"

const rootReducer = combineReducers({
  cards: cardsReducer,
  tasks: tasksReducer,
})

export default rootReducer
