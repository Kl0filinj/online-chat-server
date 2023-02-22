const RequestError = require("../helpers/RequestError");
const Room = require("../models/roomModel");

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
  const allRooms = await Room.find({});
  if (!allRooms) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(allRooms);
};

const getRoomByIdController = async (req, res) => {
  const { id } = req.params;
  const room = await Room.findById({ _id: id });
  if (!room) {
    throw RequestError(404, "Not found");
  }
  return res.status(200).json(room);
};

module.exports = {
  createRoomController,
  getAllRoomController,
  getRoomByIdController,
};
