const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");
const asyncWrapper = require("../helpers/asyncWrapper");

const validateBody = require("../middlewares/validateBody");
const { schemas } = require("../models/userModel");

// sign up
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  asyncWrapper(registerController)
);
// sign in
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  asyncWrapper(loginController)
);
// get all current info about user
router.get("/current", authMiddleware, asyncWrapper(getCurrentController));
// logout
router.get("/logout", authMiddleware, asyncWrapper(logoutController));

module.exports = router;
