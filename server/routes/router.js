const express = require("express");
const router = express.Router();
const {
  addCard,
  getCards,
  deleteCard,
  editCard,
} = require("../controllers/card");
const {
  addTask,
  deleteTask,
  getTasksByCard,
  editTask,
  replaceTask,
} = require("../controllers/task");

router.get("/cards", getCards);
router.get("/tasks/:id", getTasksByCard);
router.post("/card", addCard);
router.patch("/card/:id", editCard);
router.patch("/task/:id", editTask);
router.patch("/replace-task/:prev/:cur", replaceTask);
router.post("/task/:id", addTask);
router.delete("/task/:cardId/:id", deleteTask);
router.delete("/card/:id", deleteCard);

module.exports = router;
