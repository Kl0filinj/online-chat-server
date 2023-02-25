const Message = require("../models/messageModel");
const Room = require("../models/roomModel");

const addMessageController = async (req, res) => {
  const { _id: userID } = req.user;

  const message = new Message({ ...req.body, user: userID });
  await message.save();

  //   const room = await Room.findById({ _id: roomId });
  //   if (!room) {
  //     throw RequestError(404, "Not found");
  //   }

  await Room.findByIdAndUpdate(req.body.room, {
    $push: { messages: message },
  });
  return res.status(201).json(message);
};

module.exports = {
  addMessageController,
};
