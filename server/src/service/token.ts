import jwt from "jsonwebtoken"
import Token from "../models/Token"
import { IUserData } from "../types/types"

export const generateTokens = (payload: IUserData) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: "30m" }
  )
  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "30d" }
  )

  return {
    accessToken,
    refreshToken,
  }
}

export const saveToken = async (userId: string, refreshToken: string) => {
  const tokenData = await Token.findOne({ user: userId })
  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }
  const token = await Token.create({ user: userId, refreshToken })
  console.log(token)
  return token
}

export const removeToken = async (refreshToken: string) => {
  const tokenData = await Token.deleteOne({ refreshToken })
  return tokenData
}

export const findToken = async (refreshToken: string) => {
  const tokenData = await Token.findOne({ refreshToken })
  return tokenData
}

export const validateAccessToken = (token: string) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
    return userData
  } catch (error) {
    return null
  }
}

export const getUserData = (token: string) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
    return userData
  } catch (error) {
    return null
  }
}

export const validateRefreshToken = (token: string) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string)
    return userData
  } catch (error) {
    return null
  }
}
