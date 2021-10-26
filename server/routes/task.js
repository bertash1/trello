const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

const {
  postTask,
  deleteTask,
  getTasks,
  editTask,
  getTask,
} = require("../controllers/task");

router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTask);
router.post("/:id", authMiddleware, postTask);
router.delete("/:id", authMiddleware, deleteTask);
router.patch("/:id", authMiddleware, editTask);

module.exports = router;
