const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const checkUserPermissions = require("../middlewares/checkUserPermissions");
const checkIsUserCommentAuthor = require("../middlewares/checkIsUserCommentAuthor");

const router = express.Router();

const { postComment, editComment, deleteComment, getTasks } = require("../controllers/comment");

router.post("/:boardId", authMiddleware, checkUserPermissions, postComment);
router.patch("/", authMiddleware, checkUserPermissions, checkIsUserCommentAuthor, editComment);
router.delete("/", authMiddleware, checkUserPermissions, checkIsUserCommentAuthor, deleteComment)
router.get("/", authMiddleware, checkUserPermissions, getTasks)

module.exports = router;
