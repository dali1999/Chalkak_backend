const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const path = require("path");

const server = http.createServer(app);
const io = socketIo(server);

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const imageRouter = require("./routes/image");
const boardsRouter = require("./routes/boards");

const port = 3000;

// Set up the socket.io connection event.
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle custom chat message event.
  socket.on("chat message", (newMessage) => {
    console.log("Received new message:", newMessage);
    // Broadcast the message to all connected clients, including the sender.
    io.emit("chat message", message);
  });

  // Handle disconnect event.
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

//public directory for images
app.use(express.static(path.join(__dirname, "public")));

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/", authRouter);
app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/api/boards", boardsRouter);

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
