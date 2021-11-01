const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  registration,
  activate,
  login,
  logout,
  refresh,
  getUserTokenData
} = require('../controllers/user');

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

module.exports = router;
