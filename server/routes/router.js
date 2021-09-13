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

router.post("/add-card", addCard);
router.patch("/edit-card/:id", editCard);
router.patch("/edit-task/:id", editTask);
router.patch("/replace-task/:prev/:cur", replaceTask);
router.get("/get-cards", getCards);
router.post("/add-task/:id", addTask);
router.delete("/delete-task/:cardId/:id", deleteTask);
router.get("/get-tasks/:id", getTasksByCard);
router.delete("/delete-card/:id", deleteCard);

module.exports = router;
