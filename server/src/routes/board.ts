import express from "express";

import authMiddleware from "../middlewares/auth-middleware";
import checkOwnerPermissions from "../middlewares/checkOwnerPermissions";
import checkUserPermissions from "../middlewares/checkUserPermissions";

const router = express.Router();

import {
  addBoard,
  addBoardUser,
  getBoards,
  editBoard,
  getBoard,
  deleteBoardUser,
} from "../controllers/board";

router.post("/", authMiddleware, addBoard);
router.get("/userBoards", authMiddleware, getBoards);
router.get("/:boardId", authMiddleware, checkUserPermissions, getBoard);

router.patch(
  "/addUser/:boardId",
  authMiddleware,
  checkOwnerPermissions,
  addBoardUser
);

router.patch(
  "/:boardId",
  authMiddleware,
  checkOwnerPermissions,
  editBoard
);

router.patch("/deleteUser/:boardId", checkUserPermissions, deleteBoardUser)

export default router;
