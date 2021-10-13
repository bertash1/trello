const express = require('express');

const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

const {
  addTask,
  deleteTask,
  getTasks,
  editTask,
  replaceTask,
  fetchTask,
} = require('../controllers/task');

router.get('/tasks', authMiddleware, getTasks);
router.get('/task/:id', authMiddleware, fetchTask);
router.post('/task/:id', authMiddleware, addTask);
router.patch('/replace-task/:prev/:cur', authMiddleware, replaceTask);
router.delete('/task/:cardId/:id', authMiddleware, deleteTask);
router.patch('/task/:id', authMiddleware, editTask);

module.exports = router;
