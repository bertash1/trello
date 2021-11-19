const Comment = require("../models/Comment");

const postComment = async (req, res) => {
  try {
    const { boardId } = req.params;
    const {text, authorId, taskId } = req.body;

    const date = new Date();

    const comment = await Comment.create({task: taskId, text, author: authorId, board: boardId, created_at: date, edited_at: date});
    res.status(200).json(comment);
  } catch (error) {
    throw error
  }
}

const editComment = async (req,res) => {
  try {
    const { commentId, text } = req.body;

    const date = new Date();

    const comment = await Comment.findByIdAndUpdate(commentId, {text, edited_at: date}, {new: true});

    res.status(200).json(comment)
  } catch (error) {
    throw error
  }
}

const deleteComment = async (req, res) => {
  try {
    const {commentId} = req.body;

    const comment = await Comment.findByIdAndDelete(commentId);

    res.status(200).json(comment);
  } catch (error) {
    throw error
  }
}

const getTasks = async (req, res) => {
  const {taskId} = req.body;

  const comments = await Comment.find({task: taskId})

  res.status(200).json(comments);
}

exports.postComment = postComment;
exports.editComment = editComment;
exports.deleteComment = deleteComment;
exports.getTasks = getTasks;