const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const checkUserPermissions = require("../middlewares/checkUserPermissions");
const checkIsUserCommentAuthor = require("../middlewares/checkIsUserCommentAuthor");

const router = express.Router();

const { postComment, editComment, deleteComment } = require("../controllers/comment");

router.post("/:boardId", authMiddleware, checkUserPermissions, postComment);
router.patch("/", authMiddleware, checkUserPermissions, checkIsUserCommentAuthor, editComment);
router.delete("/:commentId", authMiddleware, checkUserPermissions, checkIsUserCommentAuthor, deleteComment)

module.exports = router;
