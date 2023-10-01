const Image = require("../models/Image");

module.exports = {
  uploadImage: async (req, res) => {
    try {
      // 이미지를 MongoDB에 저장
      const image = new Image({
        data: req.file.buffer, // 이미지 데이터
        contentType: req.file.mimetype, // 이미지 타입
      });

      await image.save();

      res.status(201).json({ message: "Image uploaded successfully" });
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({ message: "Image upload failed" });
    }
  },

  getImages: async (req, res) => {
    try {
      const images = await Image.find();
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json("failed to get images");
    }
  },
};
