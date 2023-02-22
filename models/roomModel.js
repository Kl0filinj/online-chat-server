const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    messages: {
      type: Array,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
