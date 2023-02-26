const Message = require("../models/messageModel");
const Room = require("../models/roomModel");

const addMessageController = async (req, res) => {
  const { name: author } = req.user;

  const options = req.body.author ? { ...req.body } : { ...req.body, author };

  const message = new Message(options);
  await message.save();

  await Room.findByIdAndUpdate(req.body.room, {
    $push: { messages: message },
  }).populate({
    path: "messages",
    select: ["text", "author", "createdAt"],
  });
  return res.status(201).json({
    _id: message._id,
    text: message.text,
    author: message.author,
  });
  // return res.status(201);
};

module.exports = {
  addMessageController,
};
