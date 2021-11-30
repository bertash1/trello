import { Schema, model } from "mongoose";
import { ITask } from "../types/types"

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

module.exports = model<ITask>("Task", TaskSchema);
