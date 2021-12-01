import { validateAccessToken } from "../service/token"
import ApiError from "../exceptions/api-error"
import { Response, NextFunction } from "express"
import { IRequest, IUserData } from "../types/types"

const authMiddleware = (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const accessToken = authorizationHeader.split(" ")[1]
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = validateAccessToken(accessToken) as IUserData
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }

    req.user = userData
    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}

export default authMiddleware
