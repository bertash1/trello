import { Schema, model } from "mongoose";
import { IComment } from "../types/types"

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

module.exports = model<IComment>("Coment", CommentSchema);