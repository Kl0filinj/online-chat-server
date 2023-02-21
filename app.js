const express = require("express");
// const logger = require('morgan');
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
// require('dotenv').config();

// const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://kl0filinj.github.io",
    methods: ["GET", "POST"],
  },
});

// app.use(logger('short'));
app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log(`User ${socket.id} CONNECTED`);

  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log(`User CONNECTED TO ROOM ${data}`);
  });

  socket.on("sendMessage", (data) => {
    console.log("SEND MESSAGE", data);
    socket.to(data.roomId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} DISCONNECTED`);
  });
});

server.listen(3030, () => {
  console.log(`Server running. Use our API on port: ${3030}`);
});
