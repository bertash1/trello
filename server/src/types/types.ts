import {Request} from "express"

export interface IBoard {
  title: string, 
  owner: string,
  users: string[]
}

export interface ICard {
  title: string,
  board: string,
  position: number
}

export interface IComment {
  text: string,
  author: string,
  board: string,
  task: string
}

export interface ITask {
  title: string,
  description: string,
  card: string,
  board: string,
  position: number
}

export interface IToken {
  user: string,
  refreshToken: string
}

export interface IUser {
  email: string,
  password: string,
  isActivated: boolean,
  activationLink: string
}

export interface IUserData {
  email: string,
  isActivated: boolean,
  _id: string,
}

export interface IRequest extends Request {
  user: IUserData
}

export interface IHttpException {
  message: string,
  status: number,
}