import { combineReducers } from "redux"
import { cardsReducer } from "./cardsReducer"
import { tasksReducer } from "./tasksReducer"
import { userReducer } from "./userReducer"
import { boardReducer } from "./boardReducer"
import { commentsReducer } from "./commentsReducer"

const rootReducer = combineReducers({
  cards: cardsReducer,
  task: tasksReducer,
  userData: userReducer,
  boards: boardReducer,
  comments: commentsReducer,
})

export default rootReducer
