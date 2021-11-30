const Board = require("../models/Board");
const User = require("../models/User");

import { Request, Response } from "express";
import { IRequest } from "../types/types";

const getBoards = async (req:IRequest, res:Response) => {
  try {
    const  userId  = req.user._id

    const boards = await Board.find({ users: { _id: userId } }, {_id: 1, title: 1});
    res.status(200).json(boards);
  } catch (error) {
    throw error;
  }
};

const getBoard = async (req:Request, res:Response) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findById(boardId).populate('users');
    res.status(200).json(board);
  } catch (error) {
    throw error;
  }
};

const addBoard = async (req:IRequest, res:Response) => {
  try {
    const { title } = req.body;
    const  userId  = req.user._id

    const board = await Board.create({
      title,
      owner: userId,
      users: [userId],
    });

    res.status(200).json(board);
  } catch (error) {
    throw error;
  }
};

const addBoardUser = async (req:Request, res:Response) => {
  try {
    const { boardId } = req.params;
    const {email} = req.body

    const board = await Board.findById(boardId);
    const user = await User.findOne({email})

    if (board.users.includes(user._id)) {
      res.status(403).json({ message: "User has already been added" });
    } else {
      const board = await Board.findByIdAndUpdate(
        boardId,
        {
          $push: { users: user._id },
        },
        { new: true }
      ).populate('users')
      res.status(200).json(board);
    }
  } catch (error) {
    throw error;
  }
};

const editBoard = async (req:Request, res:Response) => {
  try {
    const { boardId } = req.params;
    const { title } = req.body;

    const filter = boardId;
    const update = { title };

    const board = await Board.findByIdAndUpdate(filter, update, {
      new: true,
    });

    res.status(200).json(board);
  } catch (error) {
    throw error;
  }
};

const deleteBoardUser = async (req:Request, res:Response) => {
  try {
    const {boardId} = req.params;
    const {userId} = req.body;

    const board = await Board.findByIdAndUpdate(boardId, {$pull: {users: userId}}, {new: true}).populate('users');
    res.status(200).json(board);
  } catch (error) {
    throw error
  }
}

exports.addBoard = addBoard;
exports.addBoardUser = addBoardUser;
exports.getBoards = getBoards;
exports.editBoard = editBoard;
exports.getBoard = getBoard;
exports.deleteBoardUser = deleteBoardUser;
