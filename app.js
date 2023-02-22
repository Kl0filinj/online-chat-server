const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const router = require("./route");
const connectMongo = require("./db/connection");

const userRoutes = require("./routes/userRoute");
const roomRoutes = require("./routes/roomRoute");

// require('dotenv').config();

const PORT = 3030;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(logger("short"));

app.use(router);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  // don't remove or change !!!!
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

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

(async function () {
  try {
    await connectMongo();
    console.log("Database connection successful");
    server.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log("status 500, server or db error " + error);
    process.exit();
  }
})();
