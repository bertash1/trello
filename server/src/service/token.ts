export {};

const jwt = require("jsonwebtoken")
const Token = require("../models/Token")
import {IUserData} from "../types/types";

const generateTokens = (payload: IUserData) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"});
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"});

  return {
    accessToken,
    refreshToken,
  }
}

const saveToken = async (userId:string, refreshToken:string) => {
  const tokenData = await Token.findOne({user: userId});
  if(tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await Token.create({user: userId, refreshToken});
  return token;
}

const removeToken = async (refreshToken:string) => {
  const tokenData = await Token.deleteOne({refreshToken});
  return tokenData;
}

const findToken = async (refreshToken:string) => {
  const tokenData = await Token.findOne({refreshToken});
  return tokenData;
}

const validateAccessToken = (token:string) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
}

const getUserData = (token:string) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (error) {
    return null
  }
}

const validateRefreshToken = (token:string) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
}


exports.generateTokens = generateTokens;
exports.saveToken = saveToken;
exports.removeToken = removeToken;
exports.validateAccessToken = validateAccessToken;
exports.validateRefreshToken = validateRefreshToken;
exports.findToken = findToken;
exports.getUserData = getUserData;