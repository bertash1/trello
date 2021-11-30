export {};

const ApiError = require("../exceptions/api-error");

const { getUserData } = require("../service/token");
const Board = require("../models/Board");
const Card = require("../models/Card");
const Task = require("../models/Task");

import {Response, NextFunction} from "express"
import {IRequest} from "../types/types"

module.exports = async (req:IRequest, res:Response, next:NextFunction) => {
  const { boardId, cardId, taskId } = req.params;

  const authorizationHeader = req.headers.authorization;

  const accessToken = authorizationHeader?.split(" ")[1];
  const userData = getUserData(accessToken);

  if (boardId) {
    const board = await Board.findById(boardId);

    if (board.owner != userData._id) {
      return next(ApiError.NotAllowed());
    }  
  }

  if (cardId) {
    const card = await Card.findById(cardId);
    const board = await Board.findById(card.board);

    if (board.owner != userData._id) {
      return next(ApiError.NotAllowed());
    } 
  }

  if (taskId) {
    const task = await Task.findById(taskId);
    const board = await Board.findById(task.board);

    if (!board.users.includes(userData._id)) {
      return next(ApiError.NotAllowed());
    }
  } 


  next();
};
