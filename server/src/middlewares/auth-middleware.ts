const {validateAccessToken} = require("../service/token")
const ApiError = require("../exceptions/api-error")
import {Response, NextFunction} from "express"
import {IRequest} from "../types/types"

module.exports = function (req:IRequest, res:Response, next:NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if(!accessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = validateAccessToken(accessToken);
    if(!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}