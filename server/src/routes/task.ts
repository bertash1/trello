
export {}
const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const checkUserPermissions = require("../middlewares/checkUserPermissions");
const checkOwnerPermissions = require("../middlewares/checkOwnerPermissions")

const router = express.Router();

const {
  postTask,
  deleteTask,
  getTasks,
  editTask,
  getTask,
  changeTaskOrder
} = require("../controllers/task");

router.get("/:boardId", authMiddleware, checkUserPermissions, getTasks);
router.get("/info/:taskId", authMiddleware, checkUserPermissions, getTask);
router.post("/:cardId/:boardId", authMiddleware, checkUserPermissions, postTask);
router.delete("/:taskId", authMiddleware, checkOwnerPermissions, deleteTask);
router.patch("/:taskId", authMiddleware, checkUserPermissions, editTask);
router.patch("/changeorder/:taskId", authMiddleware, checkUserPermissions, changeTaskOrder);

module.exports = router;
