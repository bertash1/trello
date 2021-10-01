const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const {
  addCard,
  getCards,
  deleteCard,
  editCard,
} = require('../controllers/card');
const {
  addTask,
  deleteTask,
  getTasks,
  editTask,
  replaceTask,
  fetchTask,
} = require('../controllers/task');

const {registration, activate, login, logout, refresh} = require("../controllers/user");
const authMiddleware = require("../middlewares/auth-middleware")

router.get('/cards', authMiddleware, getCards);
router.get('/tasks', authMiddleware, getTasks);
router.get('/task/:id', authMiddleware, fetchTask)
router.post('/card', authMiddleware, addCard);
router.post('/task/:id', authMiddleware, addTask);
router.patch('/card/:id', authMiddleware, editCard);
router.patch('/task/:id', authMiddleware, editTask);
router.patch('/replace-task/:prev/:cur', authMiddleware, replaceTask);
router.delete('/task/:cardId/:id', authMiddleware, deleteTask);
router.delete('/card/:id', authMiddleware, deleteCard);

router.post("/registration", body("email").isEmail(), body("password").isLength({min: 3, max: 32}), registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/activate/:link", activate);
router.get("/refresh", refresh);

module.exports = router;
