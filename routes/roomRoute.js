const express = require("express");
const router = express.Router();

const {
  createRoomController,
  getAllRoomController,
  getRoomByIdController,
} = require("../controllers/roomController");

const authMiddleware = require("../middlewares/authMiddleware");
const asyncWrapper = require("../helpers/asyncWrapper");

// create new room
router.post("/", authMiddleware, asyncWrapper(createRoomController));
// get all rooms
router.get("/", authMiddleware, asyncWrapper(getAllRoomController));
// get room by id
router.get("/:id", authMiddleware, asyncWrapper(getRoomByIdController));

module.exports = router;
