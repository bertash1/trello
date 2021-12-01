import express from 'express';
import { body } from 'express-validator';
const router = express.Router();

import {
  registration,
  activate,
  login,
  logout,
  refresh,
  getUserTokenData
} from '../controllers/user';

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  registration
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);
router.get('/userdata', getUserTokenData)

export default router;
