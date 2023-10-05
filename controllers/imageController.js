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
      console.log(req.path);

      // 이미지를 MongoDB에 저장
      const image = new Image({
        uri: req.file.path,
        name: req.file.filename,
        data: req.file.buffer, // 이미지 데이터
        contentType: req.file.mimetype, // 이미지 타입
        user: userId,
      });
      console.log(req.file.filename);
      // uri: `https://abd3-175-117-199-226.ngrok-free.app/${req.file.path}`,

      await image.save();

      res.status(201).json({ message: "Image uploaded successfully" });
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({ message: "Image upload failed" });
    }
  },

  getuserImages: async (req, res) => {
    try {
      const userId = req.params.id;
      const userImages = await Image.find(
        { user: userId },
        "-data -__v"
      ).exec();
      if (!userImages) {
        return res.status(404).json({ message: "User images not found" });
      }
      res.status(200).json(userImages);
    } catch (error) {
      res.status(500).json("failed to get user images");
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
