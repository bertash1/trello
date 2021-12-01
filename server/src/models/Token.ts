import { Schema, model } from "mongoose"
import { IToken } from "../types/types"

const TokenSchema = model<IToken>(
  "Token",
  new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    refreshToken: {
      type: String,
      required: true,
    },
  })
)

export default TokenSchema
