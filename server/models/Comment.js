const { model, Schema } = require("mongoose");

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
  }, 
  
},{timestamps: true ,})

module.exports = Comment = model("Coment", CommentSchema);