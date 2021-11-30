export {}

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
  deleteBoardUser,
} = require("../controllers/board");

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

module.exports = router;
