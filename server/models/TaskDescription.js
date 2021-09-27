const { Schema, model } = require("mongoose");

const TaskDescriptionSchema = new Schema({
  description: {
    type: String
  },
});

module.exports = TaskDescription = model("TaskDescription", TaskDescriptionSchema);