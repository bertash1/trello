import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import cardRouter from "./routes/card";
import taskRouter from "./routes/task";
import userRouter from "./routes/user";
import boardRouter from "./routes/board";
import commentRouter from "./routes/comment";

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
