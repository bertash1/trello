import express from "express";

import authMiddleware from "../middlewares/auth-middleware";
import checkUserPermissions from "../middlewares/checkUserPermissions";
import checkOwnerPermissions from "../middlewares/checkOwnerPermissions";

const router = express.Router();

import {
  postCard,
  getCards,
  deleteCard,
  editCard,
  changeOrder
} from "../controllers/card";

router.get("/:boardId", authMiddleware, checkUserPermissions, getCards);
router.post("/:boardId", authMiddleware, checkUserPermissions, postCard);
router.patch("/:cardId", authMiddleware, checkOwnerPermissions, editCard);
router.patch("/changeorder/:cardId", authMiddleware, checkUserPermissions, changeOrder);
router.delete("/:cardId", authMiddleware, checkOwnerPermissions, deleteCard);

export default router;
