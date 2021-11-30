export {};
const Comment = require("../models/Comment");

import { Request, Response } from "express";

const postComment = async (req:Request, res:Response) => {
  try {
    const { boardId } = req.params;
    const {text, authorId, taskId } = req.body;

    const comment = await Comment.create({task: taskId, text, author: authorId, board: boardId});
    res.status(200).json(comment);
  } catch (error) {
    throw error
  }
}

const editComment = async (req:Request, res:Response) => {
  try {
    const { commentId, text } = req.body;

    const comment = await Comment.findByIdAndUpdate(commentId, {text}, {new: true});

    res.status(200).json(comment)
  } catch (error) {
    throw error
  }
}

const deleteComment = async (req:Request, res:Response) => {
  try {
    const {commentId} = req.params;

    const comment = await Comment.findByIdAndDelete(commentId);

    res.status(200).json(comment);
  } catch (error) {
    throw error
  }
}

exports.postComment = postComment;
exports.editComment = editComment;
exports.deleteComment = deleteComment;
