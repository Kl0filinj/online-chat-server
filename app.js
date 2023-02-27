const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const router = require("./routes/route");

const userRoutes = require("./routes/userRoute");
const roomRoutes = require("./routes/roomRoute");
const messageRoutes = require("./routes/messageRoute");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(logger("short"));

app.use(router);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} CONNECTED`);

  socket.on("joinRoom", (data) => {
    socket.join(data.roomId);
    console.log(`User CONNECTED TO ROOM ${data.roomId}`);
    socket.to(data.roomId).emit("newUser", data);
  });

  socket.on("sendMessage", (data) => {
    console.log("SEND MESSAGE", data);
    socket.to(data.room).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} DISCONNECTED`);
  });
});

module.exports = server;
