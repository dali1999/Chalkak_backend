const router = require("express").Router();
const express = require("express");
const app = express();
const imageController = require("../controllers/imageController");
const multer = require("multer");
const path = require("path");

app.use(express.static(path.join(__dirname, "..", "public")));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "img"));
  },
  filename: function (req, file, done) {
    done(null, new Date().getTime() + "_" + file.originalname);
  },
}); // 이미지를 메모리에 저장
const upload = multer({ storage: storage });

router.delete("/delete/:id", imageController.deleteImage);
router.delete("/delete", imageController.deleteAllImage);
router.post("/upload/:id", upload.single("image"), imageController.uploadImage);
router.get("/:id", imageController.getuserImages);
router.get("/", imageController.getImages);

module.exports = router;
