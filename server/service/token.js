const jwt = require("jsonwebtoken")
const Token = require("../models/Token")

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"});
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"});

  return {
    accessToken,
    refreshToken,
  }
}

const saveToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({user: userId});
  if(tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await Token.create({user: userId, refreshToken});
  return token;
}

const removeToken = async (refreshToken) => {
  const tokenData = await Token.deleteOne({refreshToken});
  return tokenData;
}

const findToken = async (refreshToken) => {
  const tokenData = await Token.findOne({refreshToken});
  return tokenData;
}

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
}

const getUserData = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (error) {
    return null
  }
}

const validateRefreshToken = (token) => {
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