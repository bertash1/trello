import express from "express";

import authMiddleware from "../middlewares/auth-middleware";
import checkUserPermissions from "../middlewares/checkUserPermissions";

const router = express.Router();

import { postComment, editComment, deleteComment } from "../controllers/comment";

router.post("/:boardId", authMiddleware, checkUserPermissions, postComment);
router.patch("/", authMiddleware, checkUserPermissions, editComment);
router.delete("/:commentId", authMiddleware, checkUserPermissions, deleteComment)

export default router;
