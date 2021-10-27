const Board = require("../models/Board");

const getBoards = async (req, res) => {
  try {
    const { userId } = req.params;

    const boards = await Board.find({ users: { _id: userId } });
    res.status(200).json(boards);
  } catch (error) {
    throw error;
  }
};

const getBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findById(boardId);
    res.status(200).json(board);
  } catch (error) {
    throw error;
  }
};

const addBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const { userId } = req.params;

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

const addBoardUser = async (req, res) => {
  try {
    const { boardId, userId } = req.params;

    const board = await Board.findById(boardId);

    if (board.users.includes(userId)) {
      res.status(403).json({ message: "User has already been added" });
    } else {
      const board = await Board.findByIdAndUpdate(
        boardId,
        {
          $push: { users: userId },
        },
        { new: true }
      );
      res.status(200).json(board);
    }
  } catch (error) {
    throw error;
  }
};

const editBoard = async (req, res) => {
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

exports.addBoard = addBoard;
exports.addBoardUser = addBoardUser;
exports.getBoards = getBoards;
exports.editBoard = editBoard;
exports.getBoard = getBoard;
