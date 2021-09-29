const express = require('express');
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

router.get('/cards', getCards);
router.get('/tasks', getTasks);
router.get('/task/:id', fetchTask)
router.post('/card', addCard);
router.post('/task/:id', addTask);
router.patch('/card/:id', editCard);
router.patch('/task/:id', editTask);
router.patch('/replace-task/:prev/:cur', replaceTask);
router.delete('/task/:cardId/:id', deleteTask);
router.delete('/card/:id', deleteCard);

module.exports = router;
