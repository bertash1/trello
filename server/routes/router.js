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
} = require('../controllers/task');

const {getDescription, changeDescription, addDescription} = require('../controllers/taskDescription');

router.get('/cards', getCards);
router.get('/tasks', getTasks);
router.get('/description/:id', getDescription)
router.post('/card', addCard);
router.patch('/description/:id', changeDescription);
router.post('/description/:id', addDescription);
router.patch('/card/:id', editCard);
router.patch('/task/:id', editTask);
router.patch('/replace-task/:prev/:cur', replaceTask);
router.post('/task/:id', addTask);
router.delete('/task/:cardId/:id', deleteTask);
router.delete('/card/:id', deleteCard);

module.exports = router;
