const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    residents: { type: Array, default: [] },
    name: {
      type: String,
      default: "Default Room Name",
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
