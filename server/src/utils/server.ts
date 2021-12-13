import express from "express"
import cardRouter from "../routes/card"
import taskRouter from "../routes/task"
import userRouter from "../routes/user"
import boardRouter from "../routes/board"
import commentRouter from "../routes/comment"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import errorMiddleware from "../middlewares/error-middleware"

dotenv.config()

const createServer = () => {
  const app = express()

  app.use(express.json())
  app.use(cookieParser())
  app.use(morgan("common"))
  app.use(cors())
  app.use("/api", userRouter)
  app.use("/api/card", cardRouter)
  app.use("/api/task", taskRouter)
  app.use("/api/board", boardRouter)
  app.use("/api/comment", commentRouter)

  app.use(errorMiddleware)

  return app
}

export default createServer
