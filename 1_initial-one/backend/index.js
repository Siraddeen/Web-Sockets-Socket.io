// importing all pakages
import express from "express";

import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

// configuring
const port = 5000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// cors middleware

app.use(cors());

// connection stuff

io.on("connection", (socket) => {
  console.log("new client connected");

  socket.on("message", (message) => {
    console.log("message received", message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

// listening

server.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
