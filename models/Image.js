const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    data: Buffer, // 이미지 데이터
    contentType: String, // 이미지 타입
  },
  { timestamps: true }
);
ImageSchema.index({ username: "text", email: "text" });

module.exports = mongoose.model("Image", ImageSchema);
