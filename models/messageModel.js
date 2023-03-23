const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: { type: String, required: [true, "Message content is required"] },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    author: { type: String, required: [true, "Author Name is required"] },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
