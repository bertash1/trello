export {};

const ApiError = require("../exceptions/api-error");
const { getUserData } = require("../service/token");
import { IRequest } from "../types/types";
import { Response, NextFunction } from "express";
const Comment = require("../models/Comment");

module.exports = async (req:IRequest, res:Response, next:NextFunction) => {
  const {commentId} = req.params;

  const authorizationHeader = req.headers.authorization;

  const accessToken = authorizationHeader?.split(" ")[1];
  const userData = getUserData(accessToken);

  const comment = await Comment.findById(commentId);

  if (comment.author != userData._id) {
    return next(ApiError.NotAllowed());
  }

  next();
}