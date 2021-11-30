import { Schema, model } from "mongoose";
import { ITask } from "../types/types"

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, ref: "User",
  },
  refreshToken: {
    type: String, required: true,
  },
})

module.exports = model<ITask>("Token", TokenSchema);