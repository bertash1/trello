const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const checkOwnerPermissions = require("../middlewares/checkOwnerPermissions");
const checkUserPermissions = require("../middlewares/checkUserPermissions");

const router = express.Router();

const {
  addBoard,
  addBoardUser,
  getBoards,
  editBoard,
  getBoard,
} = require("../controllers/board");

router.post("/", authMiddleware, addBoard);
router.get("/userBoards", authMiddleware, getBoards);
router.get("/:boardId", authMiddleware, checkUserPermissions, getBoard);

router.patch(
  "/addUser/:boardId/:userId",
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

module.exports = router;
