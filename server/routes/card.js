const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

const {
  postCard,
  getCards,
  deleteCard,
  editCard,
} = require("../controllers/card");

router.get("/:id", authMiddleware, getCards);
router.post("/:id", authMiddleware, postCard);
router.patch("/:id", authMiddleware, editCard);
router.delete("/:id", authMiddleware, deleteCard);

module.exports = router;
