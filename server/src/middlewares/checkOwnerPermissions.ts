import ApiError from "../exceptions/api-error"

import { getUserData } from "../service/token"
import Board from "../models/Board"
import Card from "../models/Card"
import Task from "../models/Task"

import { Response, NextFunction } from "express"
import { IRequest, IUserData } from "../types/types"

const checkOwnerPermissions = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const boardId: string = req.params.boardId
  const cardId: string = req.params.cardId
  const taskId: string = req.params.taskId

  const authorizationHeader = req.headers.authorization as string

  const accessToken = authorizationHeader?.split(" ")[1] as string
  const userData = getUserData(accessToken) as IUserData

  if (boardId) {
    const board = await Board.findById(boardId)

    if (board?.owner != userData?._id) {
      return next(ApiError.NotAllowed())
    }
  }

  if (cardId) {
    const card = await Card.findById(cardId)
    const board = await Board.findById(card?.board)

    if (board?.owner != userData._id) {
      return next(ApiError.NotAllowed())
    }
  }

  if (taskId) {
    const task = await Task.findById(taskId)
    const board = await Board.findById(task?.board)

    if (!board?.users.includes(userData._id)) {
      return next(ApiError.NotAllowed())
    }
  }

  next()
}

export default checkOwnerPermissions
