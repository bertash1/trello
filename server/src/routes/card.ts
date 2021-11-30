export {}

const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const checkUserPermissions = require("../middlewares/checkUserPermissions");
const checkOwnerPermissions = require("../middlewares/checkOwnerPermissions");

const router = express.Router();

const {
  postCard,
  getCards,
  deleteCard,
  editCard,
  changeOrder
} = require("../controllers/card");

router.get("/:boardId", authMiddleware, checkUserPermissions, getCards);
router.post("/:boardId", authMiddleware, checkUserPermissions, postCard);
router.patch("/:cardId", authMiddleware, checkOwnerPermissions, editCard);
router.patch("/changeorder/:cardId", authMiddleware, checkUserPermissions, changeOrder);
router.delete("/:cardId", authMiddleware, checkOwnerPermissions, deleteCard);

module.exports = router;
