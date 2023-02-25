const express = require("express");
const router = express.Router();

const { addMessageController } = require("../controllers/messageController");

const authMiddleware = require("../middlewares/authMiddleware");
const asyncWrapper = require("../helpers/asyncWrapper");

// create new room
router.post("/", authMiddleware, asyncWrapper(addMessageController));

module.exports = router;
