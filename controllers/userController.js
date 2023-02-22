const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const RequestError = require("../helpers/RequestError");
const { User } = require("../models/userModel");

const registerController = async (req, res) => {
  const { email: reqEmail } = req.body;
  console.log(reqEmail);

  if (await User.findOne({ email: reqEmail })) {
    throw RequestError(409, "This email is already in use");
  }

  const user = new User(req.body);
  await user.save();
  const { email, name } = user;
  return res.status(201).json({ email, name });
};

const loginController = async (req, res) => {
  const { email: reqEmail, password } = req.body;
  const user = await User.findOne({ email: reqEmail });

  if (!user) {
    throw RequestError(401, "User with this email not found");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, "Wrong password");
  }

  const userToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { token: userToken },
    { new: true }
  );

  const { token, email, name } = updatedUser;
  return res.status(200).json({
    token,
    email,
    name,
  });
};

const getCurrentController = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id, {
    password: 0,
    token: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  return res.status(200).json(user);
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  return res.status(204).json();
};

module.exports = {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
};
