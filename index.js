const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const imageRouter = require("./routes/image");

const port = 3000;



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
