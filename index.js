const express = require("express");
const router = require("express").Router();

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const path = require("path");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const imageRouter = require("./routes/image");
const imageController = require("./controllers/imageController");

const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "public", "img"));
//   },
//   filename: function (req, file, done) {
//     done(null, "_" + new Date().getTime() + file.originalname);
//   },
// }); // 이미지를 메모리에 저장
// const upload = multer({ storage: storage });

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

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
