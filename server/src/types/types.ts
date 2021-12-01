import { Request } from "express"
import { Document, Types } from "mongoose"

export interface IBoard extends Document {
  title: string
  owner: string
  users: Array<string>
}

export interface ICard extends Document {
  title: string
  board: Types.ObjectId
  position: number
}

export interface IComment extends Document {
  text: string
  author: Types.ObjectId
  board: Types.ObjectId
  task: Types.ObjectId
}

export interface ITask extends Document {
  title: string
  description: string
  card: Types.ObjectId
  board: Types.ObjectId
  position: number
}

export interface IToken extends Document {
  user: Types.ObjectId
  refreshToken: string
}

export interface IUser extends Document {
  email: string
  password: string
  isActivated: boolean
  activationLink: string
}

export interface IUserData {
  email: string
  isActivated: boolean
  _id: string
}

export interface IRequest extends Request {
  user?: IUserData
}

export interface IHttpException {
  message: string
  status: number
}
