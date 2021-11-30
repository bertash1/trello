import { Schema, model } from "mongoose";
import { IBoard } from "../types/types"

const BoardSchema: Schema = new Schema({
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
});

module.exports = model<IBoard>("Board", BoardSchema);
