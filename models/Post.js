const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Board",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // 가정으로 추가한 필드, 실제 User 모델이 존재해야 함
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
