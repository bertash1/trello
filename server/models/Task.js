const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  card: {
    type: Schema.Types.ObjectId, ref: "Card",
  },
  board: {
    type: Schema.Types.ObjectId, ref: "Board",
  },
  position: Number,
});

module.exports = Task = model("Task", TaskSchema);
