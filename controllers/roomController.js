const RequestError = require("../helpers/RequestError");
const Room = require("../models/roomModel");
const { User } = require("../models/userModel");

const createRoomController = async (req, res) => {
  const { name: roomName } = req.body;

  if (await Room.findOne({ name: roomName })) {
    throw RequestError(409, "This room is already exists");
  }

  const room = new Room(req.body);
  await room.save();
  const { name } = room;
  return res.status(201).json({ name });
};

const getAllRoomController = async (req, res) => {
  const allRooms = await Room.find().populate({
    path: "messages",
    select: ["text", "author", "createdAt"],
  });
  if (!allRooms) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(allRooms);
};

const getRoomByIdController = async (req, res) => {
  const { id } = req.params;
  const room = await Room.findById({ _id: id }).populate({
    path: "messages",
    select: ["text", "author", "createdAt"],
  });
  if (!room) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(room);
};

const addUserToRoom = async (req, res) => {
  const { _id: userID } = req.user;

  const user = await User.findById(userID);

  if (!user) {
    throw RequestError(404, "User not found");
  }
  await Room.findByIdAndUpdate(req.body.roomId, {
    $push: { residents: { ...req.body } },
  });
  return res.status(201).json(...req.body);
};

const removeUserFromRoom = async (req, res) => {
  const { _id: userID } = req.user;

  const user = await User.findById({ _id: userID });

  if (!user) {
    throw RequestError(404, "User not found");
  }

  await Room.findByIdAndUpdate(req.body.roomId, {
    $pull: { residents: userID },
  }).populate("residents");
  return res.status(201).json(...req.body);
};

module.exports = {
  createRoomController,
  getAllRoomController,
  getRoomByIdController,
  addUserToRoom,
  removeUserFromRoom,
};
