import Board from "../models/Board"
import User from "../models/User"

import { Request, Response } from "express"
import { IBoard, IRequest, IUser } from "../types/types"

export const getBoards = async (
  req: IRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req?.user?._id as string
    const boards: Array<IBoard> = await Board.find(
      { users: userId },
      { _id: 1, title: 1 }
    )
    res.status(200).json(boards)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const boardId: string = req.params.boardId
    const board = (await Board.findById(boardId).populate("users")) as IBoard
    res.status(200).json(board)
  } catch (error) {
    throw error
  }
}

export const addBoard = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const title = req.body.title as string
    const userId = req?.user?._id

    const board: IBoard = await Board.create({
      title,
      owner: userId,
      users: [userId],
    })

    res.status(200).json(board)
  } catch (error) {
    throw error
  }
}

export const addBoardUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const boardId: string = req.params.boardId
    const email: string = req.body.email

    const board = (await Board.findById(boardId)) as IBoard
    const user = (await User.findOne({ email })) as IUser

    if (board?.users.includes(user?._id)) {
      res.status(403).json({ message: "User has already been added" })
    } else {
      const board = await Board.findByIdAndUpdate(
        boardId,
        {
          $push: { users: user?._id },
        },
        { new: true }
      ).populate("users")
      res.status(200).json(board)
    }
  } catch (error) {
    throw error
  }
}

export const editBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const boardId: string = req.params.boardId
    const title: string = req.body.title

    const board = await Board.findByIdAndUpdate(
      boardId,
      { title },
      {
        new: true,
      }
    )

    res.status(200).json(board)
  } catch (error) {
    throw error
  }
}

export const deleteBoardUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const boardId: string = req.params.boardId
    const userId: string = req.body.userId

    const board = await Board.findByIdAndUpdate(
      boardId,
      { $pull: { users: userId } },
      { new: true }
    ).populate("users")
    res.status(200).json(board)
  } catch (error) {
    throw error
  }
}
