const router = require("express").Router();
const imageController = require("../controllers/imageController");
const multer = require("multer");
// Multer 설정
const storage = multer.memoryStorage(); // 이미지를 메모리에 저장
const upload = multer({ storage: storage });

router.delete("/delete/:id", imageController.deleteImage);
router.delete("/delete", imageController.deleteAllImage);
router.post("/upload", upload.single("image"), imageController.uploadImage);

router.get("/", imageController.getImages);

module.exports = router;
