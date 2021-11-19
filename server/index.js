const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cardRouter = require("./routes/card");
const taskRouter = require("./routes/task");
const userRouter = require("./routes/user");
const boardRouter = require("./routes/Board");
const commentRouter = require("./routes/comment");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const errorMiddleware = require("./middlewares/error-middleware");

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
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
