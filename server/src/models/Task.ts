import { Schema, model } from "mongoose"
import { ITask } from "../types/types"

const TaskSchema = model<ITask>(
  "Task",
  new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    card: {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    position: Number,
  })
)

export default TaskSchema
