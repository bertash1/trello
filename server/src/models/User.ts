import { Schema, model } from "mongoose";
import { IUser } from "../types/types"

const UserSchema = model<IUser>("User", new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
}))

export default UserSchema;