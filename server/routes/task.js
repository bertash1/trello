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

router.get('/', authMiddleware, getTasks);
router.get('/:id', authMiddleware, fetchTask);
router.post('/:id', authMiddleware, addTask);
router.patch('/:prev/:cur', authMiddleware, replaceTask);
router.delete('/:cardId/:id', authMiddleware, deleteTask);
router.patch('/:id', authMiddleware, editTask);

module.exports = router;
