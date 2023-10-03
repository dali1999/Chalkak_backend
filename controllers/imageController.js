const Image = require("../models/Image");
const User = require("../models/User");

module.exports = {
  deleteImage: async (req, res) => {
    try {
      await Image.findByIdAndDelete(req.params.id);

      res.status(200).json("Successfully Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteAllImage: async (req, res) => {
    try {
      await Image.deleteMany({}); // Delete all documents in the Image collection
      res.status(200).json("All images deleted successfully");
    } catch (error) {
      console.error("Error deleting all images:", error); // Log the error
      res.status(500).json({ message: "Image delete failed" });
    }
  },

  uploadImage: async (req, res) => {
    try {
      const userId = await req.params.id;
      console.log(userId);
      // 이미지를 MongoDB에 저장
      const image = new Image({
        data: req.file.buffer, // 이미지 데이터
        contentType: req.file.mimetype, // 이미지 타입
        user: userId,
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
      const images = await Image.find({}, "-data -__v");

      res.status(200).json(images);
    } catch (error) {
      res.status(500).json("failed to get images");
    }
  },
};
