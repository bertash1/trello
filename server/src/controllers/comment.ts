import Comment from "../models/Comment";

import { Request, Response } from "express";
import { IComment } from "../types/types";

export const postComment = async (req:Request, res:Response): Promise<void> => {
  try {
    const boardId: string  = req.params.boardId;
    const {text, authorId, taskId } : {text: string; authorId: string; taskId: string } = req.body;

    const comment: IComment = await Comment.create({task: taskId, text, author: authorId, board: boardId});
    res.status(200).json(comment);
  } catch (error) {
    throw error
  }
}

export const editComment = async (req:Request, res:Response): Promise<void> => {
  try {
    const { commentId, text } : {commentId: string; text: string} = req.body;

    const comment = await Comment.findByIdAndUpdate(commentId, {text}, {new: true});

    res.status(200).json(comment)
  } catch (error) {
    throw error
  }
}

export const deleteComment = async (req:Request, res:Response): Promise<void> => {
  try {
    const commentId: string = req.params.commentId;

    const comment = await Comment.findByIdAndDelete(commentId);

    res.status(200).json(comment);
  } catch (error) {
    throw error
  }
}
