import { Schema, model } from "mongoose";
import { IBoard } from "../types/types"

const BoardSchema = model<IBoard>("Board", new Schema({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}));

export default BoardSchema;
