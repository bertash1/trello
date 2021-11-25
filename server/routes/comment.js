const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const checkUserPermissions = require("../middlewares/checkUserPermissions");

const router = express.Router();

const { postComment, editComment, deleteComment } = require("../controllers/comment");

router.post("/:boardId", authMiddleware, checkUserPermissions, postComment);
router.patch("/", authMiddleware, checkUserPermissions, editComment);
router.delete("/:commentId", authMiddleware, checkUserPermissions, deleteComment)

module.exports = router;
