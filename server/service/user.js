const User = require("../models/User");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const {sendActivationMail} = require("./mail");
const {generateTokens, saveToken, removeToken, findToken, validateRefreshToken} = require("./token");
const ApiError = require('../exceptions/api-error');

const userRegistration = async (email, password) => {
  const candidate = await User.findOne({email});
  if (candidate) {
    throw ApiError.BadRequest("User already exists")
  }

  const hashPassword = await bcrypt.hash(password, 3);
  const activationLink = uuid.v4();

  const user = await User.create({
    email, 
    password: hashPassword, 
    activationLink
  });

  await sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
  const tokens = generateTokens({_id: user._id, email: user.email, isActivated: user.isActivated});
  await saveToken(user._id, tokens.refreshToken)

  return {
    ...tokens,
    user: {
      _id: user._id, 
      email: user.email, 
      isActivated: user.isActivated
    }
  }
}

const activateUser = async (activationLink) => {
  const user = await User.findOne({activationLink});

  if (!user) {
    throw ApiError.BadRequest("Incorrect activation link")
  }
  user.isActivated = true;
  await user.save();
}

const loginUser = async (email, password) => {
  const user = await User.findOne({email});
  if(!user) {
    throw ApiError.BadRequest("User was not found")
  }

  const isPassEquals = await bcrypt.compare(password, user.password);
  if(!isPassEquals) {
    throw ApiError.BadRequest("Incorrect password");
  }

  const tokens = generateTokens({_id: user._id, email: user.email, isActivated: user.isActivated});
  await saveToken(user._id, tokens.refreshToken)

  return {
    ...tokens,
    user: {
      _id: user._id, 
      email: user.email, 
      isActivated: user.isActivated
    }
  }
}

const logoutUser = async (refreshToken) => {
  const token = await removeToken(refreshToken);
  return token;
}

const refreshUserToken = async (refreshToken) => {
  if(!refreshToken) {
    throw ApiError.UnauthorizedError();
  }
  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);
  if(!userData || !tokenFromDb) {
    throw ApiError.UnauthorizedError();
  }

  const user = await User.findById(userData.id)
  const tokens = generateTokens({_id: user._id, email: user.email, isActivated: user.isActivated});
  await saveToken(user._id, tokens.refreshToken)
}


exports.userRegistration = userRegistration;
exports.activateUser = activateUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.refreshUserToken = refreshUserToken;