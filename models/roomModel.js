const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    name: {
      type: String,
      default: "Default Room Name",
    },
    residents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    usersCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
