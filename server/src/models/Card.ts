import { Schema, model } from "mongoose";
import { ICard } from "../types/types"

const CardSchema = model<ICard>("Card", new Schema({
  title: {
    type: String,
    required: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
  position: Number
}));

export default CardSchema;
