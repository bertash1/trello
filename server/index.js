const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/router");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use("/api", router);

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
