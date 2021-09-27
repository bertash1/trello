const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: [{
    type: Schema.Types.ObjectId,
    ref: "TaskDescription"
  }],
  card: {
    type: Schema.Types.ObjectId,
    ref: "Card"
  }
});

module.exports = Task = model("Task", TaskSchema);
