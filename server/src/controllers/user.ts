import {
  userRegistration,
  activateUser,
  loginUser,
  logoutUser,
  refreshUserToken,
} from "../service/user"
import { validationResult } from "express-validator"
import { getUserData } from "../service/token"
import ApiError from "../exceptions/api-error"

import { Request, Response, NextFunction } from "express"

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(
        ApiError.BadRequest("Validation error!", errors.array() as never)
      )
    }

    const { email, password } = req.body
    const userData = await userRegistration(email, password)
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })

    return res.status(200).json(userData)
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: { email: string; password: string } = req.body
    const userData = await loginUser(email, password)
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    return res.json(userData)
  } catch (error) {
    next(ApiError.UserDoesNotExist())
  }
}

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken }: { refreshToken: string } = req.cookies
    const token = await logoutUser(refreshToken)
    res.clearCookie("refreshToken")
    return res.json(token)
  } catch (error) {
    next(error)
  }
}

export const activate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const activationLink: string = req.params.link
    await activateUser(activationLink)
    return res.redirect(process.env.CLIENT_URL as string)
  } catch (error) {
    next(error)
  }
}

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken }: { refreshToken: string } = req.cookies
    const userData = await refreshUserToken(refreshToken)
    res.cookie("refreshToken", userData?.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    return res.json(userData)
  } catch (error) {
    next(error)
  }
}

export const getUserTokenData = async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization

  const accessToken = authorizationHeader?.split(" ")[1] as string
  const userData = getUserData(accessToken)

  res.status(200).json(userData)
}
