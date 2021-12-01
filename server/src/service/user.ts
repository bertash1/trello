import User from "../models/User"
import bcrypt from "bcrypt"
import uuid from "uuid"
import sendActivationMail from "./mail"
import {
  generateTokens,
  saveToken,
  removeToken,
  findToken,
  validateRefreshToken,
} from "./token"
import ApiError from "../exceptions/api-error"
import { JwtPayload } from "jsonwebtoken"
import { IToken } from "../types/types"

export const userRegistration = async (email: string, password: string) => {
  const candidate = await User.findOne({ email })
  if (candidate) {
    throw ApiError.BadRequest("User already exists")
  }

  const hashPassword = await bcrypt.hash(password, 3)
  const activationLink: string = uuid.v4()

  const user = await User.create({
    email,
    password: hashPassword,
    activationLink,
  })

  await sendActivationMail(
    email,
    `${process.env.API_URL}/api/activate/${activationLink}`
  )
  const tokens = generateTokens({
    _id: user._id,
    email: user.email,
    isActivated: user.isActivated,
  })
  await saveToken(user._id, tokens.refreshToken)

  return {
    ...tokens,
    user: {
      _id: user._id,
      email: user.email,
      isActivated: user.isActivated,
    },
  }
}

export const activateUser = async (activationLink: string) => {
  const user = await User.findOne({ activationLink })

  if (!user) {
    throw ApiError.BadRequest("Incorrect activation link")
  }
  user.isActivated = true
  await user.save()
}

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw ApiError.BadRequest("User was not found")
  }

  const isPassEquals = await bcrypt.compare(password, user.password)
  if (!isPassEquals) {
    throw ApiError.BadRequest("Incorrect password")
  }

  const tokens = generateTokens({
    _id: user._id,
    email: user.email,
    isActivated: user.isActivated,
  })
  await saveToken(user._id, tokens.refreshToken)

  return {
    ...tokens,
    user: {
      _id: user._id,
      email: user.email,
      isActivated: user.isActivated,
    },
  }
}

export const logoutUser = async (refreshToken: string) => {
  const token = await removeToken(refreshToken)
  return token
}

export const refreshUserToken = async (
  refreshToken: string
): Promise<IToken | null> => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError()
  }
  const userData = validateRefreshToken(refreshToken) as JwtPayload
  const tokenFromDb = await findToken(refreshToken)
  if (!userData || !tokenFromDb) {
    throw ApiError.UnauthorizedError()
  }

  const user = await User.findById(userData.id)

  if (user) {
    const tokens = generateTokens({
      _id: user._id,
      email: user.email,
      isActivated: user.isActivated,
    })
    const tokenData = await saveToken(user._id, tokens.refreshToken)
    return tokenData
  }
  return null
}
