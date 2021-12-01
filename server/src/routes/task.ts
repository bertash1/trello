import express from "express";

import authMiddleware from "../middlewares/auth-middleware";
import checkUserPermissions from "../middlewares/checkUserPermissions";
import checkOwnerPermissions from "../middlewares/checkOwnerPermissions";

const router = express.Router();

import {
  postTask,
  deleteTask,
  getTasks,
  editTask,
  getTask,
  changeTaskOrder
} from "../controllers/task";

router.get("/:boardId", authMiddleware, checkUserPermissions, getTasks);
router.get("/info/:taskId", authMiddleware, checkUserPermissions, getTask);
router.post("/:cardId/:boardId", authMiddleware, checkUserPermissions, postTask);
router.delete("/:taskId", authMiddleware, checkOwnerPermissions, deleteTask);
router.patch("/:taskId", authMiddleware, checkUserPermissions, editTask);
router.patch("/changeorder/:taskId", authMiddleware, checkUserPermissions, changeTaskOrder);

export default router;
