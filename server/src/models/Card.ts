import { Schema, model } from "mongoose";
import { ICard } from "../types/types"

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
  position: Number
});

module.exports = model<ICard>("Card", CardSchema);
