const { Schema, model } = require("mongoose");

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: [{
    type: Schema.Types.ObjectId, 
    ref: "Task"
  }],
  taskDescriptions: [{
    type: Schema.Types.ObjectId, 
    ref: "TaskDescription"
  }],
});

module.exports = Card = model("Card", CardSchema);
