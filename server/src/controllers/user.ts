const {
  userRegistration,
  activateUser,
  loginUser,
  logoutUser,
  refreshUserToken,
} = require('../service/user');
const { validationResult } = require('express-validator');
const { getUserData } = require('../service/token');
const ApiError = require('../exceptions/api-error');

import {Request, Response, NextFunction} from "express"

const registration = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Validation error!', errors.array()));
    }

    const { email, password } = req.body;
    const userData = await userRegistration(email, password);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

const login = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { email, password } = req.body;
    const userData = await loginUser(email, password);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

const logout = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await logoutUser(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  } catch (error) {
    next(error);
  }
};

const activate = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const activationLink = req.params.link;
    await activateUser(activationLink);
    return res.redirect(process.env.CLIENT_URL as string);
  } catch (error) {
    next(error);
  }
};

const refresh = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await refreshUserToken(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

const getUserTokenData = async (req:Request, res:Response) => {
  const authorizationHeader = req.headers.authorization;

  const accessToken = authorizationHeader?.split(" ")[1];
  const userData = getUserData(accessToken);

  res.status(200).json(userData)
}

exports.registration = registration;
exports.activate = activate;
exports.login = login;
exports.logout = logout;
exports.refresh = refresh;
exports.getUserTokenData = getUserTokenData;
