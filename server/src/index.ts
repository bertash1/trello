import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const cardRouter = require("./routes/card");
const taskRouter = require("./routes/task");
const userRouter = require("./routes/user");
const boardRouter = require("./routes/board");
const commentRouter = require("./routes/comment");
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error-middleware";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(cookieParser());
app.use(morgan("common"));
app.use(cors());
app.use("/api", userRouter);
app.use("/api/card", cardRouter);
app.use("/api/task", taskRouter);
app.use("/api/board", boardRouter);
app.use("/api/comment", commentRouter);

app.use(errorMiddleware);

(async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
